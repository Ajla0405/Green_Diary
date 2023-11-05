import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";

const Profile = () => {
  const { authToken } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [authToken]);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <h2>Saved Plants</h2>
          <ul>
            {user.savedPlants.map((plant) => (
              <li key={plant._id}>{plant.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
