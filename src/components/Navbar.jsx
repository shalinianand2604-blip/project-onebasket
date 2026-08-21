import { Link } from "react-router-dom";

import LocationSelector from "./LocationSelector";

import {
  Heart,
  ShoppingCart,
  User,
  Bot,
  Scale,
  Flame,
} from "lucide-react";

import "./Navbar.css";


function Navbar() {

  return (

    <nav className="navbar">


      {/* =================================================
          LOGO
      ================================================= */}

      <Link
        to="/"
        className="logo"
      >

        <span className="logo-mark">
          O
        </span>

        <span>
          OneBasket
        </span>

      </Link>


      {/* =================================================
          NAVIGATION LINKS
      ================================================= */}

      <div className="nav-links">


        {/* HOME */}

        <Link to="/">
          Home
        </Link>


        {/* MEDICINES */}

        <Link to="/medicines">
          Medicines
        </Link>


        {/* GROCERY */}

        <Link to="/grocery">
          Grocery
        </Link>


        {/* COMPARE */}

        <Link
          to="/compare"
          className="compare-link"
        >

          <Scale size={16} />

          <span>
            Compare
          </span>

        </Link>


        {/* DEALS */}

        <Link
          to="/deals"
          className="deals-link"
        >

          <Flame size={16} />

          <span>
            Deals
          </span>

        </Link>


        {/* =================================================
            ASK ONEBASKET
        ================================================= */}

        <Link
          to="/ask"
          className="ask-onebasket-link"
        >

          <Bot size={17} />

          <span>
            Ask OneBasket
          </span>

        </Link>

      </div>


      {/* =================================================
          RIGHT SIDE ACTIONS
      ================================================= */}

      <div className="nav-actions">


        {/* LOCATION */}

        <LocationSelector />


        {/* WISHLIST */}

        <Link
          to="/wishlist"
          className="icon-btn"
          aria-label="Wishlist"
        >

          <Heart size={20} />

        </Link>


        {/* CART */}

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


        {/* ACCOUNT */}

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