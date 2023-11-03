import React from "react";
import "../pages/PlantsPage.css";

const SearchByName = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <div className="search-function-component">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="  Search Plant By Name"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </form>
    </div>
  );
};

export default SearchByName;
