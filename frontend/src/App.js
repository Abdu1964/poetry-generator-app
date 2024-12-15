import React, { useState } from "react";
import axios from "axios";
import { FaFeatherAlt } from "react-icons/fa";

const App = () => {
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("");
  const [poem, setPoem] = useState("");
  const [error, setError] = useState("");

  const generatePoem = async () => {
    try {
      setError("");
      setPoem("Generating...");

      const response = await axios.post("http://localhost:5000/generate-poetry", {
        keywords: keywords.split(","),
        style: style.trim(),
      });

      setPoem(response.data.poem);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while generating the poem.");
      setPoem("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-400 via-purple-600 to-pink-600 min-h-screen flex items-center justify-center font-serif text-white">
      <div className="max-w-4xl w-full p-8 bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center gap-2">
          <FaFeatherAlt /> Poetry Generator
        </h1>
        <p className="text-lg text-center text-gray-300 mb-6">
          Enter keywords and an optional style to generate a beautiful poem.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Keywords (comma-separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full p-4 rounded-md bg-white bg-opacity-30 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-lg"
          />
          <input
            type="text"
            placeholder="Style (e.g., Shakespearean sonnet)"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-4 rounded-md bg-white bg-opacity-30 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-lg"
          />
          <button
            onClick={generatePoem}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-700 hover:bg-gradient-to-l text-white font-semibold py-3 rounded-md transition-all duration-300 shadow-lg"
          >
            Generate Poem
          </button>
        </div>
        {error && <p className="text-red-400 text-center mt-6">{error}</p>}
        {poem && (
          <div className="mt-8 p-8 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800 rounded-3xl shadow-xl text-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Your Poem:</h2>
            <div className="poem-container text-center leading-relaxed text-lg">
              {/* Split poem into lines and render each line as a separate ! <p> */}
              {poem.split("\n").map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
