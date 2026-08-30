import { Link } from "react-router-dom";
import {
  Flame,
  ShoppingCart,
  ArrowRight,
  Tag,
  Clock,
  Package,
} from "lucide-react";

import "./Deals.css";


// =========================================================
// FLASH DEALS
// =========================================================

const deals = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    price: 30,
    oldPrice: 42,
    discount: "29% OFF",
    icon: "💊",
  },
  {
    id: 2,
    name: "Dolo 650",
    price: 32,
    oldPrice: 45,
    discount: "29% OFF",
    icon: "💊",
  },
  {
    id: 3,
    name: "Fresh Bananas",
    price: 49,
    oldPrice: 65,
    discount: "25% OFF",
    icon: "🍌",
  },
  {
    id: 4,
    name: "Aashirvaad Atta",
    price: 245,
    oldPrice: 290,
    discount: "16% OFF",
    icon: "🌾",
  },
  {
    id: 5,
    name: "Chocolate Cookies",
    price: 79,
    oldPrice: 99,
    discount: "20% OFF",
    icon: "🍪",
  },
  {
    id: 6,
    name: "Cooking Oil 1L",
    price: 135,
    oldPrice: 160,
    discount: "16% OFF",
    icon: "🫗",
  },
];


// =========================================================
// COMBO OFFERS
// =========================================================

const combos = [
  {
    id: 1,
    name: "Daily Essentials Combo",
    description: "Rice + Atta + Cooking Oil",
    price: 399,
    oldPrice: 470,
    save: "Save ₹71",
    icon: "🛒",
  },
  {
    id: 2,
    name: "Healthy Breakfast Combo",
    description: "Bananas + Milk + Biscuits",
    price: 199,
    oldPrice: 245,
    save: "Save ₹46",
    icon: "🥣",
  },
  {
    id: 3,
    name: "Medicine Care Combo",
    description: "Paracetamol + Dolo + Essentials",
    price: 89,
    oldPrice: 110,
    save: "Save ₹21",
    icon: "💊",
  },
];


// =========================================================
// DEALS PAGE
// =========================================================

function Deals() {
  return (
    <main className="deals-page">

      <div className="deals-container">


        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="deals-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            Deals
          </span>

        </div>


        {/* =================================================
            HERO
        ================================================= */}

        <section className="deals-hero">

          <div className="deals-hero-content">


            {/* SMALL FIRE ICON */}

            <div className="deals-eyebrow">

              <span className="hero-fire-icon">
                <Flame size={18} />
              </span>

              <span>
                HOT DEALS
              </span>

              <span className="eyebrow-dot">
                •
              </span>

              <span>
                SAVE MORE
              </span>

            </div>


            {/* HEADING */}

            <h1>
              Big savings,
              <span>
                {" "}every day.
              </span>
            </h1>


            <p>
              Discover amazing offers on medicines,
              groceries and everyday essentials.
            </p>


            {/* SMALL FLASH DEAL BUTTON */}

            <Link
              to="#flash-deals"
              className="hero-flash-button"
            >

              <Flame size={17} />

              <span>
                Flash Deals
              </span>

              <ArrowRight size={17} />

            </Link>

          </div>

        </section>


        {/* =================================================
            FLASH DEALS
        ================================================= */}

        <section
          className="flash-deals"
          id="flash-deals"
        >


          <div className="section-heading">

            <div>

              <div className="section-label">
                LIMITED TIME
              </div>

              <h2>

                <Flame size={28} />

                Flash Deals

              </h2>

              <p>
                Grab these offers before they're gone.
              </p>

            </div>


            <div className="deal-timer">

              <Clock size={18} />

              <span>
                Deals ending soon
              </span>

            </div>

          </div>


          {/* FLASH DEAL PRODUCTS */}

          <div className="deal-products">

            {deals.map((product) => (

              <div
                className="deal-card"
                key={product.id}
              >


                {/* DISCOUNT */}

                <div className="discount-badge">

                  <Tag size={13} />

                  <span>
                    {product.discount}
                  </span>

                </div>


                {/* PRODUCT ICON */}

                <div className="deal-product-image">

                  {product.icon}

                </div>


                {/* NAME */}

                <h3>
                  {product.name}
                </h3>


                {/* PRICE */}

                <div className="deal-price-row">

                  <strong>
                    ₹{product.price}
                  </strong>

                  <del>
                    ₹{product.oldPrice}
                  </del>

                </div>


                {/* CART */}

                <button
                  type="button"
                  className="deal-cart-btn"
                >

                  <ShoppingCart size={17} />

                  <span>
                    Add to Cart
                  </span>

                </button>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            COMBO OFFERS
        ================================================= */}

        <section className="combo-section">


          <div className="combo-heading">

            <div>

              <div className="section-label">
                SAVE MORE TOGETHER
              </div>

              <h2>

                <Package size={28} />

                Combo Offers

              </h2>

              <p>
                Get more value when you shop our specially
                selected combinations.
              </p>

            </div>

          </div>


          {/* COMBO CARDS */}

          <div className="combo-products">

            {combos.map((combo) => (

              <div
                className="combo-card"
                key={combo.id}
              >

                <div className="combo-icon">
                  {combo.icon}
                </div>


                <div className="combo-content">

                  <span className="combo-badge">
                    COMBO OFFER
                  </span>

                  <h3>
                    {combo.name}
                  </h3>

                  <p>
                    {combo.description}
                  </p>


                  <div className="combo-price">

                    <strong>
                      ₹{combo.price}
                    </strong>

                    <del>
                      ₹{combo.oldPrice}
                    </del>

                  </div>


                  <span className="combo-save">
                    {combo.save}
                  </span>

                </div>


                <button
                  type="button"
                  className="combo-cart-btn"
                >

                  <ShoppingCart size={17} />

                  Add Combo

                </button>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="deals-bottom">

          <div className="deals-bottom-content">

            <div className="bottom-icon">

              <Flame size={22} />

            </div>


            <div>

              <h2>
                Don't miss the next deal!
              </h2>

              <p>
                Check OneBasket regularly for new
                offers and savings.
              </p>

            </div>

          </div>


          <Link
            to="/"
            className="bottom-btn"
          >

            <span>
              Continue Shopping
            </span>

            <ArrowRight size={18} />

          </Link>

        </section>


      </div>

    </main>
  );
}


export default Deals;