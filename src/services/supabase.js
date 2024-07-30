import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://iifrvdharbzsgebxvrst.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZnJ2ZGhhcmJ6c2dlYnh2cnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMjI0MjgsImV4cCI6MjAzNzU5ODQyOH0.LC_r4cEajt_OH0FzGqqhvS96mwN-eftH4XUruTFDLWo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

