import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { useCart } from "./CartContext";
import { useUser } from "./UserContext";

import "./Checkout.css";


function Checkout() {

  const navigate = useNavigate();


  /* ================================
     CART CONTEXT
  ================================= */

  const {
    cart,
    clearCart,
  } = useCart();


  /* ================================
     USER CONTEXT
  ================================= */

  const {
    user,
    addOrder,
  } = useUser();


  /* ================================
     USER DETAILS
  ================================= */

  const savedName =
    user?.name ||
    localStorage.getItem("onebasketUserName") ||
    "";

  const savedEmail =
    user?.email ||
    localStorage.getItem("onebasketUserEmail") ||
    "";


  /* ================================
     FORM
  ================================= */

  const [name, setName] =
    useState(savedName);

  const [phone, setPhone] =
    useState(
      user?.phone ||
      localStorage.getItem(
        "onebasketUserPhone"
      ) ||
      ""
    );

  const [address, setAddress] =
    useState(
      localStorage.getItem(
        "onebasketUserAddress"
      ) || ""
    );

  const [city, setCity] =
    useState(
      localStorage.getItem(
        "onebasketUserCity"
      ) || ""
    );

  const [pincode, setPincode] =
    useState(
      localStorage.getItem(
        "onebasketUserPincode"
      ) || ""
    );

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [error, setError] =
    useState("");

  const [orderPlaced, setOrderPlaced] =
    useState(false);


  /* ================================
     TOTALS
  ================================= */

  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
      0
    );


  const deliveryFee =
    subtotal === 0
      ? 0
      : subtotal >= 499
      ? 0
      : 40;


  const total =
    subtotal + deliveryFee;


  /* ================================
     PLACE ORDER
  ================================= */

  const handlePlaceOrder = (event) => {

    event.preventDefault();

    setError("");


    /* NAME */

    if (!name.trim()) {

      setError(
        "Please enter your name."
      );

      return;
    }


    /* PHONE */

    if (!phone.trim()) {

      setError(
        "Please enter your phone number."
      );

      return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }


    /* ADDRESS */

    if (!address.trim()) {

      setError(
        "Please enter your delivery address."
      );

      return;
    }


    /* CITY */

    if (!city.trim()) {

      setError(
        "Please enter your city."
      );

      return;
    }


    /* PINCODE */

    if (!/^[0-9]{6}$/.test(pincode)) {

      setError(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }


    /* CART */

    if (cart.length === 0) {

      setError(
        "Your cart is empty."
      );

      return;
    }


    /* ================================
       SAVE USER DETAILS
    ================================= */

    localStorage.setItem(
      "onebasketUserName",
      name
    );

    localStorage.setItem(
      "onebasketUserEmail",
      savedEmail
    );

    localStorage.setItem(
      "onebasketUserPhone",
      phone
    );

    localStorage.setItem(
      "onebasketUserAddress",
      address
    );

    localStorage.setItem(
      "onebasketUserCity",
      city
    );

    localStorage.setItem(
      "onebasketUserPincode",
      pincode
    );


    /* ================================
       CREATE ORDER
    ================================= */

    const order = {

      id:
        "OB" +
        Date.now(),

      date:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      name,

      email: savedEmail,

      phone,

      address,

      city,

      pincode,

      paymentMethod,

      items: [...cart],

      subtotal,

      deliveryFee,

      total,

      status: "Placed",

    };


    /* ================================
       SAVE TO USER CONTEXT
    ================================= */

    addOrder(order);


    /* ================================
       ALSO SAVE TO LOCAL STORAGE
    ================================= */

    const existingOrders =
      JSON.parse(
        localStorage.getItem(
          "onebasketOrders"
        ) || "[]"
      );


    localStorage.setItem(
      "onebasketOrders",
      JSON.stringify([
        order,
        ...existingOrders,
      ])
    );


    /* ================================
       CLEAR CART
    ================================= */

    clearCart();


    /* ================================
       SUCCESS
    ================================= */

    setOrderPlaced(true);

  };


  /* ================================
     SUCCESS PAGE
  ================================= */

  if (orderPlaced) {

    return (

      <div className="checkout-page">

        <div className="order-success">

          <div className="success-icon">

            <CheckCircle
              size={55}
            />

          </div>


          <p className="success-label">
            ORDER CONFIRMED
          </p>


          <h1>
            Order placed successfully! 🎉
          </h1>


          <p>

            Thank you, {name}.
            Your OneBasket order has
            been placed successfully.

          </p>


          <div className="success-actions">

            <button
              type="button"
              onClick={() =>
                navigate("/account")
              }
            >

              View My Account

            </button>


            <button
              type="button"
              className="secondary-success"
              onClick={() =>
                navigate("/medicines")
              }
            >

              Continue Shopping

            </button>

          </div>

        </div>

      </div>

    );

  }


  /* ================================
     EMPTY CART
  ================================= */

  if (cart.length === 0) {

    return (

      <div className="checkout-page">

        <div className="checkout-empty">

          <ShoppingBag
            size={50}
          />

          <h1>
            Your cart is empty
          </h1>

          <p>
            Add products before
            proceeding to checkout.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/medicines")
            }
          >

            Start Shopping

          </button>

        </div>

      </div>

    );

  }


  /* ================================
     CHECKOUT PAGE
  ================================= */

  return (

    <div className="checkout-page">

      <div className="checkout-container">


        {/* HEADER */}

        <div className="checkout-header">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/cart")
            }
          >

            <ArrowLeft size={18} />

            Back to Cart

          </button>


          <div>

            <p>
              SECURE CHECKOUT
            </p>

            <h1>
              Complete Your Order
            </h1>

          </div>

        </div>


        <form
          className="checkout-layout"
          onSubmit={handlePlaceOrder}
        >


          {/* ============================
              LEFT SIDE
          ============================ */}

          <div className="checkout-main">


            {/* DELIVERY DETAILS */}

            <section className="checkout-card">

              <div className="checkout-card-heading">

                <div className="checkout-section-icon">

                  <MapPin size={21} />

                </div>

                <div>

                  <h2>
                    Delivery Details
                  </h2>

                  <p>
                    Where should we deliver your order?
                  </p>

                </div>

              </div>


              <div className="checkout-form-grid">


                {/* NAME */}

                <div className="checkout-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                  />

                </div>


                {/* PHONE */}

                <div className="checkout-field">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    maxLength="10"
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="10-digit mobile number"
                  />

                </div>


                {/* EMAIL */}

                <div className="checkout-field full-width">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={savedEmail}
                    readOnly
                    placeholder="Your email"
                  />

                </div>


                {/* ADDRESS */}

                <div className="checkout-field full-width">

                  <label>
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(event) =>
                      setAddress(
                        event.target.value
                      )
                    }
                    placeholder="House / Door No, Street, Area"
                    rows="3"
                  />

                </div>


                {/* CITY */}

                <div className="checkout-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    value={city}
                    onChange={(event) =>
                      setCity(
                        event.target.value
                      )
                    }
                    placeholder="Enter city"
                  />

                </div>


                {/* PINCODE */}

                <div className="checkout-field">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    maxLength="6"
                    value={pincode}
                    onChange={(event) =>
                      setPincode(
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="6-digit pincode"
                  />

                </div>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="checkout-card">

              <div className="checkout-card-heading">

                <div className="checkout-section-icon">

                  <CreditCard size={21} />

                </div>

                <div>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Choose how you want to pay.
                  </p>

                </div>

              </div>


              <div className="payment-options">


                {/* COD */}

                <label
                  className={
                    paymentMethod === "cod"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === "cod"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "cod"
                      )
                    }
                  />

                  <Wallet size={21} />

                  <div>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                </label>


                {/* UPI */}

                <label
                  className={
                    paymentMethod === "upi"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={
                      paymentMethod === "upi"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "upi"
                      )
                    }
                  />

                  <Smartphone size={21} />

                  <div>

                    <strong>
                      UPI
                    </strong>

                    <span>
                      Google Pay, PhonePe, Paytm
                    </span>

                  </div>

                </label>


                {/* CARD */}

                <label
                  className={
                    paymentMethod === "card"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={
                      paymentMethod === "card"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "card"
                      )
                    }
                  />

                  <CreditCard size={21} />

                  <div>

                    <strong>
                      Credit / Debit Card
                    </strong>

                    <span>
                      Secure card payment
                    </span>

                  </div>

                </label>

              </div>

            </section>


            {/* ERROR */}

            {error && (

              <div className="checkout-error">

                {error}

              </div>

            )}

          </div>


          {/* ============================
              RIGHT SIDE
          ============================ */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>


            {/* PRODUCTS */}

            <div className="checkout-products">

              {cart.map((item) => (

                <div
                  className="checkout-product"
                  key={item.id}
                >

                  <div className="checkout-product-icon">

                    {item.icon ||
                      "🛍️"}

                  </div>

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.quantity || 1}
                      {" × "}
                      ₹{item.price}
                    </span>

                  </div>

                  <b>
                    ₹
                    {(
                      Number(
                        item.price
                      ) || 0
                    ) *
                      (
                        Number(
                          item.quantity
                        ) || 1
                      )}
                  </b>

                </div>

              ))}

            </div>


            {/* SUBTOTAL */}

            <div className="checkout-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>


            {/* DELIVERY */}

            <div className="checkout-summary-row">

              <span>
                Delivery
              </span>

              <strong>

                {deliveryFee === 0
                  ? "FREE"
                  : `₹${deliveryFee}`}

              </strong>

            </div>


            <div className="checkout-summary-divider" />


            {/* TOTAL */}

            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>


            {/* PLACE ORDER */}

            <button
              type="submit"
              className="place-order-button"
            >

              Place Order

              <ArrowRight size={18} />

            </button>


            <div className="checkout-security">

              <ShieldCheck size={17} />

              <span>
                Your information is secure
              </span>

            </div>

          </aside>

        </form>

      </div>

    </div>

  );

}


export default Checkout;