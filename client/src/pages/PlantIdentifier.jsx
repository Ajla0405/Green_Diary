import React, { useState } from "react";
import axios from "axios";
import "./PlantIdentifier.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const PlantIdentifier = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [details, setDetails] = useState(false);
  // const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImageURLs(fileURLs);
  };

  const sendIdentification = async () => {
    const base64files = await Promise.all(
      selectedFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const res = event.target.result;
              resolve(res);
            };
            reader.readAsDataURL(file);
          })
      )
    );

    const data = {
      api_key: "zsShTl1EsZaIXlWEHVp3SvCosJY0PbiKxHF9HVjueKDZmBvGx7",
      images: base64files,
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    try {
      const response = await axios.post(
        "https://api.plant.id/v2/identify",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      setResults(response.data);

      // if (response.data.suggestions.length > 0) {
      //   navigate(`/plant/${response.data.suggestions[0].plant_id}`);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div className="plant-identifier">
      <div className="identifier-guidance">
        <h1>Plant Identification</h1>
        <h6>What's the name of this plant?</h6>
        <p>Step 1: Click to choose an image from your device</p>
        <p>Step 2: Click 'Identify" and wait for a second</p>
        <p>Step 3: Click on "See Details" to discover more about your plant</p>
      </div>
      <div id="upload-and-result">
        <div id="identifier-image-upload">
          <form>
            <input type="file" multiple onChange={handleFileChange} />
            <button type="button" onClick={sendIdentification}>
              Identify
            </button>
          </form>
          {imageURLs.length > 0 && (
            <div id="uploaded-images">
              {imageURLs.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded Image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        {results && (
          <div id="plant-suggestion">
            <h4>Plants we suggested:</h4>
            <div id="plant-suggestion-details">
              <h6>Name: {results.suggestions[0].plant_details.common_names}</h6>
              <p>Scientific name: {results.suggestions[0].plant_name}</p>
              <button onClick={toggleDetails}>
                {details ? "Hide Details" : "See details"}
              </button>
              {details && (
                <p>
                  {results.suggestions[0].plant_details.wiki_description.value}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PlantIdentifier;
