"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On success, redirect to login or home
      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold light-text mb-1">Create Account</h2>
        <p className="light-text text-sm">Join us today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        
        {/* Name Input */}
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium light-text">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
          />
        </div>
        
        {/* Email Input */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium light-text">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
          />
        </div>
        
        {/* Password Input */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium light-text">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            required
            minLength={6}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
          />
        </div>
        
         {/* Role Selection */}
        <div className="space-y-1">
          <label htmlFor="role" className="block text-sm font-medium light-text">
            Account Type
          </label>
          <select
            id="role"
            name="role"
            required
            disabled={isLoading}
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500  disabled:bg-gray-100 dark:disabled:bg-gray-800"
          >
            <option value="" disabled>Select your role</option>
            <option value="user">Regular User</option>
            <option value="admin">Admin</option>
            <option value="premium">Premium User</option>
          </select>
        </div>  
                
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      
      <div className="text-center space-y-3 pt-4 border-t border-gray-200">
        <p className="text-sm light-text">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-green-600 hover:text-green-800 font-medium"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}