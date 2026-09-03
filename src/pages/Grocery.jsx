import { useState, useEffect, useRef } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

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

import { useWishlist } from "./WishListContext";
import { useCart } from "./CartContext";
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

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Fresh Red Apples",
    category: "Fruits & Vegetables",
    subcategory: "Fresh Fruits",
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
    subcategory: "Milk",
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
    subcategory: "Rice",
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
    subcategory: "Cooking Oils",
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
    subcategory: "Masala Mixes",
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
    subcategory: "Cookies",
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
    subcategory: "Tea",
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
    subcategory: "Noodles & Pasta",
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
    subcategory: "Fresh Fruits",
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
    subcategory: "Butter & Cheese",
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
    subcategory: "Chips",
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
    subcategory: "Coffee",
    description: "Rich and aromatic coffee",
    price: 199,
    mrp: 230,
    discount: "13% OFF",
    rating: 4.8,
    icon: "☕",
  },
];

/* =========================================================
   GROCERY
========================================================= */

function Grocery() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /* =========================================================
     CONTEXT
  ========================================================= */

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const {
    cart,
    addToCart,
  } = useCart();

  /* =========================================================
     SEARCH
  ========================================================= */

  const search =
    searchParams.get("search") || "";

  /* =========================================================
     REF
  ========================================================= */

  const productsSectionRef =
    useRef(null);

  /* =========================================================
     STATE
  ========================================================= */

  const [openCategory, setOpenCategory] =
    useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedSubcategory, setSelectedSubcategory] =
    useState(null);

  /* =========================================================
     FIND SELECTED CATEGORY
  ========================================================= */

  useEffect(() => {
    if (!search.trim() || search === "__ALL__") {
      setSelectedCategory("All");
      setSelectedSubcategory(null);
      return;
    }

    const query =
      search.toLowerCase().trim();

    const matchingCategory =
      categories.find((category) => {
        return (
          category.name
            .toLowerCase() === query ||
          category.subcategories.some(
            (subcategory) =>
              subcategory.toLowerCase() ===
              query
          )
        );
      });

    if (matchingCategory) {
      setSelectedCategory(
        matchingCategory.name
      );

      const matchingSubcategory =
        matchingCategory.subcategories.find(
          (subcategory) =>
            subcategory.toLowerCase() ===
            query
        );

      setSelectedSubcategory(
        matchingSubcategory || null
      );
    }
  }, [search]);

  /* =========================================================
     SCROLL RESULTS TO TOP
  ========================================================= */

  useEffect(() => {
    if (!search.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      const section =
        productsSectionRef.current;

      if (!section) {
        return;
      }

      const sectionTop =
        section.getBoundingClientRect().top +
        window.scrollY;

      const navbarHeight = 90;

      window.scrollTo({
        top: Math.max(
          0,
          sectionTop - navbarHeight
        ),
        left: 0,
        behavior: "smooth",
      });
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /* =========================================================
     CATEGORY CLICK
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
    categoryName,
    subcategory
  ) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(subcategory);
    setOpenCategory(null);

    navigate(
      `/grocery?search=${encodeURIComponent(
        subcategory
      )}`
    );
  };

  /* =========================================================
     ALL GROCERIES
  ========================================================= */

  const handleAllGroceries = () => {
    setSelectedCategory("All");
    setSelectedSubcategory(null);
    setOpenCategory(null);

    navigate(
      "/grocery?search=__ALL__"
    );
  };

  /* =========================================================
     FILTER RESULTS
  ========================================================= */

  const results =
    search === "__ALL__"
      ? products
      : products.filter((product) => {
          if (!search.trim()) {
            return false;
          }

          const query =
            search.toLowerCase().trim();

          return (
            product.subcategory
              .toLowerCase()
              .includes(query) ||
            product.category
              .toLowerCase()
              .includes(query) ||
            product.name
              .toLowerCase()
              .includes(query) ||
            product.description
              .toLowerCase()
              .includes(query)
          );
        });

  /* =========================================================
     PRODUCT DISPLAY
  ========================================================= */

  const showProducts =
    search.trim() !== "";

  const productTitle =
    search === "__ALL__"
      ? "All Groceries"
      : search;

  /* =========================================================
     CART CHECK
  ========================================================= */

  const isProductInCart = (productId) => {
    return cart.some(
      (item) =>
        String(item.id) ===
        String(productId)
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="grocery-page">

      <div className="grocery-container">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="grocery-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            Grocery
          </span>

        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="grocery-header">

          <div>

            <div className="grocery-label">

              <ShoppingCart size={14} />

              FRESH • EVERYDAY • ESSENTIALS

            </div>

            <h1>
              Groceries for

              <span>
                {" "}everyday living.
              </span>
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

        {/* =================================================
            PRODUCTS / RESULTS
            Hidden on initial page
        ================================================= */}

        {showProducts && (

          <section
            ref={productsSectionRef}
            id="grocery-products"
            className="grocery-shop"
          >

            <div className="grocery-products">

              {/* PRODUCT HEADER */}

              <div className="grocery-products-toolbar">

                <div>

                  <span className="grocery-products-label">
                    GROCERY RESULTS
                  </span>

                  <h2>
                    {productTitle}
                  </h2>

                  <span>
                    {results.length} products
                  </span>

                </div>

              </div>

              {/* =================================================
                  NO RESULTS
              ================================================= */}

              {results.length === 0 ? (

                <div className="grocery-no-products">

                  <SearchX size={40} />

                  <h2>
                    No groceries found
                  </h2>

                  <p>
                    No products are currently
                    available in this category.
                  </p>

                  <button
                    type="button"
                    className="grocery-all-button"
                    onClick={() =>
                      navigate("/grocery")
                    }
                  >
                    Back to Categories
                  </button>

                </div>

              ) : (

                /* =================================================
                   PRODUCT GRID
                ================================================= */

                <div className="grocery-product-grid">

                  {results.map((product) => {

                    const liked =
                      isWishlisted(
                        product.id
                      );

                    const added =
                      isProductInCart(
                        product.id
                      );

                    return (

                      <div
                        className="grocery-product-card"
                        key={product.id}
                      >

                        {/* =================================================
                            WISHLIST
                        ================================================= */}

                        <button
                          type="button"
                          className={`grocery-wishlist ${
                            liked
                              ? "liked"
                              : ""
                          }`}
                          onClick={() =>
                            toggleWishlist(
                              product
                            )
                          }
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
                            IMAGE
                        ================================================= */}

                        <div className="grocery-product-image">

                          <div className="grocery-product-icon">
                            {product.icon}
                          </div>

                        </div>

                        {/* =================================================
                            PRODUCT INFO
                        ================================================= */}

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
                            type="button"
                            className={`grocery-add-cart ${
                              added
                                ? "added"
                                : ""
                            }`}
                            onClick={() =>
                              addToCart(product)
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
                  })}

                </div>

              )}

            </div>

          </section>

        )}

        {/* =================================================
            CATEGORY BROWSER
        ================================================= */}

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

          {/* ALL GROCERIES */}

          <button
            type="button"
            className={`grocery-all-button ${
              search === "__ALL__"
                ? "active"
                : ""
            }`}
            onClick={
              handleAllGroceries
            }
          >

            <span className="grocery-all-icon">
              <ShoppingCart size={16} />
            </span>

            All Groceries

          </button>

          {/* CATEGORY GRID */}

          <div className="grocery-category-grid">

            {categories.map((category) => {

              const Icon =
                category.icon;

              const isOpen =
                openCategory ===
                category.name;

              const isSelected =
                selectedCategory ===
                category.name;

              return (

                <div
                  key={category.id}
                  className={`grocery-category-box ${
                    category.color
                  } ${
                    isOpen
                      ? "open"
                      : ""
                  } ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                >

                  {/* CATEGORY BUTTON */}

                  <button
                    type="button"
                    className="grocery-category-button"
                    onClick={() =>
                      handleCategoryClick(
                        category.name
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
                            type="button"
                            className={`grocery-subcategory ${
                              selectedSubcategory ===
                              subcategory
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubcategoryClick(
                                category.name,
                                subcategory
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

        {/* =================================================
            INFO STRIP
        ================================================= */}

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