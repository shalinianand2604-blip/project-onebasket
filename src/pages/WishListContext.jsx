import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] = useState([]);

  const toggleWishlist = (product) => {

    setWishlistItems((items) => {

      const exists = items.some(
        (item) => item.id === product.id
      );

      if (exists) {

        return items.filter(
          (item) => item.id !== product.id
        );

      }

      return [...items, product];

    });

  };


  const removeFromWishlist = (id) => {

    setWishlistItems((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );

  };


  const isWishlisted = (id) => {

    return wishlistItems.some(
      (item) => item.id === id
    );

  };


  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


export function useWishlist() {

  return useContext(WishlistContext);

}