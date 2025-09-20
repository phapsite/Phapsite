"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // keep Flask session cookie
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/home");
      } else {
        alert(data.message || "Invalid login");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 rounded-xl">
      <div className="text-center">
        <h2 className="text-2xl font-bold light-text mb-1">Welcome Back</h2>
        <p className="light-text text-sm">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium light-text">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium light-text">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3 pt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-button w-full font-medium text-sm py-2 rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <div className="text-center space-y-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="w-full text-blue-600 hover:text-blue-800 font-medium text-sm py-2 hover:bg-blue-50 rounded-lg transition-colors"
          disabled={isLoading}
        >
          Don’t have an account? Create one
        </button>

        <button
          type="button"
          onClick={() => router.push("/recovery")}
          className="w-full light-text text-sm py-2 hover:bg-gray-50 rounded-lg transition-colors"
          disabled={isLoading}
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );
}