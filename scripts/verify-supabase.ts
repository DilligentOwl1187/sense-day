import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { supabaseAdmin } from '../lib/supabase-admin';

async function testSupabase() {
    console.log("Testing Supabase Admin connection...");

    const testData = {
        user_profile: { name: "Test User", feeling: "Debugging" },
        analysis_result: { today_advice: "Keep going", art_curation: { color_code: "#E07A5F" } }
    };

    try {
        console.log("Attempting to insert into 'results' table...");
        const { data, error } = await supabaseAdmin
            .from('results')
            .insert(testData)
            .select('id')
            .single();

        if (error) {
            console.error("FAILED: Supabase returned an error:");
            console.error(JSON.stringify(error, null, 2));
            return;
        }

        console.log("SUCCESS: Data inserted with ID:", data.id);

        // Cleanup
        console.log("Cleaning up test data...");
        await supabaseAdmin.from('results').delete().eq('id', data.id);
        console.log("Cleanup complete.");

    } catch (err) {
        console.error("CRITICAL: Code execution failed:");
        console.error(err);
    }
}

testSupabase();
