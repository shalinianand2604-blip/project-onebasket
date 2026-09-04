// ==========================================================================
// FILE: src/pages/VendorDashboard.jsx
// COMPONENT: VendorDashboard (Shop Owner Inventory, Bid Alerts & Fulfillment)
// ==========================================================================

import React, { useState } from "react";
import {
  Store,
  Package,
  Flame,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Plus,
  Edit2,
  DollarSign,
  ShieldCheck,
  Send,
  RefreshCw,
  Power,
  BarChart3,
  Tag,
} from "lucide-react";
import { useUser } from "./UserContext";
import { PRODUCTS } from "../data/productsData";
import { INITIAL_BIDS } from "../data/mockBidsData";
import "./VendorDashboard.css";

/*
  AI Image Prompt (Vendor Dashboard Header / Store Visual):
  "Organized pharmacy inventory back-office counter with an iPad tablet showing inventory stock control metrics, shelves of pharmaceutical medicine bottles in the background, warm natural lighting."
*/

export default function VendorDashboard() {
  const { vendorProfile, updateProfile } = useUser();

  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("bids"); // 'bids' | 'inventory' | 'orders'
  const [bidsQueue, setBidsQueue] = useState(INITIAL_BIDS);
  const [inventoryList, setInventoryList] = useState(PRODUCTS);
  const [inventorySearch, setInventorySearch] = useState("");

  // Counter-bid modal state
  const [selectedBidToAnswer, setSelectedBidToAnswer] = useState(null);
  const [counterAmount, setCounterAmount] = useState("");
  const [counterEta, setCounterEta] = useState("12");
  const [counterNotes, setCounterNotes] = useState("");
  const [bidSubmitSuccess, setBidSubmitSuccess] = useState(false);

  // Toggle Stock Status for a Product
  const handleToggleStock = (productId) => {
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  // Quick Price Update
  const handleUpdatePrice = (productId, newPrice) => {
    const parsed = Number(newPrice);
    if (isNaN(parsed) || parsed <= 0) return;
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, price: parsed } : item
      )
    );
  };

  // Open Counter-Bid Modal
  const handleOpenBidModal = (bid) => {
    setSelectedBidToAnswer(bid);
    setCounterAmount(Math.round(bid.targetBudget * 0.9).toString());
    setCounterEta("10");
    setCounterNotes("Item in stock with latest batch. Ready for express runner.");
    setBidSubmitSuccess(false);
  };

  // Submit Counter-Bid
  const handleSubmitCounterBid = (e) => {
    e.preventDefault();
    if (!selectedBidToAnswer) return;

    const newBidObj = {
      id: `vbid-${Date.now()}`,
      vendorId: vendorProfile?.id || "v-med-03",
      vendorName: vendorProfile?.shopName || "Sanjeevani Local Chemist",
      rating: 4.8,
      distanceKm: 0.4,
      bidAmount: Number(counterAmount),
      estimatedDeliveryMinutes: Number(counterEta),
      deliveryFee: 0,
      notes: counterNotes,
      timestamp: "Just now",
      status: "leading",
    };

    setBidsQueue((prev) =>
      prev.map((b) =>
        b.id === selectedBidToAnswer.id
          ? { ...b, vendorBids: [newBidObj, ...b.vendorBids] }
          : b
      )
    );

    setBidSubmitSuccess(true);
    setTimeout(() => {
      setBidSubmitSuccess(false);
      setSelectedBidToAnswer(null);
    }, 1200);
  };

  // Filtered Inventory
  const filteredInventory = inventoryList.filter(
    (item) =>
      item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.genericName?.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  return (
    <div className="vendor-dashboard-page">
      <div className="vendor-dashboard-wrapper">
        {/* STORE HEADER BANNER */}
        <header className="vendor-store-banner">
          <div className="store-identity-col">
            <div className="store-avatar">
              <Store size={26} />
            </div>
            <div>
              <div className="store-badges-row">
                <span className="store-verified-pill">
                  <ShieldCheck size={13} /> Verified Merchant
                </span>
                <span className="store-license-pill">
                  DL: {vendorProfile?.licenseNo || "DL-SANJ-1192-291"}
                </span>
              </div>
              <h1 className="vendor-store-title">
                {vendorProfile?.shopName || "Sanjeevani Local Chemist & Generic Hub"}
              </h1>
              <p className="vendor-store-meta">
                <MapPin size={13} /> Sector 14, Urban Estate • GSTIN: 07AAAAA0000A1Z5 • 4.8 ★ (1,120 reviews)
              </p>
            </div>
          </div>

          <div className="store-online-toggle-col">
            <button
              type="button"
              className={`btn-store-status-toggle ${isStoreOpen ? "open" : "closed"}`}
              onClick={() => setIsStoreOpen(!isStoreOpen)}
            >
              <Power size={15} />
              <span>{isStoreOpen ? "Online (Accepting Orders)" : "Offline (Paused)"}</span>
            </button>
          </div>
        </header>

        {/* METRICS ROW */}
        <section className="vendor-metrics-grid">
          <div className="vendor-metric-card">
            <div className="metric-icon-wrap orders">
              <Package size={20} />
            </div>
            <div>
              <span className="metric-label">Today's Orders</span>
              <strong className="metric-value">28</strong>
              <small className="metric-sub">9 Split Deliveries</small>
            </div>
          </div>

          <div className="vendor-metric-card">
            <div className="metric-icon-wrap revenue">
              <TrendingUp size={20} />
            </div>
            <div>
              <span className="metric-label">Today's Revenue</span>
              <strong className="metric-value">₹8,490</strong>
              <small className="metric-sub">+14% vs yesterday</small>
            </div>
          </div>

          <div className="vendor-metric-card">
            <div className="metric-icon-wrap bids">
              <Flame size={20} />
            </div>
            <div>
              <span className="metric-label">Live Local Bids</span>
              <strong className="metric-value">{bidsQueue.length}</strong>
              <small className="metric-sub">Within 3 km radius</small>
            </div>
          </div>

          <div className="vendor-metric-card">
            <div className="metric-icon-wrap dispatch">
              <Clock size={20} />
            </div>
            <div>
              <span className="metric-label">Avg. Dispatch Time</span>
              <strong className="metric-value">8.4 Mins</strong>
              <small className="metric-sub">Super-Fast Partner</small>
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION */}
        <div className="vendor-tabs-bar">
          <button
            type="button"
            className={`vendor-tab-btn ${activeTab === "bids" ? "active" : ""}`}
            onClick={() => setActiveTab("bids")}
          >
            <Flame size={16} />
            Live Customer Bids ({bidsQueue.length})
          </button>
          <button
            type="button"
            className={`vendor-tab-btn ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            <Package size={16} />
            Inventory & Price Manager ({inventoryList.length})
          </button>
          <button
            type="button"
            className={`vendor-tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <CheckCircle2 size={16} />
            Orders to Pack & Dispatch (3)
          </button>
        </div>

        {/* TAB 1: LIVE BIDS BROADCAST DESK */}
        {activeTab === "bids" && (
          <section className="vendor-bids-tab-panel">
            <div className="panel-header-desc">
              <div>
                <h3 className="tab-section-heading">Emergency Customer Broadcasts</h3>
                <p className="tab-section-sub">
                  Submit fast price bids to nearby patients & buyers before competing stores respond.
                </p>
              </div>
            </div>

            <div className="vendor-bids-queue-list">
              {bidsQueue.map((bid) => {
                const hasMyBid = bid.vendorBids.some(
                  (vb) => vb.vendorName === (vendorProfile?.shopName || "Sanjeevani Local Chemist")
                );

                return (
                  <article key={bid.id} className="vendor-incoming-bid-card">
                    <div className="bid-card-top-row">
                      <div className="bid-category-tag">
                        <Flame size={13} />
                        <span>{bid.targetCategory}</span>
                        <span className="urgency-badge">{bid.urgency}</span>
                      </div>
                      <span className="bid-ticket-id">Ticket: #{bid.id}</span>
                    </div>

                    <div className="bid-card-main-content">
                      <div className="bid-items-list-col">
                        <h4 className="bid-patient-title">
                          Requirement from {bid.customerName} ({bid.location})
                        </h4>
                        <ul className="items-bullet-list">
                          {bid.itemsRequired.map((item, i) => (
                            <li key={i}>
                              <strong>{item.name}</strong> — {item.qty}
                            </li>
                          ))}
                        </ul>
                        {bid.customerNotes && (
                          <small className="patient-instruction-note">
                            Note: "{bid.customerNotes}"
                          </small>
                        )}
                      </div>

                      <div className="bid-budget-action-col">
                        <div className="budget-target-badge">
                          <small>Customer Max Budget</small>
                          <strong>₹{bid.targetBudget}</strong>
                        </div>

                        {hasMyBid ? (
                          <span className="badge-bid-already-submitted">
                            <CheckCircle2 size={14} /> Bid Submitted
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="btn-open-counter-bid"
                            onClick={() => handleOpenBidModal(bid)}
                          >
                            Submit Counter-Bid
                            <Send size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: INVENTORY & STOCK MANAGER */}
        {activeTab === "inventory" && (
          <section className="vendor-inventory-tab-panel">
            <div className="inventory-controls-bar">
              <div className="inventory-search-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search item by trade name, salt, or category..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="inventory-search-input"
                />
              </div>

              <div className="inventory-stats-pill">
                <span>Total Catalog: <strong>{inventoryList.length}</strong> items</span>
                <span>•</span>
                <span>In Stock: <strong>{inventoryList.filter((i) => i.inStock).length}</strong></span>
              </div>
            </div>

            <div className="inventory-table-wrap">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Item Name & Composition</th>
                    <th>Category</th>
                    <th>Standard MRP</th>
                    <th>Your Store Price (₹)</th>
                    <th>Stock Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className={!item.inStock ? "out-of-stock-row" : ""}>
                      <td>
                        <strong className="item-name-text">{item.name}</strong>
                        {item.genericName && (
                          <small className="generic-salt-text">Salt: {item.genericName}</small>
                        )}
                        <span className="unit-label">{item.unit}</span>
                      </td>
                      <td>
                        <span className="category-tag">{item.category}</span>
                      </td>
                      <td>
                        <span className="mrp-striked">₹{item.mrp}</span>
                      </td>
                      <td>
                        <div className="price-input-wrapper">
                          <span>₹</span>
                          <input
                            type="number"
                            className="vendor-price-input"
                            defaultValue={item.price}
                            onBlur={(e) => handleUpdatePrice(item.id, e.target.value)}
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`stock-toggle-pill ${item.inStock ? "in-stock" : "out-of-stock"}`}
                          onClick={() => handleToggleStock(item.id)}
                        >
                          {item.inStock ? "● In Stock" : "○ Out of Stock"}
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-edit-item-quick"
                          title="Quick update item"
                        >
                          <Edit2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: ORDERS TO PACK & DISPATCH */}
        {activeTab === "orders" && (
          <section className="vendor-orders-tab-panel">
            <h3 className="tab-section-heading">Pending Split Orders for Packing</h3>
            <div className="orders-to-pack-list">
              <div className="pack-order-card">
                <div className="pack-order-header">
                  <div>
                    <span className="pack-order-id">Order #OB-884920</span>
                    <h4 className="pack-customer-name">Patient: Vikram Mehta (Sector 14)</h4>
                  </div>
                  <span className="pack-urgency-badge">Dispatch Due in 8 mins</span>
                </div>
                <div className="pack-items-content">
                  <p><strong>Package Content:</strong> Augmentin 625 Duo (1 Strip), Dolo 650 (2 Strips)</p>
                  <small>Batch Verification: Expiry 08/2026 verified by Dr. Rajesh Kumar</small>
                </div>
                <div className="pack-order-footer">
                  <span className="pack-delivery-partner">Assigned Runner: Ramesh Patel (EV Scooter)</span>
                  <button type="button" className="btn-mark-packed">
                    <CheckCircle2 size={14} /> Mark Sealed & Ready for Pickup
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* COUNTER-BID SUBMISSION MODAL */}
      {selectedBidToAnswer && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="counter-bid-modal-card">
            <div className="modal-header">
              <h3>Submit Counter-Bid for Ticket #{selectedBidToAnswer.id}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedBidToAnswer(null)}
              >
                ✕
              </button>
            </div>

            {bidSubmitSuccess ? (
              <div className="bid-success-box">
                <CheckCircle2 size={42} className="success-icon" />
                <h4>Counter-Bid Sent to Customer!</h4>
                <p>The patient has received your competitive offer and can accept instantly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitCounterBid} className="counter-bid-form">
                <div className="bid-target-reference">
                  <span>Customer's Requested Items:</span>
                  <strong>{selectedBidToAnswer.itemsRequired.map((i) => i.name).join(", ")}</strong>
                  <div className="reference-budget">Max Budget: ₹{selectedBidToAnswer.targetBudget}</div>
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Your Counter Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={counterAmount}
                      onChange={(e) => setCounterAmount(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label>Guaranteed Prep & Dispatch (Mins)</label>
                    <input
                      type="number"
                      required
                      value={counterEta}
                      onChange={(e) => setCounterEta(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Message / Note to Buyer</label>
                  <textarea
                    rows={2}
                    value={counterNotes}
                    onChange={(e) => setCounterNotes(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn-submit-counter">
                  <Send size={15} />
                  Submit Offer of ₹{counterAmount}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
