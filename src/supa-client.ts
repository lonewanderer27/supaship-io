import { Database } from './types/database.types';
import { createClient } from '@supabase/supabase-js';

const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supaKey = import.meta.env.VITE_SUPABASE_KEY;

export const supaClient = createClient<Database>(supaUrl, supaKey);