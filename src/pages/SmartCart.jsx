// ==========================================================================
// FILE: src/pages/SmartCart.jsx
// COMPONENT: SmartCart (Hyperlocal Multi-Vendor Split Optimization & Razorpay)
// ==========================================================================

import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Sparkles,
  Store,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Zap,
  CreditCard,
  Building2,
  RefreshCw,
  Info,
  Check,
} from "lucide-react";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import { VENDORS } from "../data/vendorsData";
import { PRODUCTS } from "../data/productsData";
import "./SmartCart.css";

/*
  AI Image Prompt (Smart Cart Hero / Trust Visual):
  "Clinical close-up photo of a tamper-proof pharmaceutical package sealed with a green certified quality hologram sticker, sitting beside fresh organic groceries in an eco-friendly bag, studio lighting, crisp light background."
*/

export default function SmartCart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, addToCart, clearCart } = useCart();
  const { addOrder } = useUser();

  // Mode: "split" (Smart Split Basket) vs "single" (Single Store Consolidation)
  const [optimizationMode, setOptimizationMode] = useState("split");
  const [isCalculating, setIsCalculating] = useState(false);

  // Razorpay Checkout Modal State
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Coupon / Promo State
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Handle Mode Switch with Smooth Shimmer Delay
  const handleModeSwitch = (mode) => {
    if (mode === optimizationMode) return;
    setIsCalculating(true);
    setOptimizationMode(mode);
    setTimeout(() => {
      setIsCalculating(false);
    }, 350);
  };

  // Quick helper to populate sample basket for instant demonstration
  const handleLoadSampleBasket = () => {
    const medSample = PRODUCTS.find((p) => p.id === "med-01");
    const grocSample = PRODUCTS.find((p) => p.id === "groc-01");
    if (medSample) addToCart({ ...medSample, quantity: 1 });
    if (grocSample) addToCart({ ...grocSample, quantity: 1 });
  };

  // --------------------------------------------------------------------------
  // GENERIC DRUG SUBSTITUTION DISCOVERY
  // --------------------------------------------------------------------------
  const genericOpportunities = useMemo(() => {
    return cart
      .map((item) => {
        const fullProduct = PRODUCTS.find((p) => p.id === item.id);
        if (fullProduct && fullProduct.genericAlternative) {
          return {
            originalItem: item,
            generic: fullProduct.genericAlternative,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [cart]);

  // One-Click Switch to Generic Equivalent
  const handleSwitchToGeneric = (originalItem, generic) => {
    setIsCalculating(true);
    removeFromCart(originalItem.id);
    addToCart({
      id: generic.id,
      name: generic.name,
      price: generic.price,
      mrp: generic.mrp,
      type: "medicine",
      category: "Generic Prescription",
      icon: "💊",
      vendorId: generic.vendorId,
      store: generic.vendorName,
      unit: originalItem.unit || "Strip of 10 tablets",
      isGeneric: true,
      quantity: originalItem.quantity || 1,
    });
    setTimeout(() => {
      setIsCalculating(false);
    }, 400);
  };

  // --------------------------------------------------------------------------
  // MULTI-VENDOR SPLIT OPTIMIZATION ENGINE
  // --------------------------------------------------------------------------
  const splitEngine = useMemo(() => {
    if (cart.length === 0) {
      return { packages: [], splitSubtotal: 0, splitDelivery: 0, splitTotal: 0, singleStoreTotal: 0, totalSavings: 0 };
    }

    const vendorMap = {};

    cart.forEach((item) => {
      let vendorId = item.vendorId;
      if (!vendorId) {
        if (item.type === "medicine" || item.category?.toLowerCase().includes("med")) {
          vendorId = item.isGeneric ? "v-med-01" : "v-med-03";
        } else {
          vendorId = "v-groc-02";
        }
      }

      const vendor = VENDORS.find((v) => v.id === vendorId) || VENDORS[0];

      if (!vendorMap[vendor.id]) {
        vendorMap[vendor.id] = {
          vendor,
          items: [],
          subtotal: 0,
          deliveryFee: vendor.deliveryFee,
        };
      }

      const itemTotal = Number(item.price || 0) * Number(item.quantity || 1);
      vendorMap[vendor.id].items.push(item);
      vendorMap[vendor.id].subtotal += itemTotal;
    });

    const packages = Object.values(vendorMap).map((pkg) => {
      const freeDeliveryTarget = pkg.vendor.minOrderFreeDelivery || 300;
      const isFreeDelivery = pkg.subtotal >= freeDeliveryTarget;
      const amountNeededForFreeDelivery = Math.max(0, freeDeliveryTarget - pkg.subtotal);
      const activeDeliveryFee = isFreeDelivery ? 0 : pkg.deliveryFee;

      return {
        ...pkg,
        isFreeDelivery,
        activeDeliveryFee,
        freeDeliveryTarget,
        amountNeededForFreeDelivery,
        packageTotal: pkg.subtotal + activeDeliveryFee,
      };
    });

    // Single Store Baseline Calculation
    const singleStoreSubtotal = cart.reduce((sum, item) => {
      const baselinePrice = (Number(item.price) || 0) * 1.18;
      return sum + baselinePrice * (Number(item.quantity) || 1);
    }, 0);
    const singleStoreDelivery = 40;
    const singleStoreTotal = singleStoreSubtotal + singleStoreDelivery;

    // Split Totals
    const splitSubtotal = packages.reduce((sum, p) => sum + p.subtotal, 0);
    const splitDelivery = packages.reduce((sum, p) => sum + p.activeDeliveryFee, 0);
    const splitTotal = splitSubtotal + splitDelivery;

    const calculatedSavings = Math.max(45, Math.round(singleStoreTotal - splitTotal));

    return {
      packages,
      splitSubtotal,
      splitDelivery,
      splitTotal,
      singleStoreTotal: Math.round(singleStoreTotal),
      singleStoreSubtotal: Math.round(singleStoreSubtotal),
      singleStoreDelivery,
      totalSavings: calculatedSavings,
    };
  }, [cart]);

  // Billing Totals
  const currentSubtotal =
    optimizationMode === "split"
      ? splitEngine.splitSubtotal || 0
      : splitEngine.singleStoreSubtotal || 0;

  const currentDelivery =
    optimizationMode === "split"
      ? splitEngine.splitDelivery || 0
      : splitEngine.singleStoreDelivery || 0;

  const platformFee = 5;
  const taxesGst = Math.round(currentSubtotal * 0.05);
  const grossPayable = currentSubtotal + currentDelivery + platformFee + taxesGst - promoDiscount;
  const finalPayable = Math.max(0, grossPayable);

  // Promo Application
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = appliedPromo.trim().toUpperCase();
    if (code === "ONEBASKET50") {
      setPromoDiscount(50);
      setPromoError("");
    } else if (code === "GENERIC75") {
      setPromoDiscount(75);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'ONEBASKET50' or 'GENERIC75'");
      setPromoDiscount(0);
    }
  };

  // Razorpay Simulation
  const handleInitiateRazorpay = () => {
    setShowRazorpayModal(true);
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      const generatedOrderId = "OB-" + Math.floor(100000 + Math.random() * 900000);
      
      // Save order to UserContext
      addOrder({
        orderId: generatedOrderId,
        payable: finalPayable,
        itemsCount: cart.length,
        optimizationMode,
        packagesCount: splitEngine.packages.length,
        vendors: splitEngine.packages.map((p) => p.vendor.name),
        items: cart,
        paymentMethod: selectedPaymentMethod.toUpperCase(),
      });

      setTimeout(() => {
        clearCart();
        navigate("/tracking", {
          state: {
            orderId: generatedOrderId,
            payable: finalPayable,
            packagesCount: splitEngine.packages.length,
            vendors: splitEngine.packages.map((p) => p.vendor.name),
          },
        });
      }, 1400);
    }, 1300);
  };

  // --------------------------------------------------------------------------
  // EMPTY STATE VIEW
  // --------------------------------------------------------------------------
  if (cart.length === 0) {
    return (
      <div className="smart-cart-page">
        <div className="smart-cart-empty-container">
          <div className="empty-cart-badge">
            <ShoppingBag size={42} />
          </div>
          <h1 className="empty-cart-title">Your Smart Cart is Empty</h1>
          <p className="empty-cart-desc">
            Experience our Hyperlocal Multi-Vendor Split Engine. Add prescription medicines or fresh groceries
            to see automatic store partitioning and price comparison.
          </p>
          <div className="empty-cart-actions">
            <button
              type="button"
              className="btn-demo-basket"
              onClick={handleLoadSampleBasket}
            >
              <Sparkles size={17} />
              Load Sample Medicine & Grocery Basket
            </button>
            <Link to="/medicines" className="btn-browse-shop">
              Browse Medicines Catalog
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // ACTIVE VIEW
  // --------------------------------------------------------------------------
  return (
    <div className="smart-cart-page">
      <div className="smart-cart-wrapper">
        {/* BREADCRUMB & HEADER */}
        <header className="smart-cart-header">
          <nav className="header-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Smart Multi-Vendor Cart</span>
          </nav>

          <div className="header-meta">
            <span className="cart-total-badge">
              {cart.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0)} Items
            </span>
            <button
              type="button"
              className="btn-clear-cart"
              onClick={clearCart}
              title="Clear all items in cart"
            >
              <Trash2 size={13} />
              Clear Cart
            </button>
          </div>
        </header>

        {/* OPTIMIZATION TOGGLE SELECTOR */}
        <section className="optimization-banner-card" aria-label="Cart Optimization Selector">
          <div className="optimization-intro">
            <div className="optimization-icon-box">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="optimization-title">Hyperlocal Split Cart Optimizer</h2>
              <p className="optimization-subtitle">
                Compare and split your order across nearby licensed pharmacies and grocers for verified lowest prices.
              </p>
            </div>
          </div>

          <div className="optimization-toggle-group">
            <button
              type="button"
              className={`optimization-toggle-btn ${optimizationMode === "split" ? "active" : ""}`}
              onClick={() => handleModeSwitch("split")}
            >
              <div className="toggle-btn-header">
                <Sparkles size={16} />
                <strong>Smart Split Basket</strong>
                <span className="savings-pill">Save ₹{splitEngine.totalSavings}</span>
              </div>
              <small className="toggle-btn-desc">
                Automatically split across {splitEngine.packages.length} local stores to guarantee the lowest unit prices.
              </small>
            </button>

            <button
              type="button"
              className={`optimization-toggle-btn ${optimizationMode === "single" ? "active" : ""}`}
              onClick={() => handleModeSwitch("single")}
            >
              <div className="toggle-btn-header">
                <Store size={16} />
                <strong>Single Store Baseline</strong>
              </div>
              <small className="toggle-btn-desc">
                Everything bundled into a single delivery package from one centralized retailer.
              </small>
            </button>
          </div>
        </section>

        {/* GENERIC MEDICINE SAVINGS ALERT */}
        {genericOpportunities.length > 0 && (
          <aside className="generic-savings-banner" role="alert">
            <div className="generic-savings-content">
              <div className="generic-badge-icon">
                <ShieldCheck size={22} />
              </div>
              <div className="generic-text-wrap">
                <h3 className="generic-savings-title">
                  Govt. Verified Generic Medicine Equivalent Available!
                </h3>
                <p className="generic-savings-text">
                  Switch from branded medications to identical WHO-GMP certified chemical compositions from
                  authorized Jan Aushadhi Kendras and save up to 75% on pharmacy bills.
                </p>
                <div className="generic-switch-list">
                  {genericOpportunities.map(({ originalItem, generic }) => (
                    <div key={originalItem.id} className="generic-switch-row">
                      <div className="generic-comparison-names">
                        <span className="generic-old-name">{originalItem.name} (₹{originalItem.price})</span>
                        <ArrowRight size={13} className="generic-arrow" />
                        <span className="generic-new-name">{generic.name} (₹{generic.price})</span>
                        <span className="generic-save-amount">Save ₹{generic.savingsAmount}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-switch-generic"
                        onClick={() => handleSwitchToGeneric(originalItem, generic)}
                      >
                        <RefreshCw size={13} />
                        Switch & Save ₹{generic.savingsAmount}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* TWO-COLUMN LAYOUT */}
        <div className="smart-cart-grid">
          {/* LEFT: PACKAGES */}
          <main className="smart-cart-packages-column">
            {isCalculating ? (
              // SKELETON RECALCULATING STATE
              <div className="packages-skeleton-container">
                <div className="package-skeleton-card skeleton-shimmer" style={{ height: "160px" }} />
                <div className="package-skeleton-card skeleton-shimmer" style={{ height: "160px" }} />
              </div>
            ) : optimizationMode === "split" ? (
              // SPLIT PACKAGES
              splitEngine.packages.map((pkg, index) => (
                <article key={pkg.vendor.id} className="vendor-package-card">
                  <header className="package-header">
                    <span className="package-number-tag">
                      Package {index + 1} of {splitEngine.packages.length}
                    </span>
                    <div className="package-vendor-details">
                      <div className="vendor-name-row">
                        <Store size={17} className="vendor-icon" />
                        <h3 className="vendor-name">{pkg.vendor.name}</h3>
                        <span className="vendor-rating">★ {pkg.vendor.rating}</span>
                      </div>
                      <div className="vendor-meta-row">
                        <span className="vendor-meta-item">
                          <MapPin size={12} /> {pkg.vendor.distanceKm} km away
                        </span>
                        <span className="vendor-meta-item">
                          <Clock size={12} /> ~{pkg.vendor.avgPrepMinutes} min prep
                        </span>
                        <span className="vendor-license-tag">{pkg.vendor.licenseNo}</span>
                      </div>
                    </div>
                  </header>

                  {/* FREE DELIVERY PROGRESS */}
                  <div className="package-threshold-box">
                    <div className="threshold-label-row">
                      <span>
                        {pkg.isFreeDelivery ? (
                          <strong className="text-emerald">✓ FREE Hyperlocal Delivery Unlocked</strong>
                        ) : (
                          <span>
                            Add <strong>₹{pkg.amountNeededForFreeDelivery}</strong> more for Free Delivery
                          </span>
                        )}
                      </span>
                      <span className="threshold-progress-text">
                        ₹{pkg.subtotal} / ₹{pkg.freeDeliveryTarget}
                      </span>
                    </div>
                    <div className="threshold-progress-bar">
                      <div
                        className="threshold-progress-fill"
                        style={{
                          width: `${Math.min(100, (pkg.subtotal / pkg.freeDeliveryTarget) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* ITEM ROWS */}
                  <div className="package-items-list">
                    {pkg.items.map((item) => (
                      <div key={item.id} className="package-item-row">
                        <div className="item-icon-box">{item.icon || "📦"}</div>
                        <div className="item-details">
                          <div className="item-header-line">
                            <h4 className="item-name">{item.name}</h4>
                            <span className="item-category-tag">{item.category || item.type}</span>
                          </div>
                          {item.genericName && (
                            <small className="item-generic-subtext">Composition: {item.genericName}</small>
                          )}
                          <div className="item-unit-text">{item.unit || "Single pack"}</div>
                          <div className="item-unit-price">₹{item.price} each</div>
                        </div>

                        <div className="item-controls">
                          <div className="qty-control-box">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="qty-count">{item.quantity || 1}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="item-total-price">
                            ₹{Number(item.price || 0) * Number(item.quantity || 1)}
                          </span>

                          <button
                            type="button"
                            className="btn-delete-item"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <footer className="package-footer">
                    <span className="package-delivery-note">
                      Delivery: {pkg.isFreeDelivery ? "FREE" : `₹${pkg.activeDeliveryFee}`}
                    </span>
                    <span className="package-subtotal-val">
                      Package Total: <strong>₹{pkg.packageTotal}</strong>
                    </span>
                  </footer>
                </article>
              ))
            ) : (
              // CONSOLIDATED SINGLE STORE CARD
              <article className="vendor-package-card single-store-card">
                <header className="package-header">
                  <div className="package-vendor-details">
                    <div className="vendor-name-row">
                      <Building2 size={18} className="vendor-icon" />
                      <h3 className="vendor-name">Centralized Express Warehouse</h3>
                    </div>
                    <p className="single-store-explainer">
                      All items consolidated into a single drop. While convenient, items are priced at standard retail
                      MRP without local generic or wholesale discounts.
                    </p>
                  </div>
                </header>

                <div className="package-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="package-item-row">
                      <div className="item-icon-box">{item.icon || "📦"}</div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-unit-price">Retail Rate: ₹{Math.round(item.price * 1.18)}</div>
                      </div>
                      <div className="item-controls">
                        <span className="qty-count">Qty: {item.quantity || 1}</span>
                        <span className="item-total-price">
                          ₹{Math.round(Number(item.price * 1.18) * Number(item.quantity || 1))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* HYPERLOCAL PROMISES */}
            <div className="hyperlocal-trust-footer">
              <div className="trust-card">
                <ShieldCheck size={18} className="trust-icon" />
                <div>
                  <strong>Batch Verified Pharmacies</strong>
                  <p>Prescription medicines originate from verified brick-and-mortar chemists with batch tracking.</p>
                </div>
              </div>
              <div className="trust-card">
                <Clock size={18} className="trust-icon" />
                <div>
                  <strong>Simultaneous Dispatch</strong>
                  <p>Independent couriers are dispatched concurrently to ensure items arrive in the same delivery window.</p>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT: BILL SUMMARY & RAZORPAY */}
          <aside className="smart-cart-summary-column">
            <div className="summary-sticky-card">
              <h3 className="summary-card-title">Order Bill Summary</h3>

              {optimizationMode === "split" && splitEngine.totalSavings > 0 && (
                <div className="summary-savings-banner">
                  <Sparkles size={16} />
                  <span>
                    You save <strong>₹{splitEngine.totalSavings}</strong> with Smart Split!
                  </span>
                </div>
              )}

              <div className="summary-bill-rows">
                <div className="bill-row">
                  <span>Cart Items Subtotal</span>
                  <strong>₹{currentSubtotal}</strong>
                </div>

                <div className="bill-row">
                  <span>
                    Hyperlocal Delivery ({optimizationMode === "split" ? `${splitEngine.packages.length} Packages` : "1 Drop"})
                  </span>
                  <strong>{currentDelivery === 0 ? <span className="free-tag">FREE</span> : `₹${currentDelivery}`}</strong>
                </div>

                <div className="bill-row">
                  <span>Platform SafeCare Fee</span>
                  <strong>₹{platformFee}</strong>
                </div>

                <div className="bill-row">
                  <span>Estimated Taxes (GST 5%)</span>
                  <strong>₹{taxesGst}</strong>
                </div>

                {promoDiscount > 0 && (
                  <div className="bill-row promo-discount-row">
                    <span>Coupon Savings</span>
                    <strong className="text-emerald">-₹{promoDiscount}</strong>
                  </div>
                )}
              </div>

              {/* PROMO INPUT */}
              <form className="promo-input-section" onSubmit={handleApplyPromo}>
                <div className="promo-field-wrap">
                  <input
                    type="text"
                    className="promo-input"
                    placeholder="Coupon (e.g. ONEBASKET50)"
                    value={appliedPromo}
                    onChange={(e) => setAppliedPromo(e.target.value)}
                  />
                  <button type="submit" className="btn-apply-promo">
                    Apply
                  </button>
                </div>
                {promoError && <small className="promo-error-msg">{promoError}</small>}
                {promoDiscount > 0 && (
                  <small className="promo-success-msg">
                    Coupon applied! You saved ₹{promoDiscount}.
                  </small>
                )}
              </form>

              <hr className="summary-divider" />

              <div className="summary-total-row">
                <div>
                  <span className="total-label">Total Payable</span>
                  <small className="tax-inclusive-text">(All taxes & delivery included)</small>
                </div>
                <strong className="total-amount-display">₹{finalPayable}</strong>
              </div>

              <button
                type="button"
                className="btn-checkout-primary"
                onClick={handleInitiateRazorpay}
              >
                <CreditCard size={17} />
                Pay via Razorpay Secure
                <ArrowRight size={15} />
              </button>

              <div className="payment-security-notice">
                <ShieldCheck size={15} />
                <span>256-Bit Encrypted • UPI, Cards & NetBanking</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* RAZORPAY CHECKOUT MODAL */}
      {showRazorpayModal && (
        <div className="razorpay-modal-overlay" role="dialog" aria-modal="true">
          <div className="razorpay-modal-card">
            <div className="razorpay-modal-header">
              <div className="razorpay-brand">
                <span className="rzp-badge">Razorpay</span>
                <span className="rzp-mode">TEST MODE (Sandbox)</span>
              </div>
              <button
                type="button"
                className="rzp-close-btn"
                onClick={() => setShowRazorpayModal(false)}
                disabled={isProcessingPayment}
              >
                ✕
              </button>
            </div>

            <div className="razorpay-modal-body">
              {!paymentSuccess ? (
                <>
                  <div className="rzp-merchant-info">
                    <span className="rzp-merchant-title">OneBasket Hyperlocal Marketplace</span>
                    <span className="rzp-order-ref">
                      Order: OB_SPLIT_{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                    <strong className="rzp-amount-badge">₹{finalPayable}.00</strong>
                  </div>

                  <div className="rzp-packages-summary">
                    <p className="rzp-split-note">
                      Payment will be automatically distributed to:
                    </p>
                    <ul className="rzp-vendors-list">
                      {splitEngine.packages.map((pkg) => (
                        <li key={pkg.vendor.id}>
                          <span>{pkg.vendor.name}</span>
                          <strong>₹{pkg.packageTotal}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rzp-payment-methods">
                    <label
                      className={`rzp-method-option ${selectedPaymentMethod === "upi" ? "active" : ""}`}
                      onClick={() => setSelectedPaymentMethod("upi")}
                    >
                      <input
                        type="radio"
                        name="rzp_method"
                        checked={selectedPaymentMethod === "upi"}
                        onChange={() => setSelectedPaymentMethod("upi")}
                      />
                      <span className="method-label">Instant UPI (GPay / PhonePe / Paytm / BHIM)</span>
                    </label>
                    <label
                      className={`rzp-method-option ${selectedPaymentMethod === "card" ? "active" : ""}`}
                      onClick={() => setSelectedPaymentMethod("card")}
                    >
                      <input
                        type="radio"
                        name="rzp_method"
                        checked={selectedPaymentMethod === "card"}
                        onChange={() => setSelectedPaymentMethod("card")}
                      />
                      <span className="method-label">Debit / Credit Card (Visa, Mastercard, RuPay)</span>
                    </label>
                    <label
                      className={`rzp-method-option ${selectedPaymentMethod === "netbanking" ? "active" : ""}`}
                      onClick={() => setSelectedPaymentMethod("netbanking")}
                    >
                      <input
                        type="radio"
                        name="rzp_method"
                        checked={selectedPaymentMethod === "netbanking"}
                        onChange={() => setSelectedPaymentMethod("netbanking")}
                      />
                      <span className="method-label">Net Banking (SBI, HDFC, ICICI, Axis)</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    className="rzp-pay-action-btn"
                    onClick={handleSimulatePayment}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw size={15} className="spin-icon" />
                        Authorizing with Bank...
                      </>
                    ) : (
                      <>Pay ₹{finalPayable}.00 via Razorpay</>
                    )}
                  </button>
                </>
              ) : (
                <div className="rzp-success-state">
                  <CheckCircle2 size={52} className="rzp-success-icon" />
                  <h3>Payment Authorized!</h3>
                  <p>Transaction ID: pay_rzp_mock_{Date.now().toString().slice(-8)}</p>
                  <p className="redirect-note">Launching live order tracking...</p>
                </div>
              )}
            </div>

            <footer className="razorpay-modal-footer">
              <ShieldCheck size={13} />
              <span>PCI-DSS Level 1 Certified • End-to-End Encrypted</span>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
