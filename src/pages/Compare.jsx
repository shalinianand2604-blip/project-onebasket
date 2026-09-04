// ==========================================================================
// FILE: src/pages/Compare.jsx
// COMPONENT: Compare (Live Hyperlocal Price Comparison & Generic Substitutes)
// ==========================================================================

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Search,
  Store,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  ShoppingCart,
  ArrowRight,
  Filter,
  Sparkles,
  ExternalLink,
  Plus,
} from "lucide-react";
import { PRODUCTS } from "../data/productsData";
import { VENDORS } from "../data/vendorsData";
import { useCart } from "./CartContext";
import "./Compare.css";

/*
  AI Image Prompt (Compare Page Header):
  "Clean high-key tabletop photo comparing a branded pharmaceutical blister pack next to a certified generic Jan Aushadhi medicine box, showing identical active chemical formula stamps with a green checkmark, bright clinical daylight."
*/

export default function Compare() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxDistanceKm, setMaxDistanceKm] = useState(3.0);
  const [addedItemKey, setAddedItemKey] = useState(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.genericName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "medicine" && product.type === "medicine") ||
        (selectedCategory === "grocery" && product.type === "grocery");

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCartFromVendor = (product, vendorId, price, isGeneric = false) => {
    const vendor = VENDORS.find((v) => v.id === vendorId);
    addToCart({
      id: isGeneric ? product.genericAlternative.id : product.id,
      name: isGeneric ? product.genericAlternative.name : product.name,
      price: price,
      mrp: product.mrp,
      type: product.type,
      category: product.category,
      icon: product.type === "medicine" ? "💊" : "🌾",
      vendorId: vendorId,
      store: vendor?.name || "Local Store",
      unit: product.unit,
      genericName: product.genericName,
      isGeneric: isGeneric,
    });

    const key = `${product.id}-${vendorId}-${isGeneric}`;
    setAddedItemKey(key);
    setTimeout(() => setAddedItemKey(null), 1800);
  };

  return (
    <div className="compare-page">
      <div className="compare-wrapper">
        {/* HERO / HEADER */}
        <header className="compare-header">
          <div className="compare-badge">
            <Scale size={16} />
            <span>Hyperlocal Price Transparency Engine</span>
          </div>
          <h1 className="compare-title">Live Nearby Price Comparison & Generic Finder</h1>
          <p className="compare-subtitle">
            Compare real-time prices across verified neighborhood pharmacies and grocery marts. Discover
            bio-equivalent generic medicines to save up to 80% on prescriptions.
          </p>
        </header>

        {/* CONTROLS BAR: SEARCH, CATEGORY TABS, DISTANCE SLIDER */}
        <section className="compare-controls-card">
          <div className="controls-row-top">
            {/* SEARCH */}
            <div className="compare-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search medicine by name or salt (e.g. Paracetamol, Augmentin, Atta)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="category-pills-group">
              <button
                type="button"
                className={`category-pill ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All Products
              </button>
              <button
                type="button"
                className={`category-pill ${selectedCategory === "medicine" ? "active" : ""}`}
                onClick={() => setSelectedCategory("medicine")}
              >
                💊 Medicines & Generic Salts
              </button>
              <button
                type="button"
                className={`category-pill ${selectedCategory === "grocery" ? "active" : ""}`}
                onClick={() => setSelectedCategory("grocery")}
              >
                🥦 Grocery & Staples
              </button>
            </div>
          </div>

          <div className="controls-row-bottom">
            <div className="distance-slider-wrap">
              <label htmlFor="radius-slider" className="distance-slider-label">
                <MapPin size={14} />
                <span>Hyperlocal Search Radius: <strong>{maxDistanceKm} km</strong></span>
              </label>
              <input
                id="radius-slider"
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(parseFloat(e.target.value))}
                className="distance-slider"
              />
            </div>
            <div className="stores-count-indicator">
              Comparing <strong>{VENDORS.filter((v) => v.distanceKm <= maxDistanceKm).length}</strong> stores
              within {maxDistanceKm} km
            </div>
          </div>
        </section>

        {/* COMPARISON RESULTS MATRIX */}
        <main className="compare-results-section">
          {filteredProducts.length === 0 ? (
            <div className="no-results-card">
              <Scale size={38} className="no-results-icon" />
              <h3>No matching medicines or grocery items found</h3>
              <p>Try searching for active salts like 'Paracetamol' or staples like 'Atta'</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-compare-grid">
              {filteredProducts.map((product) => {
                // Find vendor prices for stores within max distance
                const activeStores = VENDORS.filter(
                  (v) =>
                    v.distanceKm <= maxDistanceKm &&
                    product.vendorPrices &&
                    product.vendorPrices[v.id] !== undefined
                );

                // Find lowest price
                const prices = activeStores.map((v) => product.vendorPrices[v.id]);
                const lowestPrice = prices.length > 0 ? Math.min(...prices) : product.price;

                return (
                  <article key={product.id} className="product-compare-card">
                    {/* CARD HEADER */}
                    <div className="compare-card-header">
                      <div className="product-identity">
                        <div className="product-badge-row">
                          <span className="badge-type">{product.type}</span>
                          <span className="badge-category">{product.category}</span>
                          {product.requiresPrescription && (
                            <span className="badge-rx">Rx Required</span>
                          )}
                        </div>
                        <h2 className="product-title">{product.name}</h2>
                        {product.genericName && (
                          <div className="generic-salt-formula">
                            <span className="salt-label">Active Salt:</span>
                            <span className="salt-value">{product.genericName}</span>
                          </div>
                        )}
                        <span className="product-unit-info">{product.unit} • Brand: {product.brand}</span>
                      </div>
                      <div className="mrp-reference-tag">
                        <small>Standard MRP</small>
                        <strong>₹{product.mrp}</strong>
                      </div>
                    </div>

                    {/* GENERIC ALTERNATIVE CALLOUT (If Medicine) */}
                    {product.genericAlternative && (
                      <div className="generic-substitute-box">
                        <div className="generic-substitute-header">
                          <div className="substitute-icon">
                            <Sparkles size={16} />
                          </div>
                          <div>
                            <span className="substitute-badge">Govt. Verified Jan Aushadhi Equivalent</span>
                            <h4 className="substitute-name">{product.genericAlternative.name}</h4>
                            <p className="substitute-composition">
                              Composition: {product.genericAlternative.activeComposition}
                            </p>
                          </div>
                        </div>

                        <div className="substitute-footer-row">
                          <div className="substitute-pricing">
                            <span className="substitute-price">₹{product.genericAlternative.price}</span>
                            <span className="substitute-mrp">MRP ₹{product.genericAlternative.mrp}</span>
                            <span className="substitute-savings-pill">
                              <TrendingDown size={13} />
                              Save ₹{product.genericAlternative.savingsAmount} ({product.genericAlternative.savingsPercent}%)
                            </span>
                          </div>

                          <button
                            type="button"
                            className="btn-add-generic"
                            onClick={() =>
                              handleAddToCartFromVendor(
                                product,
                                product.genericAlternative.vendorId,
                                product.genericAlternative.price,
                                true
                              )
                            }
                          >
                            {addedItemKey === `${product.id}-${product.genericAlternative.vendorId}-true` ? (
                              <>
                                <CheckCircle2 size={14} />
                                Added Generic!
                              </>
                            ) : (
                              <>
                                <Plus size={14} />
                                Add Generic (₹{product.genericAlternative.price})
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* LIVE LOCAL STORE PRICE COMPARISON LIST */}
                    <div className="stores-price-list">
                      <h4 className="store-list-title">Live Store Prices ({activeStores.length} nearby)</h4>
                      <div className="store-price-table">
                        {activeStores.map((vendor) => {
                          const price = product.vendorPrices[vendor.id];
                          const isBestPrice = price === lowestPrice;
                          const key = `${product.id}-${vendor.id}-false`;
                          const isAdded = addedItemKey === key;

                          return (
                            <div
                              key={vendor.id}
                              className={`store-price-row ${isBestPrice ? "best-price-row" : ""}`}
                            >
                              <div className="store-meta-col">
                                <div className="store-name-line">
                                  <Store size={14} className="store-icon" />
                                  <strong className="store-name">{vendor.name}</strong>
                                  {isBestPrice && (
                                    <span className="best-price-tag">Lowest Price</span>
                                  )}
                                </div>
                                <div className="store-submeta">
                                  <span>{vendor.distanceKm} km away</span>
                                  <span>•</span>
                                  <span>~{vendor.avgPrepMinutes} min prep</span>
                                  <span>•</span>
                                  <span>Delivery ₹{vendor.deliveryFee}</span>
                                </div>
                              </div>

                              <div className="store-action-col">
                                <div className="store-price-display">
                                  <strong className="store-current-price">₹{price}</strong>
                                  <small className="store-savings-calc">
                                    ₹{product.mrp - price} off MRP
                                  </small>
                                </div>

                                <button
                                  type="button"
                                  className={`btn-store-cart ${isBestPrice ? "btn-best-cart" : ""}`}
                                  onClick={() =>
                                    handleAddToCartFromVendor(product, vendor.id, price, false)
                                  }
                                >
                                  {isAdded ? (
                                    <CheckCircle2 size={14} />
                                  ) : (
                                    <Plus size={14} />
                                  )}
                                  {isAdded ? "Added" : "Select Store"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        {/* BOTTOM CALL TO ACTION FOR CART */}
        <footer className="compare-bottom-banner">
          <div className="bottom-banner-content">
            <ShoppingCart size={24} className="cart-footer-icon" />
            <div>
              <h3>Ready to optimize your basket?</h3>
              <p>Items selected from different stores will be automatically organized into your Smart Split Cart.</p>
            </div>
          </div>
          <Link to="/cart" className="btn-view-cart">
            Go to Smart Cart
            <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </div>
  );
}
