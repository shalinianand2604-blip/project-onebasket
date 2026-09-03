import { useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

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
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import "./Medicines.css";

import { useWishlist } from "./WishListContext";
import { useCart } from "./CartContext";


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
    id: 101,
    name: "Paracetamol",
    type: "Pain Relief",
    description: "Common pain and fever relief medicine",
    price: 25,
    mrp: 32,
    discount: "22% OFF",
    rating: 4.7,
    reviews: 156,
  },

  {
    id: 102,
    name: "Paracetamol 500mg",
    type: "Pain Relief",
    description: "500mg pain and fever relief tablets",
    price: 32,
    mrp: 40,
    discount: "20% OFF",
    rating: 4.6,
    reviews: 121,
  },

  {
    id: 103,
    name: "Paracetamol 650mg",
    type: "Pain Relief",
    description: "650mg pain and fever relief tablets",
    price: 38,
    mrp: 46,
    discount: "17% OFF",
    rating: 4.7,
    reviews: 184,
  },

  {
    id: 104,
    name: "Crocin",
    type: "Pain Relief",
    description: "Pain and fever relief medicine",
    price: 30,
    mrp: 36,
    discount: "17% OFF",
    rating: 4.5,
    reviews: 98,
  },

  {
    id: 105,
    name: "Dolo 650",
    type: "Pain Relief",
    description: "650mg tablet for pain and fever relief",
    price: 30,
    mrp: 38,
    discount: "21% OFF",
    rating: 4.8,
    reviews: 245,
  },

  {
    id: 106,
    name: "Ibuprofen",
    type: "Pain Relief",
    description: "Pain and inflammation relief medicine",
    price: 42,
    mrp: 50,
    discount: "16% OFF",
    rating: 4.5,
    reviews: 87,
  },

  {
    id: 107,
    name: "Cetirizine",
    type: "Cold & Cough",
    description: "Common allergy relief medicine",
    price: 28,
    mrp: 35,
    discount: "20% OFF",
    rating: 4.6,
    reviews: 112,
  },

  {
    id: 108,
    name: "Azithromycin",
    type: "General",
    description: "Prescription antibiotic medicine",
    price: 65,
    mrp: 78,
    discount: "17% OFF",
    rating: 4.4,
    reviews: 76,
  },

  {
    id: 109,
    name: "Vitamin C",
    type: "Vitamins",
    description: "Vitamin C supplement tablets",
    price: 120,
    mrp: 145,
    discount: "17% OFF",
    rating: 4.7,
    reviews: 143,
  },

  {
    id: 110,
    name: "Vitamin D",
    type: "Vitamins",
    description: "Vitamin D supplement",
    price: 135,
    mrp: 160,
    discount: "16% OFF",
    rating: 4.6,
    reviews: 91,
  },

  {
    id: 111,
    name: "Vitamin B Complex",
    type: "Vitamins",
    description: "Daily vitamin B complex supplement",
    price: 110,
    mrp: 130,
    discount: "15% OFF",
    rating: 4.5,
    reviews: 84,
  },

  {
    id: 112,
    name: "Multivitamins",
    type: "Vitamins",
    description: "Daily multivitamin supplement",
    price: 180,
    mrp: 220,
    discount: "18% OFF",
    rating: 4.7,
    reviews: 137,
  },

  {
    id: 113,
    name: "Cough Syrup",
    type: "Cold & Cough",
    description: "Soothing cough relief syrup",
    price: 95,
    mrp: 115,
    discount: "17% OFF",
    rating: 4.4,
    reviews: 72,
  },

  {
    id: 114,
    name: "Cold & Cough Tablets",
    type: "Cold & Cough",
    description: "Relief from common cold symptoms",
    price: 48,
    mrp: 60,
    discount: "20% OFF",
    rating: 4.5,
    reviews: 88,
  },

  {
    id: 115,
    name: "Pain Relief Tablets",
    type: "Pain Relief",
    description: "Tablets for everyday pain relief",
    price: 35,
    mrp: 45,
    discount: "22% OFF",
    rating: 4.5,
    reviews: 69,
  },

  {
    id: 116,
    name: "First Aid Kit",
    type: "First Aid",
    description: "Essential supplies for basic first aid",
    price: 249,
    mrp: 299,
    discount: "17% OFF",
    rating: 4.8,
    reviews: 115,
  },

  {
    id: 117,
    name: "Eye Drops",
    type: "Eye & Ear Care",
    description: "Lubricating eye drops",
    price: 89,
    mrp: 105,
    discount: "15% OFF",
    rating: 4.5,
    reviews: 64,
  },

  {
    id: 118,
    name: "Ear Drops",
    type: "Eye & Ear Care",
    description: "Ear care drops",
    price: 78,
    mrp: 95,
    discount: "18% OFF",
    rating: 4.4,
    reviews: 51,
  },

  {
    id: 119,
    name: "Antiseptic",
    type: "First Aid",
    description: "Antiseptic solution for wound care",
    price: 72,
    mrp: 85,
    discount: "15% OFF",
    rating: 4.6,
    reviews: 82,
  },

  {
    id: 120,
    name: "Bandages",
    type: "First Aid",
    description: "Adhesive bandages for minor wounds",
    price: 45,
    mrp: 55,
    discount: "18% OFF",
    rating: 4.7,
    reviews: 97,
  },
];

function Medicines() {

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();
  const {
    addToCart,
  } = useCart();

  const search =
    searchParams.get("search") || "";
  const fromCategory =
    searchParams.get("fromCategory") === "true";

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
     LOCAL CART DISPLAY STATE
  ========================================================= */

  const [addedProducts, setAddedProducts] =
    useState([]);


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

    const searchQuery =
      search.toLowerCase().trim();

    const matchesSearch =
      !searchQuery ||
      product.name
        .toLowerCase()
        .includes(searchQuery) ||
      product.type
        .toLowerCase()
        .includes(searchQuery);

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

    setOpenCategory(null);

    setFilterOpen(false);

    navigate(
      `/medicines?search=${encodeURIComponent(
        subcategory
      )}&fromCategory=true`
    );
  };


  /* =========================================================
     MEDICINE SEARCH CLICK
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
     ADD TO CART
  ========================================================= */

  const handleAddToCart = (product) => {

    addToCart(product);

    setAddedProducts((previous) => {

      if (
        previous.includes(product.id)
      ) {
        return previous;
      }

      return [
        ...previous,
        product.id,
      ];
    });
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
            ================================================= */}

            {!fromCategory && (

              <div className="filter-wrapper">

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


                {filterOpen && (

                  <div className="medicine-filter-panel">

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
              MEDICINE PRODUCT RESULTS
          ================================================= */}

          {results.length > 0 ? (

            <div className="medicine-results">

              {results.map((product) => {

                const liked =
                  isWishlisted(
                    product.id
                  );

                const added =
                  addedProducts.includes(
                    product.id
                  );

                return (

                  <article
                    className="medicine-result-card"
                    key={product.id}
                  >

                    {/* =================================================
                        HEART
                    ================================================= */}

                    <button
                      type="button"
                      className={
                        `medicine-result-wishlist ${
                          liked
                            ? "liked"
                            : ""
                        }`
                      }
                      onClick={(event) => {

                        event.stopPropagation();

                        toggleWishlist(
                          product
                        );

                      }}
                      aria-label={
                        liked
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >

                      <Heart
                        size={18}
                        fill={
                          liked
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>


                    {/* =================================================
                        MEDICINE ICON
                    ================================================= */}

                    <div className="medicine-result-icon">

                      <Pill
                        size={40}
                      />

                    </div>


                    {/* =================================================
                        PRODUCT DETAILS
                    ================================================= */}

                    <div className="medicine-result-details">

                      <span className="medicine-result-category">

                        {product.type}

                      </span>


                      <h3>
                        {product.name}
                      </h3>


                      <p>
                        {product.description}
                      </p>


                      {/* =================================================
                          RATING
                      ================================================= */}

                      <div className="medicine-result-rating">

                        <span>
                          ★
                        </span>

                        <strong>
                          {product.rating}
                        </strong>

                        <small>
                          ({product.reviews})
                        </small>

                      </div>


                      {/* =================================================
                          PRICE
                      ================================================= */}

                      <div className="medicine-result-price">

                        <strong>
                          ₹{product.price}
                        </strong>

                        <del>
                          ₹{product.mrp}
                        </del>

                        <span>
                          {product.discount}
                        </span>

                      </div>


                      {/* =================================================
                          ADD TO CART
                      ================================================= */}

                      <button
                        type="button"
                        className={
                          `medicine-result-cart ${
                            added
                              ? "added"
                              : ""
                          }`
                        }
                        onClick={(event) => {

                          event.stopPropagation();

                          handleAddToCart(
                            product
                          );

                        }}
                      >

                        <ShoppingCart
                          size={15}
                        />

                        {added
                          ? "Added to Cart"
                          : "Add to Cart"}

                      </button>

                    </div>

                  </article>

                );
              })}

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


        {/* ALL MEDICINES */}

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

                {/* CATEGORY HEADER */}

                <button
                  type="button"
                  className="medicine-card-header"
                  onClick={() =>
                    handleCategoryClick(
                      category.name
                    )
                  }
                >

                  <div
                    className={
                      `category-icon-box ${
                        category.color
                      }`
                    }
                  >

                    <Icon size={23} />

                  </div>


                  <div className="category-info">

                    <h3>
                      {category.name}
                    </h3>

                    <p>
                      {category.count}
                    </p>

                  </div>


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


                {/* SUBCATEGORY */}

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