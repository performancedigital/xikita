import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hxnrwqgcqkyosyghsfkf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Vyd-sV8Z68_uYT7-ZWNZiA_m0iCVEEa';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
