import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishListContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem("onebasketWishlist");

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return [];
    }
  });

  /* =========================================================
     SAVE TO LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "onebasketWishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  /* =========================================================
     ADD
  ========================================================= */

  const addToWishlist = (product) => {
    if (!product || product.id == null) {
      console.log("Invalid wishlist product:", product);
      return;
    }

    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (exists) {
        return currentItems;
      }

      return [...currentItems, { ...product }];
    });
  };

  /* =========================================================
     REMOVE
  ========================================================= */

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) =>
          String(item.id) !== String(productId)
      )
    );
  };

  /* =========================================================
     CHECK
  ========================================================= */

  const isWishlisted = (productId) => {
    return wishlistItems.some(
      (item) =>
        String(item.id) === String(productId)
    );
  };

  /* =========================================================
     TOGGLE
  ========================================================= */

  const toggleWishlist = (product) => {
    if (!product || product.id == null) {
      console.log("Invalid product passed to toggleWishlist:", product);
      return;
    }

    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (exists) {
        return currentItems.filter(
          (item) =>
            String(item.id) !== String(product.id)
        );
      }

      return [...currentItems, { ...product }];
    });
  };

  /* =========================================================
     CLEAR
  ========================================================= */

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishListContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
export function useWishlist() {
  const context = useContext(WishListContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}