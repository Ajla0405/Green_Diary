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

  const handleSave = () => {
    axios
      .post(`http://localhost:8000/users/savedPlant/${id}`, plant, {
        withCredentials: true,
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
        <div>
          <img src="/public/watering-plant.png" alt="Watering Icon" />
          <p>Watering: {plant.plantCare.watering}</p>
        </div>
        <div>
          <img src="/public/brightness.png" alt="Light Icon" />
          <p>Light: {plant.plantCare.light}</p>
        </div>
        <div>
          <img src="/public/remperature.png" alt="Temperature Icon" />
          <p>Temperature: {plant.plantCare.temperature}</p>
        </div>
        <div>
          <img src="/public/digging.png" alt="Fertilization Icon" />
          <p>Fertilization: {plant.plantCare.fertilization}</p>
        </div>
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
