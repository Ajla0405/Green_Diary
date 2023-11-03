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
    date: new Date(),
    userPhoto: "../images/userPhoto.png",
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
        toast.success("Successfully registered! Welcome!");
        navigate("/login", { userPhoto: user.userPhoto });
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
        <input
          type="date"
          name="date"
          placeholder="Date of Birth"
          value={user.date}
          onChange={(e) => setUser({ ...user, date: e.target.value })}
        />
        <input
          type="text"
          name="userPhoto"
          placeholder="User Photo"
          value={user.userPhoto}
          onChange={(e) => setUser({ ...user, userPhoto: e.target.value })}
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
