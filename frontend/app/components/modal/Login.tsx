"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock } from "lucide-react";
import { ModalMessage } from "./MessageProps";
import "./Login.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToRecover: () => void;7
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister, onSwitchToRecover }: LoginModalProps) {
  const router = useRouter();
  const [show, setShow] = useState(isOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // ✅ Form validation
  const validateForm = () => {
    const newErrors: string[] = [];
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.push("Invalid email format.");
    if (password.length < 8) newErrors.push("Password must be at least 8 characters.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors([]);
    setSuccessMessage("");

    try {
      // Call backend only
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const text = await res.text();

      if (!res.ok) {
        setErrors([`Backend error: ${text || "Login failed"}`]);
        return;
      }

      let backendData;
      try {
        backendData = JSON.parse(text);
      } catch (parseErr) {
        console.error("Failed to parse JSON:", parseErr, "Raw response:", text);
        setErrors(["Failed to parse server response"]);
        return;
      }

      // Check response structure
      if (!backendData?.success || !backendData?.user) {
        setErrors([backendData?.message || "Invalid server response"]);
        return;
      }

      const role = backendData.user.role;
      if (!role) {
        setErrors(["No role returned from server"]);
        return;
      }

      setSuccessMessage("Login successful! Redirecting...");

      // ✅ Role-based redirect
      switch (role) {
        case "Jobseeker":
          router.push("/dashboard/jobseeker");
          break;
        case "Employer":
          router.push("/dashboard/recruiter");
          break;
        case "Admin":
          router.push("/dashboard/admin");
          break;
        case "Freelancer":
          router.push("/dashboard/freelance");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setErrors([err.message || "An unexpected error occurred"]);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 5000);
      setEmail("");
      setPassword("");
    }
  };
  if (!isOpen) return null;
  return (
    <div className={`modal-overlay ${show ? "open" : "closing"}`}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>&times;</button>
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
            <ModalMessage errors={errors} successMessage={successMessage} loading={loading} />
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