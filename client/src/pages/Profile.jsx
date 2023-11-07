import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import "./Profile.css";

const Profile = () => {
  const { authToken } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="my-profile">
      <h4>My profile</h4>
      {user ? (
        <div className="my-profile-text">
          <div className="my-profile-para">
            <p>First Name: </p>
            <p>{user.firstName}</p>
          </div>
          <div className="my-profile-para">
            <p>Last Name: </p>
            <p>{user.lastName}</p>
          </div>
          <div className="my-profile-para">
            <p>Email: </p>
            <p>{user.email}</p>
          </div>
          <div className="my-profile-para">
            <p>Username: </p>
            <p>{user.username}</p>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
