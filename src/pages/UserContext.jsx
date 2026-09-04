// ==========================================================================
// FILE: src/pages/UserContext.jsx
// CONTEXT: UserContext (Multi-Role Auth: Customer & Local Vendor Support)
// ==========================================================================

import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const defaultCustomer = {
  id: "usr-cust-001",
  name: "Dr. Shalini Anand",
  email: "shalini.anand@medcare.org",
  phone: "+91 98765 43210",
  role: "customer", // 'customer' | 'vendor'
  location: {
    city: "New Delhi",
    state: "Delhi",
    area: "Sector 14, Urban Estate",
    pincode: "110078",
  },
  addresses: [
    {
      id: 1,
      type: "Home",
      line1: "Flat 402, Apex Green Apartments",
      area: "Sector 14, Urban Estate",
      city: "New Delhi",
      pincode: "110078",
      isDefault: true,
    },
    {
      id: 2,
      type: "Clinic / Office",
      line1: "City Diagnostic Care Centre, Main Road",
      area: "Sector 15 Market",
      city: "New Delhi",
      pincode: "110079",
      isDefault: false,
    },
  ],
  payments: [
    { id: 1, type: "UPI", handle: "shalini@oksbi", isDefault: true },
    { id: 2, type: "Card", label: "HDFC Regalia •••• 4291", isDefault: false },
  ],
  orders: [],
  notifications: [
    {
      id: "notif-1",
      title: "Smart Split Order Placed",
      message: "Order #OB-882103 dispatched from Jan Aushadhi & Sharma Mart.",
      timestamp: "10 mins ago",
      read: false,
    },
  ],
  scanHistory: [],
  settings: {
    notifications: true,
    priceAlerts: true,
    genericAlternativesFirst: true,
  },
};

const defaultVendor = {
  id: "v-med-03",
  name: "Rajesh Kumar (Store Manager)",
  shopName: "Sanjeevani Local Chemist & Generic Hub",
  email: "contact@sanjeevanimeds.in",
  phone: "+91 98112 34503",
  role: "vendor",
  licenseNo: "DL-SANJ-1192-291",
  gstin: "07AAAAA0000A1Z5",
  type: "pharmacy",
  category: "Prescription & Generic Medicines",
  rating: 4.8,
  verified: true,
  distanceKm: 0.4,
  location: {
    address: "Corner Store, Pocket 1, Sector 14",
    city: "New Delhi",
    pincode: "110078",
  },
};

export function UserProvider({ children }) {
  // Active role: 'customer' or 'vendor'
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem("onebasketActiveRole") || "customer";
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("onebasketUser");
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      return defaultCustomer;
    } catch (e) {
      console.error("Failed to load user:", e);
      return defaultCustomer;
    }
  });

  const [vendorProfile, setVendorProfile] = useState(() => {
    try {
      const savedVendor = localStorage.getItem("onebasketVendor");
      if (savedVendor) {
        return JSON.parse(savedVendor);
      }
      return defaultVendor;
    } catch (e) {
      return defaultVendor;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("onebasketActiveRole", activeRole);
  }, [activeRole]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("onebasketUser", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (vendorProfile) {
      localStorage.setItem("onebasketVendor", JSON.stringify(vendorProfile));
    }
  }, [vendorProfile]);

  // Role switching
  const switchRole = (newRole) => {
    if (newRole === "vendor" || newRole === "customer") {
      setActiveRole(newRole);
    }
  };

  // Login handler supporting roles
  const loginUser = ({ email, name, role = "customer", shopName = "" }) => {
    if (role === "vendor") {
      const newVendor = {
        ...defaultVendor,
        name: name || "Store Partner",
        shopName: shopName || "Neighborhood Pharmacy & Grocery",
        email: email || "vendor@onebasket.in",
        role: "vendor",
      };
      setVendorProfile(newVendor);
      setActiveRole("vendor");
      return newVendor;
    } else {
      const newCustomer = {
        ...defaultCustomer,
        name: name || email?.split("@")[0] || "OneBasket Customer",
        email: email || "",
        role: "customer",
      };
      setUser(newCustomer);
      setActiveRole("customer");
      return newCustomer;
    }
  };

  const registerUser = (userData) => {
    return loginUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("onebasketUser");
    localStorage.removeItem("onebasketLoggedIn");
  };

  const updateProfile = (updates) => {
    if (activeRole === "vendor") {
      setVendorProfile((prev) => ({ ...prev, ...updates }));
    } else {
      setUser((prev) => ({ ...prev, ...updates }));
    }
  };

  const addOrder = (order) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: [
          {
            id: order.orderId || "OB-" + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toISOString(),
            status: "Confirmed",
            ...order,
          },
          ...(prev.orders || []),
        ],
      };
    });
  };

  const updateLocation = (loc) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        location: {
          ...prev.location,
          ...loc,
        },
      };
    });
  };

  const value = {
    user,
    vendorProfile,
    activeRole,
    switchRole,
    isVendor: activeRole === "vendor",
    isCustomer: activeRole === "customer",
    isLoggedIn: Boolean(user),
    loginUser,
    registerUser,
    logoutUser,
    updateProfile,
    updateLocation,
    addOrder,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}