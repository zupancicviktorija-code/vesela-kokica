
/* POVEZAVA S SUPABASE */

const SUPABASE_URL = "https://ezvsnsgajrvmzufqbwzi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vrTcME_YUvH6u33cwbuR3g_QaIDGJqE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
