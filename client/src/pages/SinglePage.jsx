import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SinglePage.css";
import { useAuth } from "../Context/AuthProvider";

const SinglePage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/plants/${id}`)
      .then((response) => {
        setPlant(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Fetch the user's data, including the list of saved plants
    axios
      .get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        const userData = response.data;
        // Check if the plant ID is in the user's list of saved plants
        if (userData.savedPlant.includes(id)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id, authToken]);

  const handleSave = () => {
    axios
      .post(`http://localhost:8000/users/savedPlant/${id}`, null, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setIsSaved(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="single-page">
      <div className="header-part">
        <div className="left-side">
          <h1>{plant.name}</h1>
          <p>{plant.scientificName}</p>
          {isSaved ? (
            <button disabled>Saved</button>
          ) : (
            <button onClick={handleSave}>Save</button>
          )}
        </div>
        <div className="right-side">
          <img src={plant.url} alt={plant.name} />
        </div>
      </div>
      <div className="plant-care">
        <p>Watering: {plant.plantCare.watering}</p>
        <p>Light: {plant.plantCare.light}</p>
        <p>Temperature: {plant.plantCare.temperature}</p>
        <p>Fertilization: {plant.plantCare.fertilization}</p>
      </div>

      <div className="plant-informations">
        <h3>Information</h3>
        <p>{plant.information}</p>
        <h3>Fun Facts</h3>
        <p>{plant.funFact}</p>
      </div>
    </div>
  );
};

export default SinglePage;
