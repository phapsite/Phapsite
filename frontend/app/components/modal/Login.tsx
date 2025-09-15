"use client";

import { useState, useEffect } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import "./Login.css";
import { supabase } from "@/lib/supabaseClient";
import { ModalMessage } from "./MessageProps";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onSwitchToRecover: () => void;
}

export default function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister, onSwitchToRecover }: LoginModalProps) {
  const [show, setShow] = useState(isOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  
  if (!show) return null;
  
  //login 
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setErrors([]);
  setSuccessMessage("");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrors([error.message]);
      setLoading(false);
      return;
    }

    setSuccessMessage("Success! Preparing your Dashboard");
    setLoading(false);

    // Auto-close modal after 5 seconds
    const closeTimeout = setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 5000);

    // Reset form
    setEmail("");
    setPassword("");

    return () => clearTimeout(closeTimeout); // optional cleanup if needed
  } catch (err: any) {
    setErrors([err.message || "Unexpected error"]);
    setLoading(false);
  }
};
  

  
    const validateForm = () => {
    const newErrors: string[] = [];

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.push("Invalid email format.");
    }

    if (password.length < 8) {
      newErrors.push("Password must be at least 8 characters.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };
  return (
    <div className={`modal-overlay ${isOpen ? "open" : "closing"}`}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title"><LogIn size={20} /> Login</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            <Mail size={16} /> Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            <Lock size={16} /> Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <div className="message-wrapper">
            <ModalMessage
             errors={errors}
            successMessage={successMessage}
            loading={loading}
             />
           </div>
          <div className="modal-buttons">
            <button type="submit" className="modal-button login-btn">Login</button>
            <button type="button" className="modal-button register-btn" onClick={onSwitchToRegister}>Register</button>
            
            <button type="button" className="modal-button recover-btn" onClick={onSwitchToRecover}>Recover</button>
          </div>
        </form>
      </div>
    </div>
  );
}