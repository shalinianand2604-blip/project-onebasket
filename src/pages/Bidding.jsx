// ==========================================================================
// FILE: src/pages/Bidding.jsx
// COMPONENT: Bidding (Reverse Marketplace Real-Time Bidding Dashboard)
// ==========================================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Clock,
  Send,
  Store,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { INITIAL_BIDS } from "../data/mockBidsData";
import { useUser } from "./UserContext";
import "./Bidding.css";

/*
  AI Image Prompt (Reverse Bidding Dashboard Hero):
  "Dynamic isometric vector illustration of a digital medical dispatch radar connecting neighborhood chemists with emergency prescription requests, clean light cyan and warm coral accents, sleek UI graphics."
*/

export default function Bidding() {
  const navigate = useNavigate();
  const { user, isVendor } = useUser();

  const [bidsList, setBidsList] = useState(INITIAL_BIDS);
  const [selectedBidId, setSelectedBidId] = useState(INITIAL_BIDS[0].id);

  // Form State for Broadcasting New Requirement
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newQty, setNewQty] = useState("1 Pack");
  const [newUrgency, setNewUrgency] = useState("Immediate (< 20 mins)");
  const [newBudget, setNewBudget] = useState("500");
  const [newCategory, setNewCategory] = useState("Prescription Medicine");
  const [newNotes, setNewNotes] = useState("");
  const [hasRx, setHasRx] = useState(true);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Live countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBidsList((prevBids) =>
        prevBids.map((b) => ({
          ...b,
          timeRemainingSeconds: Math.max(0, b.timeRemainingSeconds - 1),
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? "0" : ""}${rem}`;
  };

  const activeBid = bidsList.find((b) => b.id === selectedBidId) || bidsList[0];

  // Accept a Vendor Bid
  const handleAcceptBid = (ticketId, vendorBid) => {
    navigate("/tracking", {
      state: {
        orderId: `BID-${ticketId}-WIN`,
        payable: vendorBid.bidAmount,
        packagesCount: 1,
        vendors: [vendorBid.vendorName],
        deliveryPartner: `${vendorBid.vendorName} Express Runner`,
        isFromBidding: true,
      },
    });
  };

  // Submit New Broadcast
  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newTicket = {
      id: `BID-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: user?.name || "Dr. Shalini Anand",
      location: "Sector 14, Urban Estate (0.8 km)",
      urgency: newUrgency,
      urgencyLevel: newUrgency.includes("Immediate") ? "emergency" : "standard",
      targetCategory: newCategory,
      itemsRequired: [{ name: newItemName, qty: newQty, maxBudget: Number(newBudget) }],
      customerNotes: newNotes || "Urgent requirement. Please bid genuine batch only.",
      prescriptionUploaded: hasRx,
      prescriptionFile: hasRx ? "emergency_rx_uploaded.pdf" : null,
      targetBudget: Number(newBudget),
      timeRemainingSeconds: 600, // 10 mins
      status: "active",
      createdAt: "Just now",
      vendorBids: [
        {
          id: `vbid-${Date.now()}`,
          vendorId: "v-med-03",
          vendorName: "Sanjeevani Local Chemist",
          rating: 4.8,
          distanceKm: 0.4,
          bidAmount: Math.round(Number(newBudget) * 0.88),
          estimatedDeliveryMinutes: 10,
          deliveryFee: 0,
          notes: "In stock. Immediate runner dispatch guaranteed.",
          timestamp: "Just now",
          status: "leading",
        },
      ],
    };

    setBidsList([newTicket, ...bidsList]);
    setSelectedBidId(newTicket.id);
    setBroadcastSuccess(true);

    setTimeout(() => {
      setBroadcastSuccess(false);
      setShowBroadcastModal(false);
      setNewItemName("");
      setNewNotes("");
    }, 1200);
  };

  return (
    <div className="bidding-page">
      <div className="bidding-wrapper">
        {/* HEADER */}
        <header className="bidding-header">
          <div>
            <div className="bidding-badge">
              <Zap size={14} />
              <span>Hyperlocal Reverse Bidding Engine</span>
            </div>
            <h1 className="bidding-title">Urgent Need? Local Stores Compete to Bid</h1>
            <p className="bidding-subtitle">
              Broadcast urgent medicine or grocery requirements to nearby pharmacies within 3 km. Verified local
              store owners submit competitive counter-bids with guaranteed fast delivery.
            </p>
          </div>

          <button
            type="button"
            className="btn-broadcast-urgent"
            onClick={() => setShowBroadcastModal(true)}
          >
            <Flame size={16} />
            Post Urgent Broadcast
          </button>
        </header>

        {/* MAIN SPLIT VIEW: TICKETS LIST (LEFT) & ACTIVE TICKET DETAILS (RIGHT) */}
        <div className="bidding-grid">
          {/* LEFT: ACTIVE BROADCAST TICKETS */}
          <aside className="bidding-tickets-sidebar">
            <h3 className="sidebar-section-title">
              Active Broadcast Requests ({bidsList.length})
            </h3>

            <div className="tickets-list">
              {bidsList.map((bid) => {
                const isSelected = bid.id === activeBid?.id;
                const lowestBid = Math.min(...bid.vendorBids.map((vb) => vb.bidAmount));

                return (
                  <div
                    key={bid.id}
                    className={`ticket-summary-card ${isSelected ? "selected" : ""} ${
                      bid.urgencyLevel === "emergency" ? "emergency-ticket" : ""
                    }`}
                    onClick={() => setSelectedBidId(bid.id)}
                  >
                    <div className="ticket-card-top">
                      <span className="ticket-id">{bid.id}</span>
                      <span className="ticket-countdown">
                        <Clock size={12} />
                        {formatTime(bid.timeRemainingSeconds)}
                      </span>
                    </div>

                    <h4 className="ticket-item-title">
                      {bid.itemsRequired.map((i) => i.name).join(", ")}
                    </h4>

                    <div className="ticket-meta-line">
                      <span>{bid.customerName}</span>
                      <span>•</span>
                      <span>{bid.location}</span>
                    </div>

                    <div className="ticket-card-bottom">
                      <span className="bids-counter">
                        {bid.vendorBids.length} competing {bid.vendorBids.length === 1 ? "bid" : "bids"}
                      </span>
                      <span className="lowest-bid-val">
                        Lowest: <strong>₹{lowestBid}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* RIGHT: DETAILED BID WORKBENCH */}
          <main className="bidding-workbench">
            {activeBid ? (
              <article className="workbench-card">
                {/* WORKBENCH TOP HEADER */}
                <div className="workbench-header">
                  <div>
                    <div className="workbench-status-row">
                      <span className="live-status-dot" />
                      <strong className="live-status-text">LIVE AUCTION ACTIVE</strong>
                      <span className="workbench-timer">
                        <Clock size={14} /> Time Left: {formatTime(activeBid.timeRemainingSeconds)}
                      </span>
                    </div>
                    <h2 className="workbench-title">
                      Requirement #{activeBid.id}: {activeBid.targetCategory}
                    </h2>
                    <p className="workbench-loc">
                      <MapPin size={14} /> Delivering to: {activeBid.location} ({activeBid.customerName})
                    </p>
                  </div>

                  <div className="budget-target-box">
                    <small>Target Maximum Budget</small>
                    <strong>₹{activeBid.targetBudget}</strong>
                  </div>
                </div>

                {/* ITEMS REQUIRED SUMMARY */}
                <div className="requested-items-panel">
                  <h4 className="panel-subhead">Items Requested:</h4>
                  <div className="items-tags-wrap">
                    {activeBid.itemsRequired.map((item, idx) => (
                      <div key={idx} className="item-req-pill">
                        <span className="item-req-name">{item.name}</span>
                        <span className="item-req-qty">({item.qty})</span>
                      </div>
                    ))}
                  </div>
                  {activeBid.customerNotes && (
                    <div className="customer-instructions-note">
                      <strong>Customer Note:</strong> "{activeBid.customerNotes}"
                    </div>
                  )}
                  {activeBid.prescriptionUploaded && (
                    <div className="rx-verified-badge">
                      <FileText size={14} />
                      <span>Prescription Uploaded & Pharmacist Verified</span>
                    </div>
                  )}
                </div>

                {/* LIVE VENDOR BIDS FEED */}
                <section className="vendor-bids-section">
                  <h3 className="bids-section-title">
                    Competing Neighborhood Offers ({activeBid.vendorBids.length})
                  </h3>

                  <div className="vendor-bids-feed">
                    {activeBid.vendorBids.map((vbid) => {
                      const savings = activeBid.targetBudget - vbid.bidAmount;

                      return (
                        <div key={vbid.id} className="vendor-bid-card">
                          <div className="vbid-header">
                            <div className="vbid-vendor-info">
                              <Store size={18} className="vbid-store-icon" />
                              <div>
                                <h4 className="vbid-vendor-name">{vbid.vendorName}</h4>
                                <div className="vbid-meta">
                                  <span>★ {vbid.rating}</span>
                                  <span>•</span>
                                  <span>{vbid.distanceKm} km away</span>
                                  <span>•</span>
                                  <span>{vbid.timestamp}</span>
                                </div>
                              </div>
                            </div>

                            <div className="vbid-amount-box">
                              <span className="vbid-amount">₹{vbid.bidAmount}</span>
                              {savings > 0 && (
                                <small className="vbid-savings">Save ₹{savings}</small>
                              )}
                            </div>
                          </div>

                          <div className="vbid-body">
                            <p className="vbid-notes">"{vbid.notes}"</p>
                            <div className="vbid-speed-pill">
                              <Clock size={13} />
                              <span>Guaranteed Delivery in <strong>{vbid.estimatedDeliveryMinutes} mins</strong></span>
                            </div>
                          </div>

                          <div className="vbid-footer">
                            <div className="vbid-badges">
                              {vbid.status === "best_value" && (
                                <span className="badge-best-value">
                                  <TrendingDown size={12} /> Best Value
                                </span>
                              )}
                              {vbid.status === "leading" && (
                                <span className="badge-leading">
                                  <Sparkles size={12} /> Fastest Dispatch
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              className="btn-accept-bid"
                              onClick={() => handleAcceptBid(activeBid.id, vbid)}
                            >
                              <CheckCircle2 size={16} />
                              Accept Bid (₹{vbid.bidAmount})
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </article>
            ) : (
              <div className="no-active-bid">Select a broadcast ticket on the left.</div>
            )}
          </main>
        </div>
      </div>

      {/* BROADCAST MODAL */}
      {showBroadcastModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="broadcast-modal-card">
            <div className="modal-header">
              <div className="modal-header-title">
                <Flame size={20} className="modal-flame-icon" />
                <h3>Broadcast Urgent Requirement</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowBroadcastModal(false)}
              >
                ✕
              </button>
            </div>

            {broadcastSuccess ? (
              <div className="broadcast-success-state">
                <CheckCircle2 size={48} className="success-icon" />
                <h4>Requirement Broadcasted!</h4>
                <p>Nearby verified stores within 3 km have been alerted and are submitting bids.</p>
              </div>
            ) : (
              <form onSubmit={handleBroadcastSubmit} className="broadcast-form">
                <div className="form-field">
                  <label>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Prescription Medicine">Prescription Medicine</option>
                    <option value="OTC & Health Essentials">OTC & Health Essentials</option>
                    <option value="Fresh Grocery & Dairy">Fresh Grocery & Dairy</option>
                    <option value="Baby Care & Nutrition">Baby Care & Nutrition</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Item Name / Medicine Salt</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Duolin Inhaler or A2 Gir Cow Milk"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Quantity / Pack</label>
                    <input
                      type="text"
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label>Max Budget (₹)</label>
                    <input
                      type="number"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Delivery Urgency</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value)}
                    className="form-select"
                  >
                    <option value="Immediate (< 20 mins)">Immediate Emergency (&lt; 20 mins)</option>
                    <option value="Standard (Within 1 hour)">Standard (Within 1 hour)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Special Instructions for Shopkeeper</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need genuine batch with latest expiry, sealed carton."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={hasRx}
                      onChange={(e) => setHasRx(e.target.checked)}
                    />
                    <span>Valid Doctor's Prescription is available upon delivery</span>
                  </label>
                </div>

                <button type="submit" className="btn-submit-broadcast">
                  <Send size={16} />
                  Broadcast to Nearby Stores
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
