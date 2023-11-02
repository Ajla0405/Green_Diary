import React from "react";
import "./PlantsPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchByName from "../components/SearchByName";
import Pagination from "../components/Pagination";

import { Link } from "react-router-dom";


const PlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:8000/plants")
      .then((response) => {
        setPlants(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filtered);
    setCurrentPage(1);
  }, [searchQuery, plants]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlants.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div id="plants-container">
      <div id="plants-search">
        <SearchByName
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        <button>Search By Image</button>
        <i class="fa-regular fa-image fa-xl"></i>
      </div>
      <div className="grid-container" id="plants-list">

        {currentItems.map((plant) => (
          <div className="grid-item" key={plant._id}>
            <img src={plant.url} alt={plant.name} />
            <p>{plant.name}</p>

        {plants.map((plant) => (
          <div className="grid-item" key={plant._id}>
            <Link to={`/plant/${plant._id}`}>
              <img src={plant.url} alt={plant.name} />
              <p>{plant.name}</p>
            </Link>

          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPlants.length / itemsPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PlantsPage;
