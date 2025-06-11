import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
const supabaseUrl = configService.get<string>('SUPABASE_URL');
const supabaseKey = configService.get<string>('SUPABASE_KEY');
if (!supabaseUrl) throw new Error('SUPABASE_URL is required');
if (!supabaseKey) throw new Error('SUPABASE_KEY is required');

export const supabase = createClient(supabaseUrl, supabaseKey);
