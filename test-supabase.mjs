import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase Connection...');
  console.log(`URL: ${supabaseUrl}`);
  
  const { data, error } = await supabase.from('non_existent_table').select('*').limit(1);
  
  if (error) {
    if (error.code === '42P01' || error.message.includes('relation "public.non_existent_table" does not exist')) {
        console.log('\n✅ Connection to Supabase successful! (Successfully reached the database)');
    } else if (error.message && error.message.includes('FetchError')) {
        console.log('\n❌ Supabase connection failed (Network Error):', error.message);
    } else {
        console.log('\n✅ Connection to Supabase reached the server, but got an error:', error);
    }
  } else {
    console.log('\n✅ Connection to Supabase successful! (Got data)');
  }
}

testConnection();
