"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "./AuthModal"; // Your modal component from previous response

interface AuthModalWrapperProps {
  children: ReactNode;
}

export default function AuthModalWrapper({ children }: AuthModalWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const showAuthModal = ["login", "signup", "recovery"].some(
    (tab) => pathname === `/${tab}`
  );

  const handleClose = () => {
    router.push("/");
  };

  return (
    <>
      {children}
      {showAuthModal && <AuthModal onClose={handleClose} />}
    </>
  );
}