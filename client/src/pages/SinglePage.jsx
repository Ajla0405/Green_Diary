import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SinglePage.css";
import { useAuth } from "../Context/AuthProvider";
import Calendar from "../components/Calendar";

const SinglePage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, isLoggedIn } = useAuth();
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
    if (
      isLoggedIn &&
      userData.savedPlants &&
      userData.savedPlants.includes(id)
    ) {
      setIsSaved(true);
    }
  }, [id, isLoggedIn, userData.savedPlants]);

  const handleSave = () => {
    if (isLoggedIn) {
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
    } else {
      alert("Please log in to save the plant.");
    }
  };

  const handleUnsave = () => {
    if (isLoggedIn) {
      axios
        .delete(`http://localhost:8000/users/unsavePlant/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setIsSaved(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
          {isLoggedIn && !isSaved ? (
            <button onClick={handleSave}>Save</button>
          ) : isLoggedIn && isSaved ? (
            <button onClick={handleUnsave}>Unsave</button>
          ) : (
            <button onClick={handleSave}>Log in to Save</button>
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
      <div className="calendar-container">
        <Calendar />
      </div>
    </div>
  );
};

export default SinglePage;
