import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useWishlist } from "./WishListContext";
import { useCart } from "./CartContext";

import "./Wishlist.css";


function Wishlist() {

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();


  const {
    addToCart,
  } = useCart();

  const handleAddToCart = (product) => {

    addToCart(product);

    alert(
      `${product.name} added to cart 🛒`
    );

  };
if (wishlistItems.length === 0) {

    return (

      <div className="wishlist-page">

        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">

            <Heart size={38} />

          </div>


          <h1>
            Your Wishlist is Empty
          </h1>


          <p>
            Save medicines and groceries
            you love by tapping the heart icon.
          </p>


          <div className="empty-wishlist-buttons">

            <Link to="/medicines">
              Explore Medicines
            </Link>


            <Link to="/grocery">
              Explore Groceries
            </Link>

          </div>

        </div>

      </div>

    );

  }
  return (

    <div className="wishlist-page">

      <div className="wishlist-container">

        <div className="wishlist-header">

          <div>

            <p>
              SAVED FOR LATER
            </p>


            <h1>
              My Wishlist ❤️
            </h1>


            <span>

              {wishlistItems.length} saved product

              {wishlistItems.length > 1
                ? "s"
                : ""}

            </span>

          </div>


          <div className="wishlist-heart">

            <Heart size={25} />

          </div>

        </div>
        <div className="wishlist-grid">

          {wishlistItems.map((product) => (

            <div
              className="wishlist-card"
              key={product.id}
            >
             <button
                type="button"
                className="wishlist-remove"
                onClick={() =>
                  removeFromWishlist(
                    product.id
                  )
                }
                aria-label="Remove from wishlist"
              >

                <Heart
                  size={18}
                  fill="currentColor"
                />

              </button>
               <div className="wishlist-product-icon">

                {product.icon || "🛍️"}

              </div>
                 <p className="wishlist-category">

                {product.category || "Product"}

              </p>
              <h2>
                {product.name}
              </h2>
              {product.quantity && (

                <p className="wishlist-quantity">

                  {product.quantity}

                </p>

              )}

              <div className="wishlist-price-row">

                <strong>
                  ₹{product.price}
                </strong>


                {product.originalPrice &&
                  product.originalPrice >
                    product.price && (

                  <span>
                    ₹{product.originalPrice}
                  </span>

                )}

              </div>

              <div className="wishlist-details">


                {product.rating && (

                  <span className="wishlist-rating">

                    <Star size={13} />

                    {product.rating}

                  </span>

                )}


                {product.delivery && (

                  <span>

                    <Clock size={13} />

                    {product.delivery}

                  </span>

                )}

              </div>

              <div className="wishlist-availability">

                <CheckCircle size={14} />

                <span>

                  {product.available === false
                    ? "Currently unavailable"
                    : "Available near you"}

                </span>

              </div>
              <div className="wishlist-actions">

                <button
                  type="button"
                  className="wishlist-cart-button"
                  onClick={() =>
                    handleAddToCart(
                      product
                    )
                  }
                  disabled={
                    product.available === false
                  }
                >

                  <ShoppingCart size={16} />

                  {product.available === false
                    ? "Unavailable"
                    : "Add to Cart"}

                </button>

                <button
                  type="button"
                  className="wishlist-delete-button"
                  onClick={() =>
                    removeFromWishlist(
                      product.id
                    )
                  }
                  aria-label="Delete"
                >

                  <Trash2 size={15} />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}


export default Wishlist;