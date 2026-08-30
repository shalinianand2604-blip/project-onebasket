import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


// =========================================================
// USER CONTEXT
// =========================================================

const UserContext = createContext(null);


// =========================================================
// DEFAULT USER DATA
// =========================================================

const emptyUser = {
  name: "",
  email: "",
  phone: "",

  // Shared delivery location
  location: {
    city: "",
    state: "",
  },

  addresses: [],

  payments: [],

  orders: [],

  notifications: [],

  scanHistory: [],

  settings: {
    notifications: true,
    priceAlerts: true,
  },
};


// =========================================================
// PROVIDER
// =========================================================

export function UserProvider({ children }) {

  const [user, setUser] = useState(() => {

    try {

      const savedUser =
        localStorage.getItem("onebasketUser");

      if (savedUser) {

        const parsedUser =
          JSON.parse(savedUser);

        // Make sure older saved users also
        // get the new location property
        return {
          ...emptyUser,
          ...parsedUser,

          location: {
            ...emptyUser.location,
            ...(parsedUser.location || {}),
          },

          settings: {
            ...emptyUser.settings,
            ...(parsedUser.settings || {}),
          },

          addresses:
            parsedUser.addresses || [],

          payments:
            parsedUser.payments || [],

          orders:
            parsedUser.orders || [],

          notifications:
            parsedUser.notifications || [],

          scanHistory:
            parsedUser.scanHistory || [],
        };

      }

      return null;

    } catch (error) {

      console.error(
        "Unable to load OneBasket user:",
        error
      );

      return null;

    }

  });


  // =======================================================
  // SAVE USER AUTOMATICALLY
  // =======================================================

  useEffect(() => {

    if (user) {

      localStorage.setItem(
        "onebasketUser",
        JSON.stringify(user)
      );

    } else {

      localStorage.removeItem(
        "onebasketUser"
      );

    }

  }, [user]);


  // =======================================================
  // REGISTER USER
  // =======================================================

  const registerUser = ({
    name,
    email,
    phone = "",
  }) => {

    const newUser = {

      ...emptyUser,

      name: name.trim(),

      email: email.trim(),

      phone: phone.trim(),

    };


    setUser(newUser);


    localStorage.setItem(
      "onebasketLoggedIn",
      "true"
    );

    localStorage.setItem(
      "onebasketUserName",
      newUser.name
    );


    return newUser;

  };


  // =======================================================
  // LOGIN USER
  // =======================================================

  const loginUser = ({
    name,
    email,
    phone = "",
  }) => {

    const existingUser =
      user || {

        ...emptyUser,

        name:
          name?.trim() ||
          email
            ?.split("@")[0]
            ?.replace(/[._-]/g, " ") ||
          "OneBasket User",

        email:
          email?.trim() || "",

        phone:
          phone?.trim() || "",

      };


    setUser(existingUser);


    localStorage.setItem(
      "onebasketLoggedIn",
      "true"
    );

    localStorage.setItem(
      "onebasketUserName",
      existingUser.name
    );


    return existingUser;

  };


  // =======================================================
  // UPDATE PROFILE
  // =======================================================

  const updateProfile = (updates) => {

    setUser((currentUser) => {

      if (!currentUser) {
        return currentUser;
      }


      const updatedUser = {

        ...currentUser,

        ...updates,

      };


      localStorage.setItem(
        "onebasketUserName",
        updatedUser.name
      );


      return updatedUser;

    });

  };


  // =======================================================
  // UPDATE DELIVERY LOCATION
  // =======================================================

  const updateLocation = ({
    city = "",
    state = "",
  }) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        location: {

          city: city.trim(),

          state: state.trim(),

        },

      };

    });

  };


  // =======================================================
  // CLEAR DELIVERY LOCATION
  // =======================================================

  const clearLocation = () => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        location: {

          city: "",

          state: "",

        },

      };

    });

  };


  // =======================================================
  // ADD ADDRESS
  // =======================================================

  const addAddress = (address) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        addresses: [

          ...currentUser.addresses,

          {

            id: Date.now(),

            ...address,

          },

        ],

      };

    });

  };


  // =======================================================
  // REMOVE ADDRESS
  // =======================================================

  const removeAddress = (id) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        addresses:
          currentUser.addresses.filter(
            (address) =>
              address.id !== id
          ),

      };

    });

  };


  // =======================================================
  // ADD PAYMENT
  // =======================================================

  const addPayment = (payment) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        payments: [

          ...currentUser.payments,

          {

            id: Date.now(),

            ...payment,

          },

        ],

      };

    });

  };


  // =======================================================
  // ADD ORDER
  // =======================================================

  const addOrder = (order) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        orders: [

          {

            id: Date.now(),

            date:
              new Date().toISOString(),

            status:
              "Placed",

            ...order,

          },

          ...currentUser.orders,

        ],

      };

    });

  };


  // =======================================================
  // ADD SCAN HISTORY
  // =======================================================

  const addScanHistory = (product) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        scanHistory: [

          {

            id: Date.now(),

            date:
              new Date().toISOString(),

            ...product,

          },

          ...currentUser.scanHistory,

        ],

      };

    });

  };


  // =======================================================
  // ADD NOTIFICATION
  // =======================================================

  const addNotification = (notification) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        notifications: [

          {

            id: Date.now(),

            date:
              new Date().toISOString(),

            read: false,

            ...notification,

          },

          ...currentUser.notifications,

        ],

      };

    });

  };


  // =======================================================
  // UPDATE SETTINGS
  // =======================================================

  const updateSettings = (settings) => {

    setUser((currentUser) => {

      if (!currentUser) {

        return currentUser;

      }


      return {

        ...currentUser,

        settings: {

          ...currentUser.settings,

          ...settings,

        },

      };

    });

  };


  // =======================================================
  // LOGOUT
  // =======================================================

  const logoutUser = () => {

    setUser(null);

    localStorage.removeItem(
      "onebasketLoggedIn"
    );

    localStorage.removeItem(
      "onebasketUserName"
    );

    localStorage.removeItem(
      "onebasketUser"
    );

  };


  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {

    // User
    user,

    isLoggedIn: Boolean(user),


    // Authentication
    registerUser,

    loginUser,

    logoutUser,


    // Profile
    updateProfile,


    // Delivery location
    updateLocation,

    clearLocation,


    // Addresses
    addAddress,

    removeAddress,


    // Payments
    addPayment,


    // Orders
    addOrder,


    // Scan
    addScanHistory,


    // Notifications
    addNotification,


    // Settings
    updateSettings,

  };


  return (

    <UserContext.Provider
      value={value}
    >

      {children}

    </UserContext.Provider>

  );

}


// =========================================================
// USE USER
// =========================================================

export function useUser() {

  const context =
    useContext(UserContext);


  if (!context) {

    throw new Error(
      "useUser must be used inside UserProvider"
    );

  }


  return context;

}