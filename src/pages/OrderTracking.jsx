// ==========================================================================
// FILE: src/pages/OrderTracking.jsx
// COMPONENT: OrderTracking (Multi-Step Visual Delivery & Location Progress Tracker)
// ==========================================================================

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Package,
  Store,
  Navigation,
  ArrowRight,
  Sparkles,
  Bike,
  QrCode,
  FileCheck,
} from "lucide-react";
import "./OrderTracking.css";

/*
  AI Image Prompt (Order Tracking Map / Courier Visual):
  "Top-down isometric view of a clean minimalist urban neighborhood map illustration showing two local store pins, an electric scooter courier in transit with green trail line, and a blue customer destination pin with glowing radius."
*/

export default function OrderTracking() {
  const location = useLocation();
  const orderData = location.state || {};

  const orderId = orderData.orderId || "OB-774921";
  const payableAmount = orderData.payable || 340;
  const packagesCount = orderData.packagesCount || 2;
  const vendorNames = orderData.vendors || [
    "Jan Aushadhi Kendra (Govt. Generic Hub)",
    "Sharma Daily Essentials Mart",
  ];

  // Active progress step (1 to 4)
  const [currentStep, setCurrentStep] = useState(3); // Default to "Out for Delivery"
  const [riderDistanceMeters, setRiderDistanceMeters] = useState(650);
  const [etaMinutes, setEtaMinutes] = useState(9);

  // Simulated live rider movement
  useEffect(() => {
    const timer = setInterval(() => {
      setRiderDistanceMeters((prev) => Math.max(120, prev - 40));
      setEtaMinutes((prev) => Math.max(2, Math.round(prev - 0.5)));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      step: 1,
      title: "Order Placed & Escrowed",
      desc: "Payment verified via Razorpay SafeCare. Sent to stores.",
      time: "12:51 PM",
      completed: true,
    },
    {
      step: 2,
      title: "Inspected & Batch-Sealed",
      desc: "Licensed pharmacist checked expiry dates & tamper-proof sealed.",
      time: "12:54 PM",
      completed: true,
    },
    {
      step: 3,
      title: "Dispatched with Hyperlocal Runner",
      desc: "Courier picked up packages from split stores. En route to you.",
      time: "12:58 PM",
      completed: currentStep >= 3,
      active: currentStep === 3,
    },
    {
      step: 4,
      title: "Contactless Handover",
      desc: "Verify delivery OTP with courier at doorstep.",
      time: "Expected 01:07 PM",
      completed: currentStep === 4,
    },
  ];

  return (
    <div className="tracking-page">
      <div className="tracking-wrapper">
        {/* HEADER */}
        <header className="tracking-header">
          <div className="tracking-status-badge">
            <span className="live-pulsing-dot" />
            <span>LIVE TRACKING ACTIVE</span>
          </div>
          <h1 className="tracking-title">Delivery Tracker: {orderId}</h1>
          <p className="tracking-subtitle">
            Hyperlocal parallel delivery from {packagesCount} neighborhood vendors. Delivering to Flat 402, Apex Green.
          </p>
        </header>

        {/* TOP SUMMARY CARDS */}
        <section className="tracking-quick-stats">
          <div className="quick-stat-card eta-card">
            <div className="stat-icon-wrap">
              <Clock size={24} />
            </div>
            <div>
              <span className="stat-label">Estimated Delivery</span>
              <strong className="stat-value">{etaMinutes} Minutes</strong>
              <small className="stat-hint">~{riderDistanceMeters} meters away</small>
            </div>
          </div>

          <div className="quick-stat-card otp-card">
            <div className="stat-icon-wrap">
              <QrCode size={24} />
            </div>
            <div>
              <span className="stat-label">Delivery Secure OTP</span>
              <strong className="stat-value otp-code">5892</strong>
              <small className="stat-hint">Share only upon package inspection</small>
            </div>
          </div>

          <div className="quick-stat-card payment-card">
            <div className="stat-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="stat-label">Order Total (Paid)</span>
              <strong className="stat-value">₹{payableAmount}</strong>
              <small className="stat-hint">Split escrow verified</small>
            </div>
          </div>
        </section>

        {/* MAIN TRACKING GRID */}
        <div className="tracking-main-grid">
          {/* LEFT: STEP PROGRESS TIMELINE */}
          <main className="timeline-container-card">
            <h2 className="timeline-heading">Delivery Milestones</h2>

            <div className="tracking-stepper">
              {steps.map((s, idx) => (
                <div
                  key={s.step}
                  className={`stepper-item ${s.completed ? "completed" : ""} ${s.active ? "active" : ""}`}
                >
                  <div className="stepper-marker-col">
                    <div className="stepper-circle">
                      {s.completed && !s.active ? (
                        <CheckCircle2 size={18} />
                      ) : s.active ? (
                        <Bike size={18} />
                      ) : (
                        <span>{s.step}</span>
                      )}
                    </div>
                    {idx < steps.length - 1 && <div className="stepper-line" />}
                  </div>

                  <div className="stepper-content">
                    <div className="stepper-header-line">
                      <h3 className="stepper-title">{s.title}</h3>
                      <span className="stepper-time">{s.time}</span>
                    </div>
                    <p className="stepper-desc">{s.desc}</p>

                    {s.active && (
                      <div className="active-dispatch-pill">
                        <Navigation size={13} className="spin-slow" />
                        <span>Rider moving on EV Scooter • Speed: 24 km/h</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SPLIT PACKAGES IN TRANSIT */}
            <div className="split-packages-section">
              <h3 className="split-section-title">Packages in This Delivery</h3>
              <div className="split-packages-list">
                {vendorNames.map((name, i) => (
                  <div key={i} className="package-transit-row">
                    <div className="package-icon-box">
                      <Package size={18} />
                    </div>
                    <div className="package-info-col">
                      <span className="package-title">Package {i + 1} of {vendorNames.length}</span>
                      <strong className="package-store">{name}</strong>
                    </div>
                    <span className="package-badge-verified">
                      <FileCheck size={14} /> Tamper Sealed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* RIGHT: LIVE MAP SIMULATOR & COURIER CARD */}
          <aside className="tracking-map-column">
            {/* MAP SIMULATOR */}
            <div className="map-simulator-card">
              <div className="map-header-bar">
                <span className="map-tag">Hyperlocal Radar</span>
                <span className="map-live-status">LIVE GPS FEED</span>
              </div>

              {/* SIMULATED MAP CANVAS */}
              <div className="simulated-map-canvas">
                <div className="map-grid-lines" />

                {/* STORE 1 PIN */}
                <div className="map-pin-point store-pin-1" title="Jan Aushadhi Kendra">
                  <div className="pin-tooltip">Store A (0.6 km)</div>
                  <Store size={16} />
                </div>

                {/* STORE 2 PIN */}
                <div className="map-pin-point store-pin-2" title="Sharma Mart">
                  <div className="pin-tooltip">Store B (0.5 km)</div>
                  <Store size={16} />
                </div>

                {/* RIDER PIN */}
                <div className="map-pin-point rider-pin" title="Courier en route">
                  <div className="rider-pulse" />
                  <Bike size={18} />
                </div>

                {/* DESTINATION PIN */}
                <div className="map-pin-point destination-pin" title="Your Delivery Address">
                  <div className="dest-pulse" />
                  <MapPin size={18} />
                  <div className="pin-tooltip user-tooltip">Your Address</div>
                </div>

                {/* ROUTE CONNECTING LINE (SVG) */}
                <svg className="map-svg-overlay">
                  <path
                    d="M 60 70 Q 140 120 220 180"
                    fill="none"
                    stroke="#0a6c74"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                  />
                  <path
                    d="M 220 180 Q 280 220 320 250"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              <div className="map-footer-note">
                <MapPin size={13} />
                <span>Destination: Flat 402, Apex Green Apartments, Sector 14</span>
              </div>
            </div>

            {/* COURIER CONTACT CARD */}
            <div className="courier-card">
              <div className="courier-profile">
                <div className="courier-avatar">
                  <Bike size={22} />
                </div>
                <div>
                  <h4 className="courier-name">Ramesh Patel</h4>
                  <p className="courier-badge">OneBasket Verified Fleet • 4.9 ★ (1,420 Drops)</p>
                </div>
              </div>

              <div className="courier-actions">
                <a href="tel:+919876543210" className="btn-call-courier">
                  <Phone size={15} />
                  Call Courier
                </a>
              </div>
            </div>

            {/* NEED HELP */}
            <div className="support-help-card">
              <div>
                <strong>Need Help with Order?</strong>
                <p>24/7 Hyperlocal Support & Emergency Pharmacist Helpline available.</p>
              </div>
              <Link to="/ask" className="btn-support-link">
                Ask Assistant
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
