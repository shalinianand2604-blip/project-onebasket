import { useState } from "react";
import { MapPin, ChevronDown, X } from "lucide-react";
import "./LocationSelector.css";

const locations = {
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Thanjavur",
  ],

  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Mangaluru",
    "Hubballi",
    "Belagavi",
    "Davanagere",
    "Shivamogga",
  ],

  Kerala: [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Kannur",
    "Alappuzha",
  ],

  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
  ],

  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
    "Secunderabad",
  ],

  Puducherry: [
    "Puducherry",
    "Karaikal",
    "Mahe",
    "Yanam",
  ],
};

function LocationSelector() {
  const [open, setOpen] = useState(false);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleStateChange = (e) => {
    setState(e.target.value);

    // IMPORTANT:
    // Do NOT automatically select a city.
    setCity("");
  };

  const handleSave = () => {
    if (!state) {
      alert("Please select a state.");
      return;
    }

    if (!city) {
      alert("Please select a city.");
      return;
    }

    setOpen(false);
  };

  return (
    <div className="location-wrapper">

      {/* LOCATION BUTTON */}

      <button
        type="button"
        className="location-btn"
        onClick={() => setOpen(!open)}
      >

        <MapPin size={17} />

        <span>
          <small>Deliver to</small>

          {city || "Select location"}
        </span>

        <ChevronDown size={14} />

      </button>


      {/* LOCATION POPUP */}

      {open && (

        <div className="location-popup">

          {/* HEADER */}

          <div className="location-header">

            <div>

              <h3>
                Choose your location
              </h3>

              <p>
                Select your state and city
              </p>

            </div>

            <button
              type="button"
              className="location-close"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>

          </div>


          {/* STATE */}

          <div className="location-field">

            <label>
              State
            </label>

            <select
              value={state}
              onChange={handleStateChange}
            >

              <option value="">
                Select State
              </option>

              {Object.keys(locations).map(
                (stateName) => (

                  <option
                    key={stateName}
                    value={stateName}
                  >
                    {stateName}
                  </option>

                )
              )}

            </select>

          </div>


          {/* CITY */}

          <div className="location-field">

            <label>
              City
            </label>

            <select
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              disabled={!state}
            >

              <option value="">
                {state
                  ? "Select City"
                  : "Select State first"}
              </option>

              {state &&
                locations[state].map(
                  (cityName) => (

                    <option
                      key={cityName}
                      value={cityName}
                    >
                      {cityName}
                    </option>

                  )
                )}

            </select>

          </div>


          {/* SAVE */}

          <button
            type="button"
            className="location-save"
            onClick={handleSave}
          >
            Confirm Location
          </button>

        </div>

      )}

    </div>
  );
}

export default LocationSelector;