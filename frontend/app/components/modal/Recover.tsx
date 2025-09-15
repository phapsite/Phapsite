"use client";

import { useState, useEffect } from "react";
import { Key, Mail } from "lucide-react";
import "./Login.css";
import { ModalMessage }from './MessageProps'
interface RecoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecover: (email: string) => void;
}

export default function RecoverModal({ isOpen, onClose, onRecover }: RecoverModalProps) {
  const [show, setShow] = useState(isOpen);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 300); // fade out animation
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.push("Invalid email format.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // start loading animation

    // simulate async operation
    const timeout = setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Recovery email sent!");
      onRecover(email.trim());
      setEmail("");
      setErrors([]);

      // auto-close modal after 2 seconds
      const closeTimeout = setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 5000);

      return () => clearTimeout(closeTimeout);
    }, 1500);

    return () => clearTimeout(timeout);
  };

  if (!show) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : "closing"}`}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title"><Key size={20} /> Recover Account</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label><Mail size={16} /> Email
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading} // disable while loading
            />
          </label>

        

          <button type="submit" className="modal-recover-btn recover-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Recovery Email"}
          </button>
        </form>
      </div>
    </div>
  );
}