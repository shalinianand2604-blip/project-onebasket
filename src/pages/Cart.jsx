import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Cart.css";

import { useCart } from "./CartContext";


function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();


  /* ================================
     SUBTOTAL
  ================================= */

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );


  /* ================================
     DELIVERY
  ================================= */

  const deliveryFee =
    subtotal === 0
      ? 0
      : subtotal >= 499
      ? 0
      : 40;


  /* ================================
     TOTAL
  ================================= */

  const total =
    subtotal + deliveryFee;


  /* ================================
     TOTAL QUANTITY
  ================================= */

  const totalQuantity = cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 1),
    0
  );


  /* ================================
     EMPTY CART
  ================================= */

  if (cart.length === 0) {

    return (

      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">

            <ShoppingCart size={36} />

          </div>


          <h1>
            Your cart is empty
          </h1>


          <p>
            Add medicines or groceries
            to your cart and they will
            appear here.
          </p>


          <Link to="/medicines">

            Start Shopping

            <ArrowRight size={16} />

          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="cart-page">

      <div className="cart-container">


        {/* ================= HEADER ================= */}

        <div className="cart-heading">

          <div>

            <p>
              YOUR SHOPPING CART
            </p>

            <h1>
              Your Cart
            </h1>

          </div>


          <span>

            {totalQuantity}{" "}

            {totalQuantity === 1
              ? "item"
              : "items"}

          </span>

        </div>


        <div className="cart-layout">


          {/* ================= PRODUCTS ================= */}

          <section className="cart-products">


            {/* LOCATION */}

            <div className="delivery-location">

              <MapPin size={18} />

              <div>

                <small>
                  Delivering to
                </small>

                <strong>
                  Select your location
                </strong>

              </div>

            </div>


            {/* CART ITEMS */}

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >


                {/* PRODUCT ICON */}

                <div className="cart-product-icon">

                  {item.icon || "🛍️"}

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="cart-product-info">

                  <span>
                    {item.category ||
                      "Product"}
                  </span>


                  <h3>
                    {item.name}
                  </h3>


                  {item.description && (

                    <small>
                      {item.description}
                    </small>

                  )}


                  {item.store && (

                    <small>
                      Available from{" "}
                      {item.store}
                    </small>

                  )}


                  <strong>
                    ₹{item.price || 0}
                  </strong>

                </div>


                {/* QUANTITY + REMOVE */}

                <div className="cart-item-actions">


                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                      aria-label="Decrease quantity"
                    >

                      <Minus size={14} />

                    </button>


                    <span>
                      {item.quantity || 1}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                      aria-label="Increase quantity"
                    >

                      <Plus size={14} />

                    </button>

                  </div>


                  {/* REMOVE */}

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                    aria-label="Remove item"
                  >

                    <Trash2 size={15} />

                  </button>

                </div>


                {/* ITEM TOTAL */}

                <div className="cart-item-total">

                  ₹
                  {Number(item.price || 0) *
                    Number(
                      item.quantity || 1
                    )}

                </div>

              </div>

            ))}


            {/* CONTINUE SHOPPING */}

            <Link
              to="/grocery"
              className="continue-shopping"
            >

              ← Continue Shopping

            </Link>


          </section>


          {/* ================= SUMMARY ================= */}

          <aside className="cart-summary">

            <h2>
              Order Summary
            </h2>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>

                {deliveryFee === 0
                  ? "FREE"
                  : `₹${deliveryFee}`}

              </strong>

            </div>


            {subtotal > 0 &&
              subtotal < 499 && (

              <small className="delivery-note">

                Add ₹
                {499 - subtotal}
                {" "}
                more for FREE delivery

              </small>

            )}


            <div className="summary-divider" />


            <div className="total-row">

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>


            {/* ================================
                PROCEED TO CHECKOUT
            ================================= */}

            <button
              type="button"
              className="checkout-button"
              onClick={() =>
                navigate("/checkout")
              }
            >

              Proceed to Checkout

              <ArrowRight size={17} />

            </button>


            <div className="secure-checkout">

              <ShieldCheck size={15} />

              Safe and secure checkout

            </div>


          </aside>


        </div>

      </div>

    </div>

  );

}


export default Cart;