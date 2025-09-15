// app/api/register/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only key
);

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Create user in Supabase Auth
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({ email, password });

    if (signUpError) {
      return NextResponse.json(
        { success: false, error: signUpError.message },
        { status: 400 }
      );
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User creation failed, no ID returned" },
        { status: 500 }
      );
    }

    // 2️⃣ Insert role into profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: userId, email, role });

    if (profileError) {
      // rollback: delete user from auth if profile insert fails
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { success: false, error: "Profile creation failed: " + profileError.message },
        { status: 500 }
      );
    }

    // 3️⃣ Success
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: { id: userId, email, role },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}