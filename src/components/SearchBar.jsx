import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Camera,
  X,
} from "lucide-react";

import "./SearchBar.css";


const suggestions = [
  "Paracetamol",
  "Paracetamol 500mg",
  "Paracetamol 650mg",
  "Crocin",
  "Dolo 650",
  "Ibuprofen",
  "Cetirizine",
  "Azithromycin",
  "Vitamin C",
  "Vitamin D",
  "Cold & Cough",
  "Pain Relief",
  "First Aid",
  "Baby Care",
  "Baby Creams",
  "Baby Lotion",
  "Diapers",
  "Wipes",
  "Vitamins & Supplements",
  "Health Devices",
];


function SearchBar({
  placeholder = "Search medicines, groceries & more...",
}) {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();


  /* ================= FILTER ================= */

  const filteredSuggestions =
    search.trim().length > 0
      ? suggestions
          .filter((item) =>
            item
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .slice(0, 6)
      : [];


  /* ================= SEARCH ================= */

  const handleSearch = (value = search) => {

    const query = value.trim();

    if (!query) {
      return;
    }

    navigate(
      `/medicines?search=${encodeURIComponent(query)}`
    );
  };


  /* ================= SUGGESTION ================= */

  const handleSuggestionClick = (suggestion) => {

    setSearch(suggestion);

    handleSearch(suggestion);
  };


  /* ================= ENTER ================= */

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleSearch();
    }
  };


  return (

    <div className="search-wrapper">

      <div className="search-container">


        {/* ================= SEARCH BAR ================= */}

        <div className="search-bar">

          <Search
            size={22}
            className="search-icon"
          />


          <input
            type="text"
            value={search}
            placeholder={placeholder}

            onChange={(event) =>
              setSearch(event.target.value)
            }

            onKeyDown={handleKeyDown}
          />


          {/* CLEAR */}

          {search && (

            <button
              type="button"
              className="clear-search"

              onClick={() =>
                setSearch("")
              }
            >
              <X size={17} />
            </button>

          )}


          {/* SCAN */}

          <button
            type="button"
            className="scan-button"
          >
            <Camera size={18} />

            <span>
              Scan
            </span>
          </button>


          {/* SEARCH */}

          <button
            type="button"
            className="search-button"

            onClick={() =>
              handleSearch()
            }
          >
            Search
          </button>

        </div>


        {/* ================= SUGGESTIONS ================= */}

        {filteredSuggestions.length > 0 && (

          <div className="search-suggestions">

            {filteredSuggestions.map(
              (suggestion, index) => (

                <button
                  type="button"
                  key={`${suggestion}-${index}`}
                  className="suggestion-item"

                  onClick={() =>
                    handleSuggestionClick(
                      suggestion
                    )
                  }
                >

                  <Search size={17} />

                  <span>
                    {suggestion}
                  </span>

                </button>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );
}

export default SearchBar;