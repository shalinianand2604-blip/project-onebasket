import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  Pill,
  HeartPulse,
  Thermometer,
  Bandage,
  Eye,
  Sparkles,
  Stethoscope,
  Bone,
  Leaf,
  Dumbbell,
  Home,
  Activity,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

import "./Medicines.css";


/* =========================================================
   MEDICINE CATEGORIES
========================================================= */

const categories = [
  {
    name: "Pain Relief",
    count: "4 options",
    icon: Pill,
    color: "purple",
    subcategories: [
      "Paracetamol",
      "Ibuprofen",
      "Dolo 650",
      "Pain Relief Tablets",
    ],
  },

  {
    name: "Cold & Cough",
    count: "4 options",
    icon: Thermometer,
    color: "pink",
    subcategories: [
      "Cough Syrups",
      "Cold Tablets",
      "Cough Drops",
      "Cold & Flu Relief",
    ],
  },

  {
    name: "First Aid",
    count: "4 options",
    icon: Bandage,
    color: "yellow",
    subcategories: [
      "Bandages",
      "Antiseptic",
      "Wound Care",
      "First Aid Kits",
    ],
  },

  {
    name: "Eye & Ear Care",
    count: "4 options",
    icon: Eye,
    color: "green",
    subcategories: [
      "Eye Drops",
      "Ear Drops",
      "Eye Care",
      "Ear Care",
    ],
  },

  {
    name: "Vitamins",
    count: "4 options",
    icon: Sparkles,
    color: "yellow",
    subcategories: [
      "Vitamin C",
      "Vitamin D",
      "Vitamin B",
      "Multivitamins",
    ],
  },

  {
    name: "Women's Care",
    count: "8 categories",
    icon: HeartPulse,
    color: "pink",
    subcategories: [
      "Feminine Hygiene",
      "Menstrual Care",
      "Pregnancy Care",
      "Women's Supplements",
      "Menstrual Cups",
      "Sanitary Pads",
      "Tampons",
      "Intimate Care",
    ],
  },

  {
    name: "Health Devices",
    count: "9 categories",
    icon: Stethoscope,
    color: "green",
    subcategories: [
      "BP Monitors",
      "Glucometers",
      "Thermometers",
      "Pulse Oximeters",
      "Nebulizers",
      "Pregnancy Test Kits",
      "Weighing Machines",
      "Heating Pads",
      "Health Monitors",
    ],
  },

  {
    name: "Supports & Orthopedic",
    count: "7 categories",
    icon: Bone,
    color: "pink",
    subcategories: [
      "Knee Supports",
      "Back Supports",
      "Neck Supports",
      "Wrist Supports",
      "Ankle Supports",
      "Arm Supports",
      "Orthopedic Supports",
    ],
  },

  {
    name: "Ayurveda & Herbal",
    count: "9 categories",
    icon: Leaf,
    color: "green",
    subcategories: [
      "Amla",
      "Tulsi",
      "Aloe Vera",
      "Ashwagandha",
      "Giloy",
      "Triphala",
      "Neem",
      "Herbal Juices",
      "Chyawanprash",
    ],
  },

  {
    name: "Sports & Fitness",
    count: "7 categories",
    icon: Dumbbell,
    color: "yellow",
    subcategories: [
      "Protein Powders",
      "Protein Bars",
      "Sports Drinks",
      "Energy Supplements",
      "Workout Supplements",
      "Recovery Products",
      "Fitness Accessories",
    ],
  },

  {
    name: "Home Health Essentials",
    count: "7 categories",
    icon: Home,
    color: "green",
    subcategories: [
      "Antiseptic Liquids",
      "Insect Repellents",
      "Cleaning Essentials",
      "Room Fresheners",
      "Pet Care",
      "Batteries",
      "Home Health Products",
    ],
  },

  {
    name: "Health Conditions",
    count: "11 categories",
    icon: Activity,
    color: "pink",
    subcategories: [
      "Diabetes Care",
      "Heart Care",
      "Digestive Health",
      "Liver Care",
      "Immunity",
      "Skin Care",
      "Hair Care",
      "Bone & Joint Care",
      "Respiratory Care",
      "Women's Health",
      "General Wellness",
    ],
  },
];


/* =========================================================
   AVAILABLE PRODUCTS
========================================================= */

const products = [
  {
    name: "Paracetamol",
    type: "Pain Relief",
  },

  {
    name: "Paracetamol 500mg",
    type: "Pain Relief",
  },

  {
    name: "Paracetamol 650mg",
    type: "Pain Relief",
  },

  {
    name: "Crocin",
    type: "Pain Relief",
  },

  {
    name: "Dolo 650",
    type: "Pain Relief",
  },

  {
    name: "Ibuprofen",
    type: "Pain Relief",
  },

  {
    name: "Cetirizine",
    type: "Cold & Cough",
  },

  {
    name: "Azithromycin",
    type: "General",
  },

  {
    name: "Vitamin C",
    type: "Vitamins",
  },

  {
    name: "Vitamin D",
    type: "Vitamins",
  },

  {
    name: "Vitamin B Complex",
    type: "Vitamins",
  },

  {
    name: "Multivitamins",
    type: "Vitamins",
  },

  {
    name: "Cough Syrup",
    type: "Cold & Cough",
  },

  {
    name: "Cold & Cough Tablets",
    type: "Cold & Cough",
  },

  {
    name: "Pain Relief Tablets",
    type: "Pain Relief",
  },

  {
    name: "First Aid Kit",
    type: "First Aid",
  },

  {
    name: "Eye Drops",
    type: "Eye & Ear Care",
  },

  {
    name: "Ear Drops",
    type: "Eye & Ear Care",
  },

  {
    name: "Antiseptic",
    type: "First Aid",
  },

  {
    name: "Bandages",
    type: "First Aid",
  },
];


/* =========================================================
   MEDICINES PAGE
========================================================= */

function Medicines() {

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();


  /* =========================================================
     SEARCH
  ========================================================= */

  const search =
    searchParams.get("search") || "";


  /* =========================================================
     CHECK WHETHER USER CAME FROM CATEGORY
  ========================================================= */

  const fromCategory =
    searchParams.get("fromCategory") === "true";


  /* =========================================================
     OPEN CATEGORY
  ========================================================= */

  const [openCategory, setOpenCategory] =
    useState(null);


  /* =========================================================
     FILTER PANEL
  ========================================================= */

  const [filterOpen, setFilterOpen] =
    useState(false);


  /* =========================================================
     SELECTED FILTER
  ========================================================= */

  const [selectedFilter, setSelectedFilter] =
    useState("All");


  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const filterOptions = [
    "All",
    "Pain Relief",
    "Cold & Cough",
    "First Aid",
    "Eye & Ear Care",
    "Vitamins",
  ];


  /* =========================================================
     SEARCH + FILTER RESULTS
  ========================================================= */

  const results = products.filter((product) => {

    const matchesSearch =
      !search.trim() ||
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesFilter =
      selectedFilter === "All" ||
      product.type === selectedFilter;


    return (
      matchesSearch &&
      matchesFilter
    );

  });


  /* =========================================================
     CATEGORY OPEN / CLOSE
  ========================================================= */

  const handleCategoryClick = (
    categoryName
  ) => {

    setOpenCategory((current) =>
      current === categoryName
        ? null
        : categoryName
    );

  };


  /* =========================================================
     SUBCATEGORY CLICK
  ========================================================= */

  const handleSubcategoryClick = (
    subcategory
  ) => {

    /* Close category */
    setOpenCategory(null);

    /* Close filter */
    setFilterOpen(false);

    /*
      IMPORTANT:
      fromCategory=true tells the page
      that the user came from a category.
    */

    navigate(
      `/medicines?search=${encodeURIComponent(
        subcategory
      )}&fromCategory=true`
    );

  };


  /* =========================================================
     PRODUCT CLICK
  ========================================================= */

  const handleMedicineClick = (
    medicine
  ) => {

    setOpenCategory(null);

    setFilterOpen(false);

    navigate(
      `/medicines?search=${encodeURIComponent(
        medicine
      )}`
    );

  };


  /* =========================================================
     CLEAR SEARCH
  ========================================================= */

  const handleClearSearch = () => {

    navigate("/medicines");

    setOpenCategory(null);

    setFilterOpen(false);

    setSelectedFilter("All");

  };


  /* =========================================================
     CLEAR FILTER
  ========================================================= */

  const handleClearFilter = () => {

    setSelectedFilter("All");

  };


  /* =========================================================
     FILTER SELECTION
  ========================================================= */

  const handleFilterSelect = (
    filter
  ) => {

    setSelectedFilter(filter);

  };


  return (

    <div className="medicines-page">


      {/* =====================================================
          SEARCH RESULTS
      ===================================================== */}

      {search && (

        <section className="search-results">


          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div className="results-top">

            <div>

              <p className="results-label">
                {fromCategory
                  ? "MEDICINE"
                  : "SEARCH RESULTS"}
              </p>


              <h1>

                Showing results for:

                <span>
                  "{search}"
                </span>

              </h1>


              <p className="results-count">

                {results.length} products found

              </p>

            </div>


            {/* =================================================
                FILTER

                IMPORTANT:
                Hidden when user comes from
                a medicine category.
            ================================================= */}

            {!fromCategory && (

              <div className="filter-wrapper">


                {/* FILTER BUTTON */}

                <button
                  type="button"
                  className={
                    `filter-button ${
                      filterOpen
                        ? "filter-active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    setFilterOpen(
                      !filterOpen
                    )
                  }
                >

                  <SlidersHorizontal
                    size={17}
                  />

                  <span>
                    Filter
                  </span>

                  <ChevronDown
                    size={15}
                    className={
                      filterOpen
                        ? "filter-arrow-open"
                        : ""
                    }
                  />

                </button>


                {/* =================================================
                    FILTER PANEL
                ================================================= */}

                {filterOpen && (

                  <div className="medicine-filter-panel">


                    {/* FILTER HEADER */}

                    <div className="filter-header">

                      <div>

                        <h3>
                          Filter Medicines
                        </h3>

                        <p>
                          Choose a medicine category
                        </p>

                      </div>


                      <button
                        type="button"
                        className="filter-close"
                        onClick={() =>
                          setFilterOpen(false)
                        }
                        aria-label="Close filter"
                      >

                        <X size={18} />

                      </button>

                    </div>


                    {/* FILTER OPTIONS */}

                    <div className="filter-options">

                      {filterOptions.map(
                        (filter) => (

                          <label
                            className={
                              `filter-option ${
                                selectedFilter ===
                                filter
                                  ? "selected"
                                  : ""
                              }`
                            }
                            key={filter}
                          >

                            <input
                              type="radio"
                              name="medicine-filter"
                              checked={
                                selectedFilter ===
                                filter
                              }
                              onChange={() =>
                                handleFilterSelect(
                                  filter
                                )
                              }
                            />

                            <span>
                              {filter}
                            </span>

                          </label>

                        )
                      )}

                    </div>


                    {/* FILTER FOOTER */}

                    <div className="filter-bottom">

                      <button
                        type="button"
                        className="clear-filter"
                        onClick={
                          handleClearFilter
                        }
                      >
                        Clear All
                      </button>


                      <button
                        type="button"
                        className="apply-filter"
                        onClick={() =>
                          setFilterOpen(false)
                        }
                      >
                        Apply Filters
                      </button>

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>


          {/* =================================================
              RESULTS
          ================================================= */}

          {results.length > 0 ? (

            <div className="medicine-results">

              {results.map((product) => (

                <button
                  className="medicine-result-card"
                  key={product.name}
                  type="button"
                  onClick={() =>
                    handleMedicineClick(
                      product.name
                    )
                  }
                >

                  {/* ICON */}

                  <div className="result-icon">
                    💊
                  </div>


                  {/* DETAILS */}

                  <div className="result-details">

                    <p className="result-category">
                      {product.type}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      Available medicine
                    </p>

                  </div>


                  {/* VIEW PRODUCT */}

                  <div className="view-product">

                    <span>
                      View Product
                    </span>

                    <ArrowRight
                      size={16}
                    />

                  </div>

                </button>

              ))}

            </div>

          ) : (

            /* =================================================
               NO RESULTS
            ================================================= */

            <div className="no-results">

              <div className="no-result-icon">
                💊
              </div>

              <h2>
                No products found
              </h2>

              <p>
                Try searching for another medicine.
              </p>


              <button
                type="button"
                className="browse-medicines-btn"
                onClick={
                  handleClearSearch
                }
              >
                Browse Medicines
              </button>

            </div>

          )}

        </section>

      )}


      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}

      <section className="medicine-category-section">


        {/* HEADING */}

        <div className="medicine-heading">

          <div>

            <p>
              SHOP BY CATEGORY
            </p>

            <h1>
              Find what you need
            </h1>

          </div>

        </div>


        {/* =================================================
            ALL MEDICINES
        ================================================= */}

        <button
          className="all-medicines"
          type="button"
          onClick={() => {

            setOpenCategory(null);

            setFilterOpen(false);

            setSelectedFilter("All");

            navigate("/medicines");

          }}
        >

          <Pill size={21} />

          <span>
            All Medicines
          </span>

        </button>


        {/* =================================================
            CATEGORY GRID
        ================================================= */}

        <div className="medicine-category-grid">

          {categories.map((category) => {

            const Icon =
              category.icon;

            const isOpen =
              openCategory ===
              category.name;


            return (

              <div
                className={
                  `medicine-category-card ${
                    isOpen
                      ? "active"
                      : ""
                  }`
                }
                key={category.name}
              >


                {/* =================================================
                    CATEGORY HEADER
                ================================================= */}

                <button
                  type="button"
                  className="medicine-card-header"
                  onClick={() =>
                    handleCategoryClick(
                      category.name
                    )
                  }
                >

                  {/* ICON */}

                  <div
                    className={
                      `category-icon-box ${
                        category.color
                      }`
                    }
                  >

                    <Icon size={23} />

                  </div>


                  {/* INFORMATION */}

                  <div className="category-info">

                    <h3>
                      {category.name}
                    </h3>

                    <p>
                      {category.count}
                    </p>

                  </div>


                  {/* ARROW */}

                  <ChevronDown
                    size={18}
                    className={
                      `category-arrow ${
                        isOpen
                          ? "open"
                          : ""
                      }`
                    }
                  />

                </button>


                {/* =================================================
                    SUBCATEGORY
                ================================================= */}

                {isOpen && (

                  <div className="subcategory-list">

                    {category.subcategories.map(
                      (subcategory) => (

                        <button
                          type="button"
                          className="subcategory-item"
                          key={subcategory}
                          onClick={() =>
                            handleSubcategoryClick(
                              subcategory
                            )
                          }
                        >

                          <span>
                            {subcategory}
                          </span>

                          <ArrowRight
                            size={15}
                          />

                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </section>

    </div>

  );

}


export default Medicines;