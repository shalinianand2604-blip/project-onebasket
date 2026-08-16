import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Pill,
  HeartPulse,
  Thermometer,
  Bandage,
  Eye,
  Apple,
  Sparkles,
  Stethoscope,
  Bone,
  Leaf,
  Dumbbell,
  Home,
  Activity,
  ChevronDown,
} from "lucide-react";

import "./Medicines.css";


const categories = [
  {
    name: "Pain Relief",
    count: "4 options",
    icon: Pill,
    color: "purple",
  },

  {
    name: "Cold & Cough",
    count: "4 options",
    icon: Thermometer,
    color: "pink",
  },

  {
    name: "First Aid",
    count: "4 options",
    icon: Bandage,
    color: "yellow",
  },

  {
    name: "Eye & Ear Care",
    count: "4 options",
    icon: Eye,
    color: "green",
  },

  {
    name: "Vitamins",
    count: "4 options",
    icon: Sparkles,
    color: "yellow",
  },

  {
    name: "Women's Care",
    count: "8 categories",
    icon: HeartPulse,
    color: "pink",
  },

  {
    name: "Personal Care",
    count: "11 categories",
    icon: Sparkles,
    color: "purple",
  },

  {
    name: "Health Devices",
    count: "9 categories",
    icon: Stethoscope,
    color: "green",
  },

  {
    name: "Supports & Orthopedic",
    count: "7 categories",
    icon: Bone,
    color: "pink",
  },

  {
    name: "Ayurveda & Herbal",
    count: "9 categories",
    icon: Leaf,
    color: "green",
  },

  {
    name: "Sports & Fitness",
    count: "7 categories",
    icon: Dumbbell,
    color: "yellow",
  },

  {
    name: "Home Health Essentials",
    count: "7 categories",
    icon: Home,
    color: "green",
  },

  {
    name: "Health Conditions",
    count: "11 categories",
    icon: Activity,
    color: "pink",
  },
];


function Medicines() {

  const [searchParams] = useSearchParams();

  const search =
    searchParams.get("search") || "";


  const results = useMemo(() => {

    if (!search.trim()) {
      return [];
    }

    const query =
      search.toLowerCase();

    const products = [
      "Paracetamol",
      "Paracetamol 500mg",
      "Paracetamol 650mg",
      "Crocin",
      "Dolo 650",
      "Ibuprofen",
      "Cetirizine",
      "Azithromycin",
    ];

    return products.filter((product) =>
      product
        .toLowerCase()
        .includes(query)
    );

  }, [search]);


  return (

    <div className="medicines-page">


      {/* SEARCH RESULT */}

      {search && (

        <section className="search-results">

          <p className="results-label">
            SEARCH RESULTS
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


          {results.length > 0 ? (

            <div className="medicine-results">

              {results.map((product) => (

                <div
                  className="medicine-result-card"
                  key={product}
                >

                  <div className="result-icon">
                    💊
                  </div>

                  <div>

                    <h3>
                      {product}
                    </h3>

                    <p>
                      Medicine
                    </p>

                  </div>

                  <strong>
                    View Product →
                  </strong>

                </div>

              ))}

            </div>

          ) : (

            <div className="no-results">

              <h2>
                No products found
              </h2>

              <p>
                Try searching for another medicine.
              </p>

            </div>

          )}

        </section>

      )}


      {/* =================================================
          CATEGORY SECTION
      ================================================= */}

      <section className="medicine-category-section">

        <div className="medicine-heading">

          <p>
            SHOP BY CATEGORY
          </p>

          <h1>
            Find what you need
          </h1>

          <span>
            Choose a category to explore
            medicines and healthcare products.
          </span>

        </div>


        {/* ALL MEDICINES */}

        <button
          className="all-medicines"
          type="button"
        >

          <Pill size={22} />

          <span>
            All Medicines
          </span>

        </button>


        {/* CATEGORY GRID */}

        <div className="medicine-category-grid">

          {categories.map(
            (category) => {

              const Icon =
                category.icon;

              return (

                <div
                  className="medicine-category-card"
                  key={category.name}
                >

                  <div
                    className={`category-icon-box ${category.color}`}
                  >
                    <Icon size={24} />
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
                    className="category-arrow"
                  />

                </div>

              );

            }
          )}

        </div>

      </section>

    </div>
  );
}

export default Medicines;