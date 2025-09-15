import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Service role key
const supabaseAnon = process.env.SUPABASE_ANON_KEY;
const supabaseRole = process.env.SUPABASE_SERVICE_ROLE;

// Function to validate keys
const validateKey = (key: string | undefined, name: string, required = true) => {
  if (!key) {
    if (required) console.error(`[Supabase] ERROR: ${name} is missing.`);
    return false;
  }
  // Simple format check (adjust if your key format differs)
  if (!/^([a-zA-Z0-9-_]{20,})$/.test(key)) {
    console.warn(`[Supabase] WARNING: ${name} format looks unusual.`);
  }
  return true;
};

// Validate each environment variable
const urlValid = validateKey(supabaseUrl, "SUPABASE_URL");
const keyValid = validateKey(supabaseKey, "SUPABASE_KEY");
const anonValid = validateKey(supabaseAnon, "SUPABASE_ANON_KEY");
const roleValid = validateKey(supabaseRole, "SUPABASE_SERVICE_ROLE", false); // optional

// Throw error if any required key is missing
if (!urlValid || !keyValid || !anonValid) {
  throw new Error("Supabase environment variables are not set correctly.");
}

// Log keys for debugging (remove in production!)
console.log("[Supabase] SUPABASE_URL:", supabaseUrl);
console.log("[Supabase] SUPABASE_KEY:", supabaseKey);
console.log("[Supabase] SUPABASE_ANON_KEY:", supabaseAnon);
console.log("[Supabase] SUPABASE_SERVICE_ROLE:", supabaseRole);

// Create Supabase client using service role key for backend
export const supabase: SupabaseClient = createClient(
  supabaseUrl!,
  supabaseKey! // Using service role key for full access
);

console.log("[Supabase] Client initialized successfully.");