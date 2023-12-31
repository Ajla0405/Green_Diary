import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchByName from "../components/SearchByName";
import Pagination from "../components/Pagination";
import "../pages/PlantsPage.css";

const PlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://greendiary-server.onrender.com/plants")
      .then((response) => {
        setPlants(response.data);
        setIsLoading(false);
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
        <div id="plants-search-first">
          <SearchByName
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
        </div>
        <div id="plants-search-second">
          <button>
            <Link to="/plantIdentifier">Search by Image</Link>
          </button>
          <i className="fa-solid fa-image fa-xl"></i>
        </div>
      </div>
      <div className="grid-container" id="plants-list">
        {currentItems.map((plant) => (
          <div className="grid-item" key={plant._id}>
            <Link to={`/plant/${plant._id}`}>
              <p>{plant.name}</p>
              <img src={plant.url} alt={plant.name} />
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
