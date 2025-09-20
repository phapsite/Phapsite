"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { CircleX } from 'lucide-react';
//mport Login from "@/app/login/page"; // Adjust path as needed (e.g., if Modal is in /components, use '@/app/login/page')
//import Signup from "@/app/signup/page";
//import Recovery from "@/app/recovery/page";
import LoginForm from '@/components/LoginForm'
import SignupForm from "@/components/SignupForm";
import RecoveryForm from "@/components/RecoveryForm";


type AuthTab = "login" | "signup" | "recovery";

interface AuthModalProps {
  isOpen?: boolean; // Optional: if not provided, auto-manages based on pathname
  onClose?: () => void;
  children?: ReactNode; // Optional fallback if not using tabs
}

export default function AuthModal({ isOpen: propIsOpen, onClose: propOnClose, children }: AuthModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  // Determine if modal should be open based on pathname if prop not provided
  const isOpen = propIsOpen ?? ["login", "signup", "recovery"].some((tab) => pathname === `/${tab}`);

  // Sync active tab with pathname
  useEffect(() => {
    if (pathname === "/login") setActiveTab("login");
    else if (pathname === "/signup") setActiveTab("signup");
    else if (pathname === "/recovery") setActiveTab("recovery");
    
    else if (isOpen) {
      // Default to login if open but invalid path
      router.push("/login");
      setActiveTab("login");
    }
  }, [pathname, router, isOpen]);

  // Handle close: call prop if provided, otherwise push to /home and close internally
  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      router.push("/");
      setInternalIsOpen(false);
    }
  };

  // If using fallback children, render them; otherwise, render tabbed auth pages
  const renderContent = children ? (
    children
  ) : (
    <>
      {/* Tab Navigation */}
      <div className="w-full flex border-b border-gray-200 rounded-2xl mb-6">
        {[
          { tab: "login" as const, label: "Login" },
          { tab: "signup" as const, label: "Sign Up" },
          { tab: "recovery" as const, label: "Recovery" },
        ].map(({ tab, label }) => (
          <button
            key={tab}
            onClick={() => router.push(`/${tab}`)}
            className={`flex-1 py-2 px-10 text-sm border-gray-700 backdrop-blur-lg bg-white/30 tab-button font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-400 tab-button dark:border-blue-600 dark:text-blue-600"
                : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LoginForm />
          </motion.div>
        )}
        {activeTab === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SignupForm />
          </motion.div>
        )}
        {activeTab === "recovery" && (
          <motion.div
            key="recovery"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <RecoveryForm />
          </motion.div>
        )}
        
         
      </AnimatePresence>
    </>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="  fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose} // Close on backdrop click
      >
        {/* Modal content */}
        <motion.div
          className=" border border-1 border-gray-300 rounded-2xl shadow-xl p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Prevent close on content click
        >
            
            
          {renderContent}
          {/* Close button */}
          <div className="absolute flex justify-center items-center w-9 h-9 rounded-full top-25 right-10">
            <button
            onClick={handleClose}
            className="relative text-red-500 bg-transparent"
            aria-label="Close modal"
          >
            <CircleX className="h-9 w-9 text-red bg-transparent" />
          </button>
           </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}