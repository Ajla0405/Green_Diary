import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./RegistrationForm.css";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        user,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Thanks for registering");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Registration failed");
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
