import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key only on server
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user) {
      console.error("Auth error:", error);
      return NextResponse.json(
        { success: false, message: error?.message || "Invalid login" },
        { status: 401 }
      );
    }

    const user = data.user;
    const session = data.session;

    // fetch role via RPC
    const { data: roleResult, error: roleError } = await supabase
      .rpc("get_user_role", { uid: user.id });

    if (roleError) {
      console.error("RPC error:", roleError);
      return NextResponse.json(
        { success: false, message: roleError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, role: roleResult },
      session,
    });

  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
  
    //REGISTRATION BLOCK
    
    
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

