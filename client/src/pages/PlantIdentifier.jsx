import React, { useState } from "react";
import axios from "axios";
import "./PlantIdentifier.css";

const PlantIdentifier = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="plant-identifier">
      {/* <div className="indentifier-guidance">
        <h1>Plant Identification</h1>
        <h6>What's the name of this plant?</h6>
        <p>Step 1: Click to choose image from your device</p>
        <p>Step 2: Click 'Identify" and wait for a second</p>
        <p>
          Step 3: Click on details in one of three predictions to discover more
          about your plant
        </p>
      </div> */}
      <div className="identifier-image-upload">
        <form>
          <input type="file" multiple onChange={handleFileChange} />
          <button type="button" onClick={sendIdentification}>
            Identify
          </button>
        </form>
        {imageURLs.length > 0 && (
          <div className="uploaded-images">
            {imageURLs.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded Image ${index + 1}`} />
            ))}
          </div>
        )}
      </div>
      {results && (
        <div className="plant-suggestion">
          <h3>Plants we suggested:</h3>
          <div>
            <h3>Name: {results.suggestions[0].plant_details.common_names}</h3>
            <p>Scientific name:{results.suggestions[0].plant_name}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PlantIdentifier;
