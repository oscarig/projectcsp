/**
 * Script to create test team members for provider@vetto.com
 * 
 * Usage: npx ts-node src/scripts/create-test-team.ts
 * 
 * This script will:
 * 1. Find the provider@vetto.com user
 * 2. Create 4 test users (one for each role) in Supabase Auth
 * 3. Add them to the provider's team
 * 4. Output login credentials
 * 
 * Requirements:
 * - SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured");
  console.error("\nPlease add to your .env.local:");
  console.error("SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here");
  process.exit(1);
}

// Create admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

interface TestUser {
  email: string;
  password: string;
  fullName: string;
  role: "admin" | "partner_manager" | "engagement_manager" | "viewer";
}

const testUsers: TestUser[] = [
  {
    email: "admin@vetto-team.com",
    password: "TestPass123!",
    fullName: "Alice Admin",
    role: "admin",
  },
  {
    email: "partner.manager@vetto-team.com",
    password: "TestPass123!",
    fullName: "Peter Partner",
    role: "partner_manager",
  },
  {
    email: "engagement.manager@vetto-team.com",
    password: "TestPass123!",
    fullName: "Emma Engagement",
    role: "engagement_manager",
  },
  {
    email: "viewer@vetto-team.com",
    password: "TestPass123!",
    fullName: "Victor Viewer",
    role: "viewer",
  },
];

async function createTestTeam() {
  try {
    console.log("🚀 Starting test team creation...\n");

    // 1. Find provider@vetto.com
    console.log("📍 Step 1: Finding provider@vetto.com...");
    const { data: providerProfile, error: providerError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name")
      .eq("email", "provider@vetto.com")
      .single();

    if (providerError || !providerProfile) {
      console.error("❌ Error: Could not find provider@vetto.com");
      console.error("Make sure this user exists in your database");
      process.exit(1);
    }

    console.log(`✅ Found provider: ${providerProfile.full_name} (${providerProfile.id})\n`);

    // 2. Create test users
    console.log("📍 Step 2: Creating test users...");
    const createdUsers: Array<{ id: string; email: string; role: string }> = [];

    for (const testUser of testUsers) {
      console.log(`   Creating ${testUser.email} (${testUser.role})...`);

      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
      const userExists = existingUser?.users.find((u: any) => u.email === testUser.email);

      let userId: string;

      if (userExists) {
        console.log(`   ⚠️  User already exists, updating password...`);
        userId = userExists.id;

        // Update password for existing user
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          userId,
          { password: testUser.password }
        );

        if (updateError) {
          console.error(`   ❌ Error updating password: ${updateError.message}`);
          continue;
        }
      } else {
        // Create new user
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: testUser.email,
          password: testUser.password,
          email_confirm: true,
          user_metadata: {
            full_name: testUser.fullName,
          },
        });

        if (createError) {
          console.error(`   ❌ Error creating user: ${createError.message}`);
          continue;
        }

        userId = newUser.user.id;
        console.log(`   ✅ Created auth user: ${userId}`);
      }

      // Ensure profile exists
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          id: userId,
          email: testUser.email,
          full_name: testUser.fullName,
          role: "provider",
          email_verified: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

      if (profileError) {
        console.error(`   ❌ Error creating profile: ${profileError.message}`);
        continue;
      }

      console.log(`   ✅ User ready: ${testUser.email}`);
      createdUsers.push({ id: userId, email: testUser.email, role: testUser.role });
    }

    console.log(`\n✅ Created/Updated ${createdUsers.length}/${testUsers.length} users\n`);

    // 3. Add users to provider team
    console.log("📍 Step 3: Adding users to provider team...");

    for (const user of createdUsers) {
      console.log(`   Adding ${user.email} as ${user.role}...`);

      const { error: teamError } = await supabaseAdmin
        .from("provider_team_members")
        .upsert({
          user_id: user.id,
          provider_id: providerProfile.id,
          role: user.role,
          updated_at: new Date().toISOString(),
        }, { onConflict: "provider_id,user_id" });

      if (teamError) {
        console.error(`   ❌ Error adding to team: ${teamError.message}`);
        continue;
      }

      console.log(`   ✅ Added to team successfully`);
    }

    console.log("\n📍 Step 4: Verifying team...");

    // 4. Verify team members
    const { data: teamMembers, error: teamError } = await supabaseAdmin
      .from("provider_team_members")
      .select(
        `
        id,
        role,
        joined_at,
        profiles!provider_team_members_user_id_fkey (
          full_name,
          email
        )
      `
      )
      .eq("provider_id", providerProfile.id);

    if (teamError) {
      console.error("❌ Error fetching team:", teamError.message);
    } else {
      console.log("\n✅ Team Members:");
      console.log("┌─────────────────────────────────────────────────────────────────┐");
      teamMembers?.forEach((member: any) => {
        const profile = member.profiles;
        const roleDisplay = member.role.padEnd(20);
        console.log(
          `│ ${profile.full_name.padEnd(20)} │ ${profile.email.padEnd(30)} │ ${roleDisplay} │`
        );
      });
      console.log("└─────────────────────────────────────────────────────────────────┘");
    }

    // 5. Display credentials
    console.log("\n📋 LOGIN CREDENTIALS:");
    console.log("┌─────────────────────────────────────────────────────────────────┐");
    testUsers.forEach((user) => {
      console.log(`│ Email:    ${user.email.padEnd(50)} │`);
      console.log(`│ Password: ${user.password.padEnd(50)} │`);
      console.log(`│ Role:     ${user.role.padEnd(50)} │`);
      console.log("├─────────────────────────────────────────────────────────────────┤");
    });
    console.log("└─────────────────────────────────────────────────────────────────┘");

    console.log("\n✅ Test team creation completed successfully!");
    console.log("\n💡 You can now login with any of the test users above");
    console.log("   Each user has different permissions based on their role\n");

  } catch (error: any) {
    console.error("\n❌ Unexpected error:", error);
    process.exit(1);
  }
}

// Run the script
createTestTeam();