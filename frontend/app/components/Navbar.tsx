"use client";

import { useState } from "react";
import { LogIn, Home, ShoppingCart, Briefcase, Users, User } from "lucide-react";
//import { supabase } from "@/lib/supabaseClient";
import LoginModal from "./modal/Login";
import RegisterModal from "./modal/Register";
import RecoverModal from "./modal/Recover";
import "./modal/Login.css"; // shared styles

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [recoverOpen, setRecoverOpen] = useState(false);

  const links = ["Home", "Shop", "Job", "Services", "About", "Login"];
  const linkIcons: Record<string, JSX.Element> = {
    Home: <Home size={20} />,
    Shop: <ShoppingCart size={20} />,
    Job: <Briefcase size={20} />,
    Services: <Users size={20} />,
    About: <User size={20} />,
    Login: <LogIn size={20} />,
  };

  // Login handler
  const handleLogin = (email: string, password: string) => {
    console.log("Login info:", email, password);
    setLoginOpen(false);
  };

  // Register handler
  const handleRegister = (data: { email: string; password: string; role: string }) => {
    console.log("Register data:", data);
    setRegisterOpen(false);
  };

  // Recover handler
  const handleRecover = (email: string) => {
    console.log("Recover email:", email);
    setRecoverOpen(false);
  };

  // Switch between modals
  const switchToRegister = () => {
    setLoginOpen(false);
    setRecoverOpen(false);
    setRegisterOpen(true);
  };

  const switchToRecover = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setRecoverOpen(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Phapsite</div>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {links.map((link) => (
            <li key={link}>
              {link === "Login" ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="login-btn flex items-center gap-1"
                >
                  {linkIcons[link]} {link}
                </button>
              ) : (
                <span className="flex items-center gap-1">
                  {linkIcons[link]} {link}
                </span>
              )}
            </li>
          ))}
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={switchToRegister}
        onSwitchToRecover={switchToRecover}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onRegister={handleRegister}
      />

      <RecoverModal
        isOpen={recoverOpen}
        onClose={() => setRecoverOpen(false)}
        onRecover={handleRecover}
      />
    </nav>
  );
}