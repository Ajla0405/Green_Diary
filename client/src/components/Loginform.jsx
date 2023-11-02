import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5173/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/", { userPhoto: userData.userPhoto });

        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error.response.data.error);
      toast.error(error.response.data.error || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label">E-Mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="login-input-group">
            <label className="login-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-register-link">
          Don't have an account?{" "}
          <Link to="/register" className="login-register-text">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
