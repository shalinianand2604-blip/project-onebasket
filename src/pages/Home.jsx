import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";

import "./Home.css";


function Home() {

  return (

    <div className="home">


      {/* =================================================
          SEARCH BAR
          HOME PAGE ONLY
      ================================================= */}

      <div className="home-search">

        <SearchBar
          placeholder="Search medicines, groceries & more..."
        />

      </div>


      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">


        <motion.div
          className="hero-content"

          initial={{
            opacity: 0,
            x: -50
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 0.8
          }}
        >

          <p className="hero-tag">
            SMART SHOPPING • BETTER SAVINGS
          </p>


          <h1>

            Compare.

            <span>
              Choose.
            </span>

            <br />

            Save.

          </h1>


          <p className="hero-description">

            Compare prices of medicines and
            groceries from multiple stores and
            find the best deal in one place.

          </p>


          <div className="hero-buttons">

            <Link
              to="/compare"
              className="primary-btn"
            >
              Compare Prices
            </Link>


            <Link
              to="/medicines"
              className="secondary-btn"
            >
              Explore Medicines
            </Link>

          </div>

        </motion.div>


        {/* HERO CARD */}

        <motion.div
          className="hero-card"

          initial={{
            opacity: 0,
            scale: 0.8
          }}

          animate={{
            opacity: 1,
            scale: 1
          }}

          transition={{
            duration: 0.8
          }}
        >

          <div className="floating-card">

            <span>💊</span>

            <div>

              <strong>
                Medicine
              </strong>

              <p>
                Best Price Found
              </p>

            </div>

            <b>
              ₹89
            </b>

          </div>


          <div className="floating-card">

            <span>🛒</span>

            <div>

              <strong>
                Grocery
              </strong>

              <p>
                Best Price Found
              </p>

            </div>

            <b>
              ₹149
            </b>

          </div>

        </motion.div>

      </section>


      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="categories">

        <div className="section-heading">

          <p>
            EXPLORE
          </p>

          <h2>
            What are you looking for?
          </h2>

        </div>


        <div className="category-container">


          <motion.div
            className="category-card medicine"
            whileHover={{ y: -8 }}
          >

            <div className="category-icon">
              💊
            </div>

            <h3>
              Medicines
            </h3>

            <p>
              Compare medicine prices and
              find the best available deal.
            </p>

            <Link to="/medicines">
              Explore →
            </Link>

          </motion.div>


          <motion.div
            className="category-card grocery"
            whileHover={{ y: -8 }}
          >

            <div className="category-icon">
              🛒
            </div>

            <h3>
              Groceries
            </h3>

            <p>
              Find everyday groceries at
              the best prices near you.
            </p>

            <Link to="/grocery">
              Explore →
            </Link>

          </motion.div>


        </div>

      </section>

    </div>
  );
}

export default Home;