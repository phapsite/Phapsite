"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
// Get environment variables
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.SUPABASE_KEY; // Service role key
var supabaseAnon = process.env.SUPABASE_ANON_KEY;
var supabaseRole = process.env.SUPABASE_SERVICE_ROLE;
// Function to validate keys
var validateKey = function (key, name, required) {
    if (required === void 0) { required = true; }
    if (!key) {
        if (required)
            console.error("[Supabase] ERROR: ".concat(name, " is missing."));
        return false;
    }
    // Simple format check (adjust if your key format differs)
    if (!/^([a-zA-Z0-9-_]{20,})$/.test(key)) {
        console.warn("[Supabase] WARNING: ".concat(name, " format looks unusual."));
    }
    return true;
};
// Validate each environment variable
var urlValid = validateKey(supabaseUrl, "SUPABASE_URL");
var keyValid = validateKey(supabaseKey, "SUPABASE_KEY");
var anonValid = validateKey(supabaseAnon, "SUPABASE_ANON_KEY");
var roleValid = validateKey(supabaseRole, "SUPABASE_SERVICE_ROLE", false); // optional
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
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey // Using service role key for full access
);
console.log("[Supabase] Client initialized successfully.");
