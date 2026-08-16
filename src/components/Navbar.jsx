import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Sparkles,
  Camera,
  Bell,
  RefreshCw,
  Bot,
  Scale,
  Flame,
} from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const [smartOpen, setSmartOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* ================= LOGO ================= */}

      <Link to="/" className="logo">
        <span className="logo-mark">O</span>
        <span>OneBasket</span>
      </Link>


      {/* ================= NAVIGATION ================= */}

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/medicines">
          Medicines
        </Link>

        <Link to="/grocery">
          Grocery
        </Link>

        <Link
          to="/compare"
          className="compare-link"
        >
          <Scale size={16} />
          Compare
        </Link>

        <Link
          to="/deals"
          className="deals-link"
        >
          <Flame size={16} />
          Deals
        </Link>


        {/* ================= SMART ================= */}

        <div className="smart-container">

          <button
            type="button"
            className="smart-button"
            onClick={() => setSmartOpen(!smartOpen)}
          >
            <Sparkles size={16} />

            Smart

            <ChevronDown
              size={15}
              className={
                smartOpen
                  ? "smart-arrow-open"
                  : ""
              }
            />
          </button>


          {smartOpen && (

            <div className="smart-menu">

              <div className="smart-title">

                <Sparkles size={17} />

                <div>
                  <strong>
                    Smart OneBasket
                  </strong>

                  <span>
                    Shop smarter & save more
                  </span>
                </div>

              </div>


              <Link
                to="/smart-search"
                className="smart-item"
              >
                <div className="smart-icon purple">
                  <Search size={17} />
                </div>

                <div>
                  <strong>
                    Smart Search
                  </strong>

                  <span>
                    Find products quickly
                  </span>
                </div>
              </Link>


              <Link
                to="/compare"
                className="smart-item"
              >
                <div className="smart-icon burgundy">
                  <Scale size={17} />
                </div>

                <div>
                  <strong>
                    Smart Compare
                  </strong>

                  <span>
                    Find the best price
                  </span>
                </div>
              </Link>


              <Link
                to="/scan"
                className="smart-item"
              >
                <div className="smart-icon yellow">
                  <Camera size={17} />
                </div>

                <div>
                  <strong>
                    Scan Product
                  </strong>

                  <span>
                    Scan a barcode or product
                  </span>
                </div>
              </Link>


              <Link
                to="/price-alert"
                className="smart-item"
              >
                <div className="smart-icon pink">
                  <Bell size={17} />
                </div>

                <div>
                  <strong>
                    Price Alert
                  </strong>

                  <span>
                    Know when prices drop
                  </span>
                </div>
              </Link>


              <Link
                to="/reorder"
                className="smart-item"
              >
                <div className="smart-icon green">
                  <RefreshCw size={17} />
                </div>

                <div>
                  <strong>
                    Smart Reorder
                  </strong>

                  <span>
                    Reorder your essentials
                  </span>
                </div>
              </Link>


              <Link
                to="/ask"
                className="smart-item"
              >
                <div className="smart-icon dark">
                  <Bot size={17} />
                </div>

                <div>
                  <strong>
                    Ask OneBasket
                  </strong>

                  <span>
                    Get shopping assistance
                  </span>
                </div>
              </Link>

            </div>
          )}

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="nav-actions">

        <button
          type="button"
          className="location-btn"
        >
          <MapPin size={17} />

          <span>
            <small>
              Deliver to
            </small>

            Chennai
          </span>

          <ChevronDown size={14} />
        </button>


        {/* Wishlist */}

        <Link
          to="/wishlist"
          className="icon-btn"
          aria-label="Wishlist"
        >
          <Heart size={20} />
        </Link>


        {/* Cart */}

        <Link
          to="/cart"
          className="icon-btn cart-btn"
          aria-label="Cart"
        >
          <ShoppingCart size={20} />

          <span className="cart-count">
            0
          </span>
        </Link>


        {/* Account */}

        <Link
          to="/login"
          className="account-btn"
        >
          <User size={18} />

          <span>
            Account
          </span>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;