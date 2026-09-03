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

  const handleSearch = (value = search) => {

    const query = value.trim();

    if (!query) {
      return;
    }

    navigate(
      `/medicines?search=${encodeURIComponent(query)}`
    );
  };

  const handleSuggestionClick = (suggestion) => {

    setSearch(suggestion);

    handleSearch(suggestion);
  };


  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleScan = () => {
    navigate("/scan");
  };
  return (

    <div className="search-wrapper">

      <div className="search-container">

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

          <button
            type="button"
            className="scan-button"
            onClick={handleScan}
            aria-label="Open scanner"
          >

            <Camera size={18} />
              Scan
            

          </button>

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