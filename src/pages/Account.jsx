import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Package,
  Heart,
  ShoppingCart,
  Wallet,
  RefreshCw,
  ScanLine,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Pencil,
  ChevronRight,
  TrendingDown,
} from "lucide-react";

import { useUser } from "./UserContext";
import { useWishlist } from "./WishListContext";

import "./Account.css";


function Account() {

  const navigate = useNavigate();

  const {
    user,
    isLoggedIn,
    updateProfile,
    logoutUser,
  } = useUser();
const {
  wishlistItems,
} = useWishlist();
  useEffect(() => {

    if (!isLoggedIn) {

      navigate("/login");

    }

  }, [
    isLoggedIn,
    navigate,
  ]);

  const userName =
    user?.name ||
    "OneBasket User";


  const userEmail =
    user?.email ||
    "";


  const userPhone =
    user?.phone ||
    "";

  const orders =
    Array.isArray(user?.orders)
      ? user.orders
      : [];

  const totalSavings =
    orders.reduce(
      (total, order) => {

        if (
          typeof order?.savings ===
          "number"
        ) {

          return (
            total +
            order.savings
          );

        }

        if (
          typeof order?.mrp ===
            "number" &&
          typeof order?.price ===
            "number"
        ) {

          return (
            total +
            Math.max(
              0,
              order.mrp -
                order.price
            )
          );

        }


        return total;

      },
      0
    );
  const getCartItems = () => {

    const possibleKeys = [
      "onebasketCart",
      "cart",
      "oneBasketCart",
    ];


    for (
      const key of possibleKeys
    ) {

      try {

        const saved =
          localStorage.getItem(
            key
          );


        if (saved) {

          const parsed =
            JSON.parse(saved);


          if (
            Array.isArray(parsed)
          ) {

            return parsed;

          }

        }

      } catch (error) {

        console.log(
          "Cart data could not be read."
        );

      }

    }


    return [];

  };


  const cartItems =
    getCartItems();

  const handleEditProfile = () => {

    const newName =
      window.prompt(
        "Enter your name:",
        userName
      );


    if (
      newName === null
    ) {
      return;
    }


    const trimmedName =
      newName.trim();


    if (!trimmedName) {
      return;
    }


    const newPhone =
      window.prompt(
        "Enter your phone number:",
        userPhone
      );


    updateProfile({

      name:
        trimmedName,

      phone:
        newPhone !== null
          ? newPhone.trim()
          : userPhone,

    });

  };

  const handleLogout = () => {

    logoutUser();

    navigate("/login");

  };

  const formatOrderDate = (
    date
  ) => {

    if (!date) {
      return "Recently";
    }


    try {

      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return "Recently";

    }

  };
  const recentOrders =
    orders.slice(0, 3);
  const buyAgainProducts = [];
  orders.forEach(
    (order) => {

      if (
        Array.isArray(
          order?.items
        )
      ) {

        order.items.forEach(
          (item) => {

            const alreadyExists =
              buyAgainProducts.some(
                (product) =>
                  product.id ===
                  item.id
              );


            if (
              !alreadyExists
            ) {

              buyAgainProducts.push(
                item
              );

            }

          }
        );

      }

    }
  );
  if (!isLoggedIn || !user) {

    return null;

  }


  return (

    <div className="account-page">
      <section className="account-welcome">

        <div className="profile-left">

          <div className="profile-avatar">

            <User size={30} />

          </div>


          <div>

            <p className="account-label">

              MY ONEBASKET

            </p>


            <h1>

              Hello, {userName}! 👋

            </h1>


            <span>

              Here's your OneBasket
              shopping dashboard.

            </span>
            <div
              style={{
                marginTop: "8px",
                fontSize: "11px",
                color: "#8a7d82",
              }}
            >

              {userEmail && (
                <span>
                  📧 {userEmail}
                </span>
              )}

              {userPhone && (
                <span
                  style={{
                    marginLeft: "14px",
                  }}
                >
                  📱 {userPhone}
                </span>
              )}

            </div>

          </div>

        </div>


        <button
          type="button"
          className="edit-profile-button"
          onClick={
            handleEditProfile
          }
        >

          <Pencil size={15} />

          Edit Profile

        </button>

      </section>

      <section className="account-stats">


        <Link
          to="/orders"
          className="account-stat-card"
        >

          <div className="stat-icon purple">

            <Package size={21} />

          </div>


          <div>

            <span>
              Orders
            </span>

            <strong>
              {orders.length}
            </strong>

          </div>


          <ChevronRight size={17} />

        </Link>

        <Link
          to="/wishlist"
          className="account-stat-card"
        >

          <div className="stat-icon pink">

            <Heart size={21} />

          </div>


          <div>

            <span>
              Wishlist
            </span>

            <strong>
              {wishlistItems.length}
            </strong>

          </div>


          <ChevronRight size={17} />

        </Link>


        {/* SAVINGS */}

        <div className="account-stat-card">

          <div className="stat-icon green">

            <Wallet size={21} />

          </div>


          <div>

            <span>
              Total Savings
            </span>

            <strong>
              ₹{totalSavings}
            </strong>

          </div>


          <TrendingDown size={17} />

        </div>


        {/* CART */}

        <Link
          to="/cart"
          className="account-stat-card"
        >

          <div className="stat-icon yellow">

            <ShoppingCart size={21} />

          </div>


          <div>

            <span>
              Cart Items
            </span>

            <strong>
              {cartItems.length}
            </strong>

          </div>


          <ChevronRight size={17} />

        </Link>

      </section>
      <section className="account-dashboard">
        <div className="dashboard-card orders-card">


          <div className="dashboard-title">

            <div>

              <p>
                RECENT ACTIVITY
              </p>

              <h2>
                Recent Orders
              </h2>

            </div>


            {orders.length > 0 && (

              <Link to="/orders">
                View All
              </Link>

            )}

          </div>


          {recentOrders.length === 0 ? (

            <div
              style={{
                padding: "40px 15px",
                textAlign: "center",
              }}
            >

              <div
                style={{
                  fontSize: "35px",
                  marginBottom: "10px",
                }}
              >
                📦
              </div>


              <h3
                style={{
                  margin: "0 0 6px",
                }}
              >
                No orders yet
              </h3>


              <p
                style={{
                  margin: "0",
                  color: "#8a7d82",
                  fontSize: "11px",
                }}
              >
                Your completed orders
                will appear here.
              </p>


              <Link
                to="/medicines"
                style={{
                  display: "inline-block",
                  marginTop: "15px",
                  color: "#5b3a8e",
                  fontWeight: "800",
                  fontSize: "11px",
                  textDecoration: "none",
                }}
              >
                Start Shopping →
              </Link>

            </div>

          ) : (

            recentOrders.map(
              (order, index) => (

                <div
                  className="order-item"
                  key={
                    order.id ||
                    index
                  }
                >

                  <div className="order-product-icon medicine">

                    {order.icon ||
                      "📦"}

                  </div>


                  <div className="order-details">

                    <strong>

                      {order.name ||
                        order.items?.[0]?.name ||
                        "OneBasket Order"}

                    </strong>


                    <span>

                      Order #
                      {order.id ||
                        "OB" +
                        (index + 1)}

                      {" • "}

                      {formatOrderDate(
                        order.date
                      )}

                    </span>

                  </div>


                  <div className="order-right">

                    <strong>

                      ₹
                      {order.total ||
                        order.price ||
                        0}

                    </strong>


                    <span className="delivered">

                      {order.status ||
                        "Placed"}

                    </span>

                  </div>

                </div>

              )
            )

          )}

        </div>
        <div className="dashboard-card savings-card">


          <div className="savings-icon">

            <Wallet size={24} />

          </div>


          <p>
            YOUR ONEBASKET SAVINGS
          </p>


          <h2>
            ₹{totalSavings}
          </h2>


          <span>
            saved by comparing prices
          </span>


          <div className="savings-progress">

            <div className="progress-bar">

              <div
                style={{
                  width:
                    totalSavings > 0
                      ? "70%"
                      : "0%",
                }}
              />

            </div>


            <span>

              {totalSavings > 0
                ? "Great job! 🎉"
                : "Start comparing prices!"}

            </span>

          </div>


          <div className="saving-message">

            <TrendingDown size={16} />

            {totalSavings > 0
              ? "You're choosing better prices than average shoppers."
              : "Compare products to start saving money."}

          </div>

        </div>

      </section>

      <section className="quick-actions-section">

        <div className="section-heading">

          <p>
            SMART SHOPPING
          </p>

          <h2>
            Shop smarter
          </h2>

        </div>

        <div className="quick-actions">

          <Link
            to="/scan"
            className="quick-action"
          >

            <ScanLine size={21} />

            <div>

              <strong>
                Scan Product
              </strong>

              <span>
                Scan a medicine or grocery
                to find better prices
              </span>

            </div>

            <ChevronRight size={16} />

          </Link>

        </div>

      </section>


      <section className="buy-again-card">


        <div className="dashboard-title">

          <div>

            <p>
              SHOPPING MADE EASY
            </p>

            <h2>
              Buy Again 🔄
            </h2>

          </div>


          <RefreshCw size={20} />

        </div>


        {buyAgainProducts.length === 0 ? (

          <div
            style={{
              padding: "30px",
              textAlign: "center",
            }}
          >

            <div
              style={{
                fontSize: "30px",
              }}
            >
              🔄
            </div>


            <h3>
              Buy Again will appear here
            </h3>


            <p
              style={{
                color: "#8a7d82",
                fontSize: "11px",
              }}
            >
              Products from your previous
              orders will be available here.
            </p>

          </div>

        ) : (

          <div className="buy-again-items">

            {buyAgainProducts
              .slice(0, 4)
              .map(
                (product, index) => (

                  <div
                    className="buy-item"
                    key={
                      product.id ||
                      index
                    }
                  >

                    <div className="buy-image">

                      {product.icon ||
                        "🛒"}

                    </div>


                    <strong>

                      {product.name ||
                        "Product"}

                    </strong>


                    <span>

                      Best price ₹
                      {product.price ||
                        0}

                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/cart"
                        )
                      }
                    >
                      Buy Again
                    </button>

                  </div>

                )
              )}

          </div>

        )}

      </section>

      <section className="account-settings">

        <Link
          to="/addresses"
          className="setting-item"
        >

          <MapPin size={19} />

          <div>

            <strong>
              Saved Addresses
            </strong>

            <span>
              Manage your delivery addresses
            </span>

          </div>


          <ChevronRight size={17} />

        </Link>
        <Link
          to="/payments"
          className="setting-item"
        >

          <CreditCard size={19} />

          <div>

            <strong>
              Payment Methods
            </strong>

            <span>
              Manage your payment options
            </span>

          </div>


          <ChevronRight size={17} />

        </Link>

        <Link
          to="/notifications"
          className="setting-item"
        >

          <Bell size={19} />

          <div>

            <strong>
              Notifications
            </strong>

            <span>
              Manage alerts and updates
            </span>

          </div>


          <ChevronRight size={17} />

        </Link>


        {/* SETTINGS */}

        <Link
          to="/settings"
          className="setting-item"
        >

          <Settings size={19} />

          <div>

            <strong>
              Settings
            </strong>

            <span>
              Manage your OneBasket preferences
            </span>

          </div>


          <ChevronRight size={17} />

        </Link>


        {/* LOGOUT */}

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >

          <LogOut size={19} />

          Logout

        </button>


      </section>

    </div>

  );
}


export default Account;