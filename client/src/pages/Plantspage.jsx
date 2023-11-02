import React from "react";
import "./PlantsPage.css";
import imageExample from "../images/heroImage4.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://greendiary-server.onrender.com/plants")
      .then((response) => {
        setPlants(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div id="plants-container">
      <div id="plants-search">
        <button>Search By Name</button>
        <button>Search By Image</button>
      </div>
      <div className="grid-container" id="plants-list">
        {plants.map((plant) => (
          <div className="grid-item" key={plant._id}>
            <Link to={`/plant/${plant._id}`}>
              <img src={plant.url} alt={plant.name} />
              <p>{plant.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div id="plants-pagination">
        <button>More</button>
      </div>
    </div>
  );
};

export default PlantsPage;
