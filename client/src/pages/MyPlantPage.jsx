import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import "./MyPlantPage.css";

const MyPlantPage = () => {
  const { userData } = useAuth();
  const [savedPlants, setSavedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData.savedPlants && userData.savedPlants.length > 0) {
      const savedPlantIds = userData.savedPlants;

      const fetchSavedPlants = async () => {
        try {
          const response = await axios.get("http://localhost:8000/plants", {
            withCredentials: true,
          });

          const filteredSavedPlants = response.data.filter((plant) =>
            savedPlantIds.includes(plant._id)
          );

          setSavedPlants(filteredSavedPlants);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchSavedPlants();
    } else {
      setSavedPlants([]);
      setLoading(false);
    }
  }, [userData.savedPlants]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="my-plants-page">
      <h1>Your Saved Plants</h1>
      <ul>
        {savedPlants.map((savedPlant) => (
          <li key={savedPlant._id}>
            <h3>{savedPlant.name}</h3>
            <img src={savedPlant.url} alt={savedPlant.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPlantPage;
