"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Ensure we only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hide immediately when on /signup route
  const isModalMode = pathname === "/signup";

  // Prevent any rendering or flashing - SAME pattern
  if (!isClient || isModalMode) {
    return (
      <div className="fixed inset-0 bg-gray-50 pointer-events-none z-0 invisible">
        {/* Completely invisible - modal will overlay */}
      </div>
    );
  }

  // Only render standalone page if not in modal context
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <SignupForm />
      </div>
    </div>
  );
}