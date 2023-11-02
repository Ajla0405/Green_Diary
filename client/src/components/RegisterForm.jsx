import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    date: new Date(), // Set the current date as the default
    userPhoto: "../images/userPhoto.png", // Set a default image path
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        user, // Send the user object as the request body
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Successfully registered! Welcome!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

export default RegisterForm;
