import { Link } from "react-router-dom";

import LocationSelector from "./LocationSelector";
import logo from "../assets/onebasket-logo.png";

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
      <Link to="/" className="logo">
  <img src={logo} alt="OneBasket Logo" className="logo-img" />
  <span className="logo-text">OneBasket</span>
</Link>

      {/* =================================================
          NAVIGATION LINKS
      ================================================= */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/medicines">Medicines</Link>
        <Link to="/grocery">Grocery</Link>

        <Link to="/compare" className="compare-link">
          <Scale size={16} />
          <span>Compare</span>
        </Link>

        <Link to="/deals" className="deals-link">
          <Flame size={16} />
          <span>Deals</span>
        </Link>

        <Link to="/ask" className="ask-onebasket-link">
          <Bot size={17} />
          <span>Ask OneBasket</span>
        </Link>
      </div>

      {/* =================================================
          RIGHT SIDE ACTIONS
      ================================================= */}
      <div className="nav-actions">
        <LocationSelector />

        <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
          <Heart size={20} />
        </Link>

        <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
          <ShoppingCart size={20} />
          <span className="cart-count">0</span>
        </Link>

        <Link to="/login" className="account-btn">
          <User size={18} />
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
