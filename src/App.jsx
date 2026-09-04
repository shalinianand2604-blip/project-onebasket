// ==========================================================================
// FILE: src/App.jsx
// COMPONENT: App (Root Router & Application Provider Composition)
// ==========================================================================

import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Grocery from "./pages/Grocery";
import SmartCart from "./pages/SmartCart";
import Compare from "./pages/Compare";
import Bidding from "./pages/Bidding";
import OrderTracking from "./pages/OrderTracking";
import VendorDashboard from "./pages/VendorDashboard";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Deals from "./pages/Deals";
import AskOneBasket from "./pages/AskOneBasket";
import Account from "./pages/Account";
import Scan from "./pages/Scan";
import Wishlist from "./pages/WishList";

import { WishlistProvider } from "./pages/WishListContext";
import { CartProvider } from "./pages/CartContext";
import { UserProvider } from "./pages/UserContext";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />

          <Navbar />

          <Routes>
            {/* 1. HOME */}
            <Route path="/" element={<Home />} />

            {/* 2. MEDICINES DISCOVERY */}
            <Route path="/medicines" element={<Medicines />} />

            {/* 3. GROCERY DISCOVERY */}
            <Route path="/grocery" element={<Grocery />} />

            {/* 4. CORE FEATURE #4: SMART CART & MULTI-VENDOR SPLIT */}
            <Route path="/cart" element={<SmartCart />} />
            <Route path="/smart-cart" element={<SmartCart />} />

            {/* 5. CORE FEATURE #2: LIVE PRICE COMPARISON & GENERIC FINDER */}
            <Route path="/compare" element={<Compare />} />

            {/* 6. CORE FEATURE #3: REVERSE MARKETPLACE BIDDING */}
            <Route path="/bidding" element={<Bidding />} />

            {/* 7. CORE FEATURE #5: MULTI-STEP ORDER TRACKING */}
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/order-tracking" element={<OrderTracking />} />

            {/* 8. CORE FEATURE #6: VENDOR DASHBOARD & INVENTORY */}
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />

            {/* 9. CORE FEATURE #1: AUTHENTICATION (CUSTOMER & VENDOR) */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            {/* 10. CHECKOUT */}
            <Route path="/checkout" element={<Checkout />} />

            {/* 11. DEALS */}
            <Route path="/deals" element={<Deals />} />

            {/* 12. ASK ONEBASKET ASSISTANT */}
            <Route path="/ask" element={<AskOneBasket />} />

            {/* 13. SCAN MEDICINES / QR */}
            <Route path="/scan" element={<Scan />} />

            {/* 14. WISHLIST */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* 15. ACCOUNT */}
            <Route path="/account" element={<Account />} />
          </Routes>

          <Footer />
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;