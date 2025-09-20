"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";

export default function RecoveryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"email" | "code" | "new-password">("email");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate sending reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep("code");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const code = (e.target as any).code.value;
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate verifying code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep("new-password");
    } catch (err) {
      setError("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const newPassword = (e.target as any).password.value;
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/login?reset=success");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep("email");
    setError("");
  };

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold light-text mb-1">
          {step === "email" && "Reset Password"}
          {step === "code" && "Verify Code"}
          {step === "new-password" && "New Password"}
        </h2>
        <p className="light-text text-sm">
          {step === "email" && "Enter your email to receive a reset link"}
          {step === "code" && "Enter the 6-digit code sent to your email"}
          {step === "new-password" && "Create a new password for your account"}
        </p>
      </div>

      <form onSubmit={step === "email" ? handleEmailSubmit : step === "code" ? handleCodeSubmit : handlePasswordSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Step 1: Email Input */}
        {step === "email" && (
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium light-text">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
            />
          </div>
        )}

        {/* Step 2: Code Input */}
        {step === "code" && (
          <div className="space-y-1">
            <label htmlFor="code" className="block text-sm font-medium light-text">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder="123456"
              maxLength={6}
              pattern="[0-9]{6}"
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 text-center text-lg tracking-widest"
            />
            <p className="text-xs text-gray-500 text-center">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isLoading}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Resend
              </button>
            </p>
          </div>
        )}

        {/* Step 3: New Password Input */}
        {step === "new-password" && (
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium light-text">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a new password"
              required
              minLength={6}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
            />
            <p className="text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              {step === "email" && "Send Reset Link"}
              {step === "code" && "Verify Code"}
              {step === "new-password" && "Reset Password"}
            </>
          )}
        </button>
      </form>

      {/* Back Button (for code and password steps) */}
      {step !== "email" && (
        <button
          type="button"
          onClick={handleBack}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}

      {/* Navigation Links */}
      <div className="text-center space-y-3 pt-4 border-t border-gray-200">
        <p className="text-sm light-text">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:text-blue-800 font-medium"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}