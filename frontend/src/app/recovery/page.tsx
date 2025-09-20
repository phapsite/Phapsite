"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RecoveryForm from "@/components/RecoveryForm";

export default function RecoveryPage() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Ensure we only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hide immediately when on /recovery route
  const isModalMode = pathname === "/recovery";

  // Prevent any rendering or flashing - SAME as LoginPage
  if (!isClient || isModalMode) {
    return (
      <div className="fixed inset-0 bg-transparent pointer-events-none z-0 invisible">
        {/* Completely invisible - modal will overlay */}
      </div>
    );
  }

  // Only render standalone page if not in modal context
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <RecoveryForm />
      </div>
    </div>
  );
}