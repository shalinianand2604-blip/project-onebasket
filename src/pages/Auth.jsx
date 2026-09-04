// ==========================================================================
// FILE: src/pages/Auth.jsx
// COMPONENT: Auth (Role-Based Authentication: Customer vs Local Vendor)
// ==========================================================================

import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  User,
  Store,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useUser } from "./UserContext";
import "./Auth.css";

/*
  AI Image Prompt (Auth Page Hero Visual):
  "Minimalist clinical illustration of a secure digital identity verification badge linking a patient profile and a certified licensed pharmacist seal, clean light teal background with soft lighting."
*/

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, activeRole, switchRole } = useUser();

  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState("login");
  // Target Role: 'customer' | 'vendor'
  const [selectedRole, setSelectedRole] = useState(activeRole || "customer");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [gstin, setGstin] = useState("");

  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in your email and password.");
      return;
    }

    if (selectedRole === "vendor" && authMode === "register" && !shopName) {
      setErrorMsg("Please enter your registered shop name.");
      return;
    }

    setErrorMsg("");
    setAuthSuccess(true);

    const loggedUser = loginUser({
      email,
      name: fullName || email.split("@")[0],
      role: selectedRole,
      shopName: shopName,
    });

    setTimeout(() => {
      if (selectedRole === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate(location.state?.from || "/");
      }
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-card-container">
        {/* TOP BRANDING */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <ShieldCheck size={28} />
          </div>
          <h1 className="auth-title">
            {authMode === "login" ? "Welcome Back to OneBasket" : "Create OneBasket Account"}
          </h1>
          <p className="auth-subtitle">
            Hyperlocal access to certified neighborhood pharmacies and organic grocery stores.
          </p>
        </div>

        {/* ROLE SELECTOR TABS */}
        <div className="auth-role-selector" aria-label="Select Account Type">
          <button
            type="button"
            className={`role-tab-btn ${selectedRole === "customer" ? "active" : ""}`}
            onClick={() => setSelectedRole("customer")}
          >
            <User size={16} />
            <span>Customer Portal</span>
          </button>
          <button
            type="button"
            className={`role-tab-btn ${selectedRole === "vendor" ? "active" : ""}`}
            onClick={() => setSelectedRole("vendor")}
          >
            <Store size={16} />
            <span>Local Vendor Portal</span>
          </button>
        </div>

        {authSuccess ? (
          <div className="auth-success-state">
            <CheckCircle2 size={52} className="auth-success-icon" />
            <h3>Authenticated Successfully!</h3>
            <p>
              Signed in as <strong>{selectedRole === "vendor" ? "Store Owner" : "Customer"}</strong>.
              Redirecting...
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {errorMsg && <div className="auth-error-alert">{errorMsg}</div>}

            {/* REGISTER EXTRA FIELDS */}
            {authMode === "register" && (
              <>
                <div className="auth-field">
                  <label>Full Name</label>
                  <div className="input-icon-wrap">
                    <User size={16} className="field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Shalini Anand"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label>Mobile Number</label>
                  <div className="input-icon-wrap">
                    <Phone size={16} className="field-icon" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                {/* VENDOR SPECIFIC FIELDS */}
                {selectedRole === "vendor" && (
                  <>
                    <div className="auth-field">
                      <label>Registered Store / Pharmacy Name</label>
                      <div className="input-icon-wrap">
                        <Store size={16} className="field-icon" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sanjeevani Local Chemist"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-field">
                      <label>Drug License No / FSSAI Registration</label>
                      <div className="input-icon-wrap">
                        <FileText size={16} className="field-icon" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. DL-SANJ-1192-291"
                          value={licenseNo}
                          onChange={(e) => setLicenseNo(e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* COMMON FIELDS: EMAIL & PASSWORD */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className="input-icon-wrap">
                <Mail size={16} className="field-icon" />
                <input
                  type="email"
                  required
                  placeholder={selectedRole === "vendor" ? "store@chemist.in" : "you@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="input-icon-wrap">
                <Lock size={16} className="field-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit">
              {authMode === "login"
                ? `Sign In as ${selectedRole === "vendor" ? "Store Partner" : "Customer"}`
                : "Complete Registration"}
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* FOOTER SWITCHER */}
        <div className="auth-footer-toggle">
          {authMode === "login" ? (
            <span>
              Don't have an account yet?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => setAuthMode("register")}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already registered?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => setAuthMode("login")}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
