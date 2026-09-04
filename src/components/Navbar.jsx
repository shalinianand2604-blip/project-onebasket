// ==========================================================================
// FILE: src/components/Navbar.jsx
// COMPONENT: Navbar (Hyperlocal Navigation with Dual Role Switching)
// ==========================================================================

import React from "react";
import { Link, useLocation } from "react-router-dom";
import LocationSelector from "./LocationSelector";
import logo from "../assets/onebasket-logo.png";
import {
  Heart,
  ShoppingCart,
  User,
  Bot,
  Scale,
  Flame,
  Store,
  Navigation,
  Compass,
  Repeat,
} from "lucide-react";
import { useCart } from "../pages/CartContext";
import { useUser } from "../pages/UserContext";
import "./Navbar.css";

export default function Navbar() {
  const { cartCount } = useCart();
  const { activeRole, switchRole, user, vendorProfile } = useUser();
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  const handleToggleRole = () => {
    switchRole(activeRole === "customer" ? "vendor" : "customer");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="logo">
        <img src={logo} alt="OneBasket Logo" className="logo-img" />
        <span className="logo-text">OneBasket</span>
      </Link>

      {/* NAVIGATION LINKS */}
      <div className="nav-links">
        <Link to="/" className={`nav-link-item ${isCurrent("/") ? "active" : ""}`}>
          Home
        </Link>

        <Link
          to="/medicines"
          className={`nav-link-item ${isCurrent("/medicines") ? "active" : ""}`}
        >
          Medicines
        </Link>

        <Link
          to="/grocery"
          className={`nav-link-item ${isCurrent("/grocery") ? "active" : ""}`}
        >
          Grocery
        </Link>

        <Link
          to="/compare"
          className={`nav-link-item compare-link ${isCurrent("/compare") ? "active" : ""}`}
        >
          <Scale size={15} />
          <span>Compare</span>
        </Link>

        <Link
          to="/bidding"
          className={`nav-link-item bidding-link ${isCurrent("/bidding") ? "active" : ""}`}
        >
          <Flame size={15} />
          <span>Urgent Bids</span>
        </Link>

        <Link
          to="/tracking"
          className={`nav-link-item tracking-link ${isCurrent("/tracking") ? "active" : ""}`}
        >
          <Navigation size={14} />
          <span>Track Order</span>
        </Link>

        {activeRole === "vendor" && (
          <Link
            to="/vendor-dashboard"
            className={`nav-link-item vendor-link ${isCurrent("/vendor-dashboard") ? "active" : ""}`}
          >
            <Store size={15} />
            <span>Store Dashboard</span>
          </Link>
        )}

        <Link
          to="/ask"
          className={`nav-link-item ask-onebasket-link ${isCurrent("/ask") ? "active" : ""}`}
        >
          <Bot size={16} />
          <span>Ask Assistant</span>
        </Link>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="nav-actions">
        {/* ROLE SWITCHER PILL */}
        <button
          type="button"
          className={`role-switcher-toggle ${activeRole}`}
          onClick={handleToggleRole}
          title="Click to switch role between Customer and Local Vendor"
        >
          <span className="role-icon">
            {activeRole === "customer" ? <User size={13} /> : <Store size={13} />}
          </span>
          <span className="role-text">
            {activeRole === "customer" ? "Customer" : "Store Owner"}
          </span>
          <Repeat size={11} className="role-switch-icon" />
        </button>

        <LocationSelector />

        {/* WISHLIST */}
        <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
          <Heart size={19} />
        </Link>

        {/* SMART CART */}
        <Link to="/cart" className="icon-btn cart-btn" aria-label="Smart Cart">
          <ShoppingCart size={19} />
          <span className="cart-count">{cartCount || 0}</span>
        </Link>

        {/* ACCOUNT / AUTH */}
        <Link to="/account" className="account-btn">
          <User size={17} />
          <span className="account-name-text">
            {activeRole === "vendor" ? "Store Portal" : user?.name ? user.name.split(" ")[0] : "Account"}
          </span>
        </Link>
      </div>
    </nav>
  );
}