import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pznxrdmibklhwjbunqji.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bnhyZG1pYmtsaHdqYnVucWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTIzNjQsImV4cCI6MjA3ODE2ODM2NH0.4CBuLUJuSli-m7CRA8JKa2JdC_whvOag6xMLCpj-SQM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
