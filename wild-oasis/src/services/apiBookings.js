import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

// FETCH BOOKINGS WITH RELATIONS
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("Bookings") // use exact table name
    .select(
      `
  id,
  created_at,
  startDate,
  endDate,
  numNights,
  numGuests,
  status,
  totalPrice,
  cabins!Bookings_cabinId_fkey(name),
  guests!Bookings_guestId_fkey(full_name, email)
  `,
      { count: "exact" }
    );

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Supabase getBookings error:", error.message, error.details);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

// GET SINGLE BOOKING BY ID
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// GET BOOKINGS CREATED AFTER A DATE
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// GET STAYS STARTING AFTER A DATE
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(full_name)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// GET STAYS WITH ACTIVITY TODAY

// Helper function to format a Date object into 'YYYY-MM-DDTHH:mm:ss.sss' (local time, no Z)
// import { supabase } from "../services/supabase";

// Helper function to format a Date object into 'YYYY-MM-DDTHH:mm:ss.sss' (local time, no Z)
const getLocalFormattedDateTime = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export async function getStaysTodayActivity() {
  const startOfTodayLocal = new Date();
  startOfTodayLocal.setHours(0, 0, 0, 0); // Set to the beginning of the LOCAL day

  const endOfTodayLocal = new Date(startOfTodayLocal);
  endOfTodayLocal.setDate(startOfTodayLocal.getDate() + 1); // This is the start of tomorrow, local time

  const todayLocalString = getLocalFormattedDateTime(startOfTodayLocal);
  const tomorrowLocalString = getLocalFormattedDateTime(endOfTodayLocal);

  console.log("Date string for today (Local NO Z):", todayLocalString);
  console.log("Date string for tomorrow (Local NO Z):", tomorrowLocalString);

  let allActivities = []; // Array to store combined results

  try {
    // --- Query 1: Unconfirmed Arrivals (startDate is within today's local 24 hours) ---
    console.log("Fetching Unconfirmed Arrivals...");
    const { data: unconfirmedArrivals, error: error1 } = await supabase
      .from("Bookings")
      .select("*, guests(full_name, nationality, countryFlag)")
      .eq("status", "unconfirmed") // Direct equality filter
      .gte("startDate", todayLocalString) // startDate >= today at 00:00:00.000
      .lt("startDate", tomorrowLocalString); // startDate < tomorrow at 00:00:00.000

    if (error1) throw error1;
    allActivities = allActivities.concat(unconfirmedArrivals);
    console.log(
      "Unconfirmed Arrivals results:",
      unconfirmedArrivals.length,
      unconfirmedArrivals
    );

    // --- Query 2: Checked-in Departures (endDate is within today's local 24 hours) ---
    console.log("Fetching Checked-in Departures...");
    const { data: checkedInDepartures, error: error2 } = await supabase
      .from("Bookings")
      .select("*, guests(full_name, nationality, countryFlag)")
      .eq("status", "checked-in")
      .gte("endDate", todayLocalString)
      .lt("endDate", tomorrowLocalString);

    if (error2) throw error2;
    allActivities = allActivities.concat(checkedInDepartures);
    console.log(
      "Checked-in Departures results:",
      checkedInDepartures.length,
      checkedInDepartures
    );

    // --- Query 3: Currently Checked-in and Ongoing (started before/on today, ends after/on today) ---
    console.log("Fetching Checked-in Ongoing...");
    const { data: checkedInOngoing, error: error3 } = await supabase
      .from("Bookings")
      .select("*, guests(full_name, nationality, countryFlag)")
      .eq("status", "checked-in")
      .lte("startDate", todayLocalString) // startDate <= today at 00:00:00.000
      .gte("endDate", todayLocalString); // endDate >= today at 00:00:00.000

    if (error3) throw error3;
    // Filter out duplicates if a booking might satisfy multiple conditions (e.g., a departure that's also ongoing)
    const uniqueCheckedInOngoing = checkedInOngoing.filter(
      (activity) =>
        !allActivities.some((existing) => existing.id === activity.id)
    );
    allActivities = allActivities.concat(uniqueCheckedInOngoing);
    console.log(
      "Checked-in Ongoing (unique) results:",
      uniqueCheckedInOngoing.length,
      uniqueCheckedInOngoing
    );

    // Sort the final combined array (optional, but good practice for consistent order)
    allActivities.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    console.log(
      "Data from getStaysTodayActivity (FINAL COMBINED RESULT):",
      allActivities.length,
      allActivities
    );
    return allActivities;
  } catch (error) {
    console.error("Error fetching today's activities:", error.message);
    throw new Error("Bookings could not get loaded for today's activities");
  }
}
// UPDATE BOOKING
export async function updateBooking(id, updates) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

// DELETE BOOKING
export async function deleteBooking(id) {
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}
