"use client";

import { useState, useEffect } from "react";
import { UserPlus, Lock, Mail, Briefcase } from "lucide-react";
import { supabase } from "@lib/supabaseClient";
import './Login.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [show, setShow] = useState(isOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Jobseeker");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.push("Invalid email format.");
    if (password.length < 8) newErrors.push("Password must be at least 8 characters.");
    if (!/[!@#$%^&*]/.test(password)) newErrors.push("Password must include a special character.");
    if (password !== confirmPassword) newErrors.push("Passwords do not match.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setErrors([error.message]);
      setSuccessMessage("");
      return;
    }

    setErrors([]);
    setSuccessMessage("Registration successful! Please check your email.");
    
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 5000);

    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("Jobseeker");
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title"><UserPlus size={20} /> Register</h2>

        <div className="message-wrapper">
          {errors.length > 0 && (
            <ul className="modal-errors">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
          {successMessage && <div className="modal-success">{successMessage}</div>}
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label><Mail size={16} /> Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label><Lock size={16} /> Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label><Lock size={16} /> Confirm Password
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <label><Briefcase size={16} /> Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Jobseeker">Jobseeker</option>
              <option value="Employer">Employer</option>
              <option value="Admin">Admin</option>
            </select>
          </label>

          <button type="submit" className="modal-register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}