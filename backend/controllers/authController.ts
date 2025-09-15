import express from "express";
import bcrypt from "bcryptjs";
import { supabase } from "../utils/supabaseClient.ts";
// Temporary in-memory user store
const users: any[] = [];

export  let registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const user = authData.user;

    if (!user) {
      return res.status(500).json({ error: "User could not be created." });
    }

    // 2. Insert into profiles table with role
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,       // Supabase Auth user ID
          email: user.email, // keep consistent
          role,              // chosen role from frontend
        },
      ]);

    if (profileError) {
      return res.status(500).json({ error: profileError.message });
    }

    return res.status(201).json({ message: "User registered successfully." });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// ✅ Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // 1. Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // 2. Fetch role from `profiles`
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      return res.status(500).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        role: profile?.role,
      },
      session: data.session, // includes access + refresh token
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error during login." });
  }
};