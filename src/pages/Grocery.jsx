import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Apple,
  Milk,
  Wheat,
  Droplets,
  Soup,
  Cookie,
  Coffee,
  Package,
  Sparkles,
  PawPrint,
  ChevronDown,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  SearchX,
} from "lucide-react";

import "./Grocery.css";

const categories = [
  {
    id: "fruits",
    name: "Fruits & Vegetables",
    count: "120+ products",
    icon: Apple,
    color: "green",
    subcategories: [
      "Fresh Fruits",
      "Fresh Vegetables",
      "Leafy Vegetables",
      "Herbs",
    ],
  },

  {
    id: "dairy",
    name: "Dairy & Breakfast",
    count: "90+ products",
    icon: Milk,
    color: "purple",
    subcategories: [
      "Milk",
      "Curd & Yogurt",
      "Butter & Cheese",
      "Eggs",
      "Breakfast Cereals",
    ],
  },

  {
    id: "atta",
    name: "Atta, Rice & Dal",
    count: "150+ products",
    icon: Wheat,
    color: "yellow",
    subcategories: [
      "Rice",
      "Atta & Flour",
      "Dals & Pulses",
      "Millets",
    ],
  },

  {
    id: "oil",
    name: "Oil & Ghee",
    count: "70+ products",
    icon: Droplets,
    color: "yellow",
    subcategories: [
      "Cooking Oils",
      "Ghee",
      "Olive Oil",
      "Coconut Oil",
    ],
  },

  {
    id: "masala",
    name: "Masala & Spices",
    count: "110+ products",
    icon: Soup,
    color: "burgundy",
    subcategories: [
      "Whole Spices",
      "Powdered Spices",
      "Salt & Sugar",
      "Masala Mixes",
    ],
  },

  {
    id: "snacks",
    name: "Snacks & Biscuits",
    count: "180+ products",
    icon: Cookie,
    color: "pink",
    subcategories: [
      "Biscuits",
      "Chips",
      "Namkeen",
      "Cookies",
    ],
  },

  {
    id: "beverages",
    name: "Beverages",
    count: "100+ products",
    icon: Coffee,
    color: "purple",
    subcategories: [
      "Tea",
      "Coffee",
      "Juices",
      "Soft Drinks",
      "Health Drinks",
    ],
  },

  {
    id: "packaged",
    name: "Packaged & Instant Food",
    count: "140+ products",
    icon: Package,
    color: "burgundy",
    subcategories: [
      "Noodles & Pasta",
      "Ready-to-Eat",
      "Sauces & Spreads",
      "Canned Food",
    ],
  },

  {
    id: "cleaning",
    name: "Cleaning & Household",
    count: "100+ products",
    icon: Sparkles,
    color: "green",
    subcategories: [
      "Dishwash",
      "Laundry",
      "Floor Cleaners",
      "Kitchen Essentials",
    ],
  },

  {
    id: "pets",
    name: "Pet Supplies",
    count: "60+ products",
    icon: PawPrint,
    color: "green",
    subcategories: [
      "Dog Food",
      "Cat Food",
      "Pet Treats",
      "Pet Accessories",
    ],
  },
];

const products = [
  {
    id: 1,
    name: "Fresh Red Apples",
    category: "Fruits & Vegetables",
    description: "Crisp and naturally sweet apples",
    price: 149,
    mrp: 180,
    discount: "17% OFF",
    rating: 4.7,
    icon: "🍎",
  },

  {
    id: 2,
    name: "Fresh Cow Milk",
    category: "Dairy & Breakfast",
    description: "Fresh and nutritious dairy milk",
    price: 62,
    mrp: 68,
    discount: "9% OFF",
    rating: 4.8,
    icon: "🥛",
  },

  {
    id: 3,
    name: "Premium Basmati Rice",
    category: "Atta, Rice & Dal",
    description: "Long grain premium basmati rice",
    price: 299,
    mrp: 340,
    discount: "12% OFF",
    rating: 4.6,
    icon: "🍚",
  },

  {
    id: 4,
    name: "Sunflower Cooking Oil",
    category: "Oil & Ghee",
    description: "Light and healthy cooking oil",
    price: 139,
    mrp: 160,
    discount: "13% OFF",
    rating: 4.5,
    icon: "🫗",
  },

  {
    id: 5,
    name: "Garam Masala",
    category: "Masala & Spices",
    description: "Aromatic blend of Indian spices",
    price: 89,
    mrp: 105,
    discount: "15% OFF",
    rating: 4.7,
    icon: "🌶️",
  },

  {
    id: 6,
    name: "Chocolate Cookies",
    category: "Snacks & Biscuits",
    description: "Crunchy cookies with chocolate",
    price: 79,
    mrp: 95,
    discount: "17% OFF",
    rating: 4.6,
    icon: "🍪",
  },

  {
    id: 7,
    name: "Premium Green Tea",
    category: "Beverages",
    description: "Refreshing green tea bags",
    price: 129,
    mrp: 150,
    discount: "14% OFF",
    rating: 4.5,
    icon: "🍵",
  },

  {
    id: 8,
    name: "Instant Noodles",
    category: "Packaged & Instant Food",
    description: "Quick and delicious instant noodles",
    price: 55,
    mrp: 65,
    discount: "15% OFF",
    rating: 4.4,
    icon: "🍜",
  },

  {
    id: 9,
    name: "Fresh Bananas",
    category: "Fruits & Vegetables",
    description: "Naturally sweet fresh bananas",
    price: 49,
    mrp: 60,
    discount: "18% OFF",
    rating: 4.7,
    icon: "🍌",
  },

  {
    id: 10,
    name: "Classic Butter",
    category: "Dairy & Breakfast",
    description: "Creamy dairy butter",
    price: 58,
    mrp: 65,
    discount: "11% OFF",
    rating: 4.6,
    icon: "🧈",
  },

  {
    id: 11,
    name: "Potato Chips",
    category: "Snacks & Biscuits",
    description: "Crispy salted potato chips",
    price: 35,
    mrp: 40,
    discount: "12% OFF",
    rating: 4.5,
    icon: "🥔",
  },

  {
    id: 12,
    name: "Premium Coffee",
    category: "Beverages",
    description: "Rich and aromatic coffee",
    price: 199,
    mrp: 230,
    discount: "13% OFF",
    rating: 4.8,
    icon: "☕",
  },
];

function Grocery() {
  const [searchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search")?.trim().toLowerCase() || "";

  const [openCategory, setOpenCategory] =
    useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);

  const toggleCategory = (id) => {
    setOpenCategory(
      openCategory === id ? null : id
    );
  };

  const selectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setOpenCategory(null);
  };

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter(
            (item) => item !== id
          )
        : [...previous, id]
    );
  };

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        !searchQuery ||
        product.name
          .toLowerCase()
          .includes(searchQuery) ||
        product.category
          .toLowerCase()
          .includes(searchQuery) ||
        product.description
          .toLowerCase()
          .includes(searchQuery);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="grocery-page">

      <div className="grocery-container">

        {/* ================= BREADCRUMB ================= */}

        <div className="grocery-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            Grocery
          </span>

        </div>


        {/* ================= HEADER ================= */}

        <section className="grocery-header">

          <div>

            <div className="grocery-label">

              <ShoppingCart size={14} />

              FRESH • EVERYDAY • ESSENTIALS

            </div>

            <h1>
              Groceries for
              <span> everyday living.</span>
            </h1>

            <p>
              Shop fresh produce, pantry essentials,
              snacks, beverages and household groceries
              at great prices.
            </p>

          </div>


          <div className="grocery-trust">

            <div className="grocery-trust-item">

              <Truck size={17} />

              <span>
                Fast Delivery
              </span>

            </div>


            <div className="grocery-trust-item">

              <ShieldCheck size={17} />

              <span>
                Quality Products
              </span>

            </div>

          </div>

        </section>


        {/* ================= SEARCH MESSAGE ================= */}

        {searchQuery && (

          <div className="grocery-search-result">

            <SearchX size={18} />

            <div>

              <strong>
                Search results for:
              </strong>

              <span>
                "{searchQuery}"
              </span>

            </div>

          </div>

        )}


        {/* ================= CATEGORY SECTION ================= */}

        <section className="grocery-category-browser">

          <div className="grocery-category-heading">

            <div>

              <span>
                SHOP BY CATEGORY
              </span>

              <h2>
                What do you need today?
              </h2>

            </div>

            <p>
              Explore everyday grocery essentials
            </p>

          </div>


          {/* ALL */}

          <button
            className={`grocery-all-button ${
              selectedCategory === "All"
                ? "active"
                : ""
            }`}
            onClick={() =>
              selectCategory("All")
            }
          >

            <span>
              <ShoppingCart size={16} />
            </span>

            All Groceries

          </button>


          {/* CATEGORY GRID */}

          <div className="grocery-category-grid">

            {categories.map((category) => {

              const Icon = category.icon;

              const isOpen =
                openCategory === category.id;

              return (

                <div
                  key={category.id}
                  className={`grocery-category-box ${category.color} ${
                    isOpen ? "open" : ""
                  }`}
                >

                  <button
                    className="grocery-category-button"
                    onClick={() =>
                      toggleCategory(
                        category.id
                      )
                    }
                  >

                    <span className="grocery-category-icon">
                      <Icon size={20} />
                    </span>

                    <span className="grocery-category-name">

                      {category.name}

                      <small>
                        {category.count}
                      </small>

                    </span>

                    <ChevronDown
                      size={17}
                      className={
                        isOpen
                          ? "rotated"
                          : ""
                      }
                    />

                  </button>


                  {/* SUBCATEGORIES */}

                  {isOpen && (

                    <div className="grocery-subcategory-list">

                      {category.subcategories.map(
                        (subcategory) => (

                          <button
                            key={subcategory}
                            className="grocery-subcategory"
                            onClick={() =>
                              selectCategory(
                                category.name
                              )
                            }
                          >
                            {subcategory}
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


        {/* ================= PRODUCTS ================= */}

        <section className="grocery-shop">

          <div className="grocery-products">

            <div className="grocery-products-toolbar">

              <div>

                <span className="grocery-products-label">

                  {searchQuery
                    ? "SEARCH RESULTS"
                    : "FRESH PICKS"}

                </span>

                <h2>

                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : selectedCategory === "All"
                    ? "Popular Groceries"
                    : selectedCategory}

                </h2>

                <span>
                  {filteredProducts.length}
                  {" "}
                  products
                </span>

              </div>

            </div>


            {/* NO RESULTS */}

            {filteredProducts.length === 0 ? (

              <div className="grocery-no-products">

                <SearchX size={40} />

                <h2>
                  No groceries found
                </h2>

                <p>
                  We couldn't find anything
                  matching
                  <strong>
                    {" "}
                    "{searchQuery}"
                  </strong>.
                </p>

                <Link to="/grocery">
                  View all groceries
                </Link>

              </div>

            ) : (

              <div className="grocery-product-grid">

                {filteredProducts.map(
                  (product) => {

                    const liked =
                      wishlist.includes(
                        product.id
                      );

                    const added =
                      cart.includes(
                        product.id
                      );

                    return (

                      <div
                        className="grocery-product-card"
                        key={product.id}
                      >

                        {/* WISHLIST */}

                        <button
                          className={`grocery-wishlist ${
                            liked
                              ? "liked"
                              : ""
                          }`}
                          onClick={() =>
                            toggleWishlist(
                              product.id
                            )
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


                        {/* PRODUCT IMAGE */}

                        <div className="grocery-product-image">

                          <div className="grocery-product-icon">
                            {product.icon}
                          </div>

                        </div>


                        {/* PRODUCT INFO */}

                        <div className="grocery-product-info">

                          <span className="grocery-product-category">
                            {product.category}
                          </span>

                          <h3>
                            {product.name}
                          </h3>

                          <p>
                            {product.description}
                          </p>


                          {/* RATING */}

                          <div className="grocery-rating">

                            <span>
                              ★
                            </span>

                            {product.rating}

                          </div>


                          {/* PRICE */}

                          <div className="grocery-price-row">

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


                          {/* CART */}

                          <button
                            className={`grocery-add-cart ${
                              added
                                ? "added"
                                : ""
                            }`}
                            onClick={() =>
                              addToCart(
                                product.id
                              )
                            }
                          >

                            {added
                              ? "Added to Cart"
                              : "Add to Cart"}

                            <ShoppingCart
                              size={15}
                            />

                          </button>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>

        </section>


        {/* ================= INFO STRIP ================= */}

        <section className="grocery-info-strip">

          <div>

            <Truck size={22} />

            <div>

              <strong>
                Quick Delivery
              </strong>

              <span>
                Get your groceries delivered
                quickly.
              </span>

            </div>

          </div>


          <div>

            <ShieldCheck size={22} />

            <div>

              <strong>
                Quality Assured
              </strong>

              <span>
                Carefully selected everyday
                essentials.
              </span>

            </div>

          </div>


          <div>

            <RefreshCw size={22} />

            <div>

              <strong>
                Easy Shopping
              </strong>

              <span>
                Compare and shop with confidence.
              </span>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Grocery;