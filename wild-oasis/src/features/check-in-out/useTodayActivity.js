import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: activities = [] } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
    staleTime: 0,
  });

  return { activities, isLoading };
}
