"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthModal from "./AuthModal";

interface AuthModalProviderProps {
  children: ReactNode;
}

export default function AuthModalProvider({ children }: AuthModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "recovery">("login");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const shouldShowModal = ["login", "signup", "recovery"].some(
      (tab) => pathname === `/${tab}`
    );

    if (shouldShowModal) {
      setIsOpen(true);
      // Set active tab based on current path
      if (pathname === "/signup") setActiveTab("signup");
      else if (pathname === "/recovery") setActiveTab("recovery");
      else setActiveTab("login");
    } else {
      setIsOpen(false);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    router.push("/home");
  };

  return (
    <>
      {children}
      <AuthModal isOpen={isOpen} onClose={handleClose} activeTab={activeTab} />
    </>
  );
}