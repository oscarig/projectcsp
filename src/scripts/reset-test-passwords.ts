/**
 * Quick script to reset passwords for test team members
 * Useful if you forgot the passwords or need to reset them
 * 
 * Usage: npx ts-node src/scripts/reset-test-passwords.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: Missing Supabase configuration");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const testEmails = [
  "admin@vetto-team.com",
  "partner.manager@vetto-team.com",
  "engagement.manager@vetto-team.com",
  "viewer@vetto-team.com",
];

const newPassword = "TestPass123!";

async function resetPasswords() {
  console.log("🔑 Resetting passwords for test users...\n");

  const { data: allUsers } = await supabaseAdmin.auth.admin.listUsers();

  for (const email of testEmails) {
    const user = allUsers?.users.find((u: any) => u.email === email);

    if (!user) {
      console.log(`⚠️  ${email} - Not found`);
      continue;
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: newPassword,
    });

    if (error) {
      console.log(`❌ ${email} - Error: ${error.message}`);
    } else {
      console.log(`✅ ${email} - Password reset to: ${newPassword}`);
    }
  }

  console.log("\n✅ Password reset complete!\n");
}

resetPasswords();