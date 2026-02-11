import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e?.preventDefault?.();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      alert("Please fill all details.");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`${API_BASE}/api/auth/register`, {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      alert("Registered Successfully! Please login.");
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
    
  return (
      <div style={{ padding: "50px" }}>
        <h1>Register</h1>
        <form onSubmit={register}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    );
}
  

  