import { Link } from "react-router-dom";

import {
  Heart,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* =========================
          MAIN FOOTER
      ========================= */}

      <div className="footer-main">

        {/* BRAND */}

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">
              O
            </span>

            <span>OneBasket</span>
          </Link>

          <p className="footer-description">
            Everything you need in one basket.
            Compare prices, shop smarter and
            save more on medicines and groceries.
          </p>

          <div className="footer-tagline">
            <Heart size={15} />

            <span>
              Smart shopping • Better savings
            </span>
          </div>

        </div>


        {/* =========================
            EXPLORE
        ========================= */}

        <div className="footer-column">

          <h3>Explore</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/medicines">
            Medicines
          </Link>

          <Link to="/grocery">
            Grocery
          </Link>

          <Link to="/compare">
            Compare Prices
          </Link>

          <Link to="/deals">
            Deals
          </Link>

        </div>


        {/* =========================
            SMART SHOPPING
        ========================= */}

        <div className="footer-column">

          <h3>Smart Shopping</h3>

          <Link to="/smart-search">
            Smart Search
          </Link>

          <Link to="/compare">
            Smart Compare
          </Link>

          <Link to="/scan">
            Scan Product
          </Link>

          <Link to="/price-alert">
            Price Alerts
          </Link>

          <Link to="/reorder">
            Smart Reorder
          </Link>

        </div>


        {/* =========================
            SUPPORT
        ========================= */}

        <div className="footer-column">

          <h3>Support</h3>

          <Link to="/help">
            Help Center
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/faq">
            FAQs
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>


        {/* =========================
            CONTACT
        ========================= */}

        <div className="footer-contact">

          <h3>Get in touch</h3>

          <div className="contact-item">

            <MapPin size={17} />

            <span>
              Chennai, Tamil Nadu
            </span>

          </div>


          <div className="contact-item">

            <Mail size={17} />

            <span>
              hello@onebasket.com
            </span>

          </div>


          <div className="contact-item">

            <Phone size={17} />

            <span>
              +91 98765 43210
            </span>

          </div>


          {/* SOCIAL LINKS */}

          <div className="social-links">

            <a
              href="#"
              aria-label="Instagram"
            >
              ◎
            </a>

            <a
              href="#"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              𝕏
            </a>

          </div>

        </div>

      </div>


      {/* =========================
          HIGHLIGHT
      ========================= */}

      <div className="footer-highlight">

        <div>

          <strong>
            Compare better.
          </strong>

          <span>
            Choose smarter. Save more.
          </span>

        </div>

        <Link to="/compare">

          Start Comparing

          <ArrowUpRight size={17} />

        </Link>

      </div>


      {/* =========================
          BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © 2026 OneBasket. All rights reserved.
        </p>


        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy
          </Link>

          <Link to="/terms">
            Terms
          </Link>

          <Link to="/help">
            Help
          </Link>

        </div>


        <p className="footer-made">
          Made with 🤍 in India
        </p>

      </div>

    </footer>
  );
}

export default Footer;