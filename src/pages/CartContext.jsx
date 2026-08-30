import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const CartContext = createContext(null);


export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    try {

      const savedCart =
        localStorage.getItem(
          "onebasketCart"
        );

      return savedCart
        ? JSON.parse(savedCart)
        : [];

    } catch (error) {

      console.error(
        "Unable to load cart:",
        error
      );

      return [];

    }

  });
  useEffect(() => {

    localStorage.setItem(
      "onebasketCart",
      JSON.stringify(cart)
    );

  }, [cart]);
  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        );


      if (existingProduct) {

        return currentCart.map(
          (item) =>

            item.id === product.id

              ? {
                  ...item,

                  quantity:
                    (item.quantity || 1) + 1,
                }

              : item

        );

      }


      return [

        ...currentCart,

        {
          ...product,
          quantity: 1,
        },

      ];

    });

  };
  const removeFromCart = (id) => {

    setCart((currentCart) =>

      currentCart.filter(
        (item) =>
          item.id !== id
      )

    );

  };
 const updateQuantity = (
    id,
    quantity
  ) => {

    setCart((currentCart) => {

      if (quantity <= 0) {

        return currentCart.filter(
          (item) =>
            item.id !== id
        );

      }


      return currentCart.map(
        (item) =>

          item.id === id

            ? {
                ...item,
                quantity,
              }

            : item

      );

    });

  };
  const increaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart.map(
        (item) =>

          item.id === id

            ? {
                ...item,

                quantity:
                  (item.quantity || 1) + 1,
              }

            : item

      )

    );

  };
  const decreaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart

        .map(
          (item) =>

            item.id === id

              ? {
                  ...item,

                  quantity:
                    (item.quantity || 1) - 1,
                }

              : item

        )

        .filter(
          (item) =>
            (item.quantity || 0) > 0
        )

    );

  };
  const clearCart = () => {

    setCart([]);

  };
  const cartCount =
    cart.reduce(
      (total, item) =>

        total +
        (Number(item.quantity) || 1),

      0
    );
  const cartTotal =
    cart.reduce(
      (total, item) =>

        total +
        (
          Number(item.price) || 0
        ) *
        (
          Number(item.quantity) || 1
        ),

      0
    );

  return (

    <CartContext.Provider
      value={{

        cart,

        setCart,

        addToCart,

        removeFromCart,

        updateQuantity,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        cartCount,

        cartTotal,

      }}
    >

      {children}

    </CartContext.Provider>

  );

}
export function useCart() {

  const context =
    useContext(CartContext);


  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }


  return context;

}