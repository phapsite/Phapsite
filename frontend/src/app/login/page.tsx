
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const pathname = usePathname();
  const [isModalMode, setIsModalMode] = useState(false);

  useEffect(() => {
    // Only run on client side where window exists
    if (typeof window !== "undefined") {
      const isModal = pathname === "/login" && !window.location.search.includes("standalone");
      setIsModalMode(isModal);
      
      // Prevent background scroll when in modal
      if (isModal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [pathname]);

  // Hide background when in modal mode
  if (isModalMode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-transparent">
        <LoginForm />
      </div>
    </div>
  );
}