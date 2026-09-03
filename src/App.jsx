import { Routes, Route } from "react-router-dom";

import Scan from "./pages/Scan";
import Wishlist from "./pages/WishList";
import Cart from "./pages/Cart";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Grocery from "./pages/Grocery";
import AskOneBasket from "./pages/AskOneBasket";
import Account from "./pages/Account";

import { WishlistProvider } from "./pages/WishListContext";
import { CartProvider } from "./pages/CartContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollToTop />

        <Navbar />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* SMART SCAN */}
          <Route
            path="/scan"
            element={<Scan />}
          />

          {/* MEDICINES */}
          <Route
            path="/medicines"
            element={<Medicines />}
          />

          {/* GROCERY */}
          <Route
            path="/grocery"
            element={<Grocery />}
          />

          {/* ASK ONEBASKET */}
          <Route
            path="/ask"
            element={<AskOneBasket />}
          />

          {/* WISHLIST */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* COMPARE */}
          <Route
            path="/compare"
            element={
              <div style={{ padding: "100px" }}>
                <h1>Compare Coming Soon ⚖️</h1>
              </div>
            }
          />

          {/* DEALS */}
          <Route
            path="/deals"
            element={
              <div style={{ padding: "100px" }}>
                <h1>Deals Coming Soon 🔥</h1>
              </div>
            }
          />

          {/* ACCOUNT */}
          <Route
            path="/account"
            element={<Account />}
          />
        </Routes>

        <Footer />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;