 // frontend/lib/api/loginUser.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role?: string;
  };
  session?: any;
  message?: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}