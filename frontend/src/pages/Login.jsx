import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const login = async () => {
      try {
        const res = await axios.post(`${API_BASE}/api/auth/login`, {
          email,
          password
        });
  
        localStorage.setItem("token", res.data.token);
        navigate("/todo");
      } catch (err) {
        alert("Invalid login");
      }
    };
  
    return (
      <div style={{ padding: "50px" }}>
        <h1>Login</h1>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <br /><br />
        <button onClick={login}>Login</button>
        <p>Don't have an account ?  <Link to="/register"> Register</Link>
</p>

<p> Go to <Link to="/todo">Todo</Link></p>


      </div>
    );
  }
  