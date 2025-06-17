import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cgdjsxbbgrajybjktrkd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZGpzeGJiZ3Jhanliamt0cmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1Mjg5OTIsImV4cCI6MjA2NTEwNDk5Mn0.ONenmldZYhx4QTN0cOcQEw1NghegqQjgiFEJdiNrycI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
