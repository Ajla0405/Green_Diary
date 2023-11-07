import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import "./MyPlantPage.css";
import { Link } from "react-router-dom";

const MyPlantPage = () => {
  const { userData, isLoggedIn } = useAuth();
  const [savedPlants, setSavedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn && userData.savedPlants && userData.savedPlants.length > 0) {
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
  }, [isLoggedIn, userData.savedPlants]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div id="my-plants-page">
      <h1>My Plants</h1>
      <ul id="my-plants-item" className="grid-container">
        {savedPlants.map((savedPlant) => (
          <li className="grid-item" key={savedPlant._id}>
            <h6>{savedPlant.name}</h6>
            <Link to={`/plant/${savedPlant._id}`}>
              <img src={savedPlant.url} alt={savedPlant.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPlantPage;
