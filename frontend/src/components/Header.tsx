"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme as useNextTheme } from 'next-themes';
function SearchBar() {
  return (
    <div className="relative w-full max-w-md ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-xl border border-gray-300  px-4 py-2 pl-10  placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    if (animating) return;
    setAnimating(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    setAnimating(false);
  };

  const handleAuthNavigation = (route: string) => {
    handleCloseMenu();
    router.push(`/${route}`);
  };

  return (
  
    <header className="text-black mt-6 relative w-full  shadow-sm  border bg-gray-50 rounded-xl ">
    
      {/* Border Train Animation */}
      <AnimatePresence>
        {animating && (
          <motion.svg
            viewBox="0 0 1200 120"
            className="absolute inset-0 h-full w-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.rect
              x="2"
              y="2"
              width="1196"
              height="116"
              rx="8"
              ry="8"
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeDasharray="2600"
              initial={{ strokeDashoffset: 2600 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onAnimationComplete={() => {
                setAnimating(false);
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className="text-xl font-bold text-blue">MyLogo</span>
          </Link>
        </div>
        
        {/*testing toggle */}

        
        {/* SearchBar */}
        <div className="hidden flex-1 justify-center md:flex ">
          <SearchBar />
        </div>

        {/* Nav + Auth + Theme */}
        <div className="flex items-center space-x-4">
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleAuthNavigation("login")}
              className="rounded-xl bg-blue-600 dark:bg-blue-700 px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthNavigation("signup")}
              className="rounded-xl bg-green-600 dark:bg-green-700 px-4 py-2 text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200"
            >
              Sign Up
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={handleToggle}
            disabled={animating}
            className="relative z-50 flex h-8 w-8 items-center justify-center md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <div className="h-1 w-6 rounded bg-gray-800 dark:bg-gray-200"></div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden  md:hidden border-t border-gray-200 dark:border-gray-700"
          >
            <div className="relative z-10 space-y-4 px-4 py-6">
              <SearchBar />
              <nav className="flex flex-col space-y-3">
                <Link href="/" className=" dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-2 block transition-colors" onClick={handleCloseMenu}>
                  Home
                </Link>
                <Link href="/about" className="dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-2 block transition-colors" onClick={handleCloseMenu}>
                  About
                </Link>
                <Link href="/contact" className="dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-2 block transition-colors" onClick={handleCloseMenu}>
                  Contact
                </Link>
                
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleAuthNavigation("login")}
                    className="w-full rounded-xl bg-blue-600 dark:bg-blue-700 px-4 py-3 text-center text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthNavigation("signup")}
                    className="w-full rounded-xl bg-green-600 dark:bg-green-700 px-4 py-3 text-center text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              </nav>

              {/* Mobile Theme Toggle */}
              <div className="pt-2">
                <ThemeToggle />
              </div>

              <motion.button
                onClick={handleCloseMenu}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-6 w-full rounded-xl border border-blue-600 dark:border-blue-400 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span className="dark:text-blue-400">Close</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}