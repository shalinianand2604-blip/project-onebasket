import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bot,
  Send,
  User,
  Pill,
  ShoppingCart,
  Tag,
  MapPin,
  ScanLine,
  Package,
  RotateCcw,
  CreditCard,
  UserCircle,
  Heart,
} from "lucide-react";

import "./AskOneBasket.css";

function AskOneBasket() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text:
        "Hi! 👋 I'm OneBasket Assistant. How can I help You?",
    },
  ]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const hasAny = (query, words) => {
    return words.some((word) => query.includes(word));
  };
const getBotResponse = (text) => {
    const query = text.toLowerCase().trim();

    if (
      query === "hi" ||
      query === "hello" ||
      query === "hey" ||
      query === "hai" ||
      query === "hii" ||
      query === "helo" ||
      query.includes("good morning") ||
      query.includes("good afternoon") ||
      query.includes("good evening")
    ) {
      return {
        text:
          "Hello! 👋 Welcome to OneBasket. I can help you with orders, shopping, medicines, groceries, delivery, prices, returns, refunds, Smart Scan and more. What would you like to know?",
        action: null,
      };
    }
  if (
      hasAny(query, [
        "what is onebasket",
        "what is one basket",
        "about onebasket",
        "about one basket",
        "tell me about onebasket",
        "tell me about one basket",
        "what does onebasket do",
        "what is this website",
        "what is this app",
      ])
    ) {
      return {
        text:
          "OneBasket is a smart shopping platform for medicines and groceries. You can search products, browse categories, compare prices, find deals, use Smart Scan, add products to your cart, save items to your wishlist and manage your shopping from one place.",
        action: null,
      };
    }
   if (
      hasAny(query, [
        "how does onebasket work",
        "how onebasket works",
        "how does this website work",
        "how does the website work",
        "how to use onebasket",
        "how can i use onebasket",
        "how do i use onebasket",
        "how do i use this website",
        "how can i use this website",
        "how to shop",
        "how can i shop",
      ])
    ) {
      return {
        text:
          "Using OneBasket is simple 😊. Choose Medicines or Grocery, search for a product or browse categories, open a product, compare available prices, add the item to your cart and continue shopping or checkout. You can also use Smart Scan to identify products.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "website features",
        "features of onebasket",
        "what features",
        "what can i do here",
        "what can i do on this website",
        "what does this website offer",
        "what services do you provide",
        "what services does onebasket provide",
        "features",
      ])
    ) {
      return {
        text:
          "OneBasket includes 💊 Medicines, 🛒 Grocery, 💰 Price Comparison, 📷 Smart Scan, 🔥 Deals, 📦 Order support, 📍 Delivery location, ❤️ Wishlist, 🛍️ Cart, 👤 Account and Ask OneBasket.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "my order",
        "my orders",
        "about my order",
        "know about my order",
        "tell me about my order",
        "order details",
        "order detail",
        "order status",
        "status of my order",
        "check my order",
        "check order",
        "track my order",
        "track order",
        "where is my order",
        "where's my order",
        "where is the order",
        "order tracking",
        "track my package",
        "track my parcel",
        "package status",
        "parcel status",
        "has my order shipped",
        "is my order shipped",
        "when will my order arrive",
        "when will my order come",
        "when will my order be delivered",
        "order delivery status",
      ])
    ) {
      return {
        text:
          "📦 Sure! I can help you with your order. For the latest order status, please check your Orders section after signing in. You can use it to see your order details, delivery status and expected delivery information.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "cancel my order",
        "cancel order",
        "cancel the order",
        "i want to cancel",
        "can i cancel my order",
        "can i cancel the order",
        "how to cancel my order",
        "how do i cancel",
      ])
    ) {
      return {
        text:
          "📦 To cancel an order, open your order details and check whether cancellation is available for that order. Orders that are already being prepared for delivery may not be cancellable.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "return my order",
        "return order",
        "return the order",
        "return product",
        "return an item",
        "i want to return",
        "how to return",
        "how do i return",
        "can i return",
        "product return",
      ])
    ) {
      return {
        text:
          "↩️ To return a product, open the order containing that item and check the available return option. Return availability can depend on the product and order status.",
        action: null,
      };
    }
if (
      hasAny(query, [
        "refund",
        "where is my refund",
        "when will i get my refund",
        "refund status",
        "refund money",
        "money back",
        "when will refund come",
      ])
    ) {
      return {
        text:
          "💳 For a refund, check the order details and payment information for the returned or cancelled item. The refund status depends on the order and payment method.",
        action: null,
      };
    }

    if (
      hasAny(query, [
        "payment",
        "pay",
        "how can i pay",
        "payment methods",
        "how to pay",
        "online payment",
        "cash on delivery",
        "cod",
      ])
    ) {
      return {
        text:
          "💳 Payment information is handled during checkout. Select the available payment option shown for your order and complete the purchase.",
        action: null,
      };
    }

    if (
      hasAny(query, [
        "what can i buy",
        "what products can i buy",
        "what products are available",
        "what products do you have",
        "what do you sell",
        "products available",
        "what can i purchase",
      ])
    ) {
      return {
        text:
          "You can shop for medicines and everyday groceries on OneBasket. Grocery categories include fruits and vegetables, dairy and breakfast, rice and dal, oil and ghee, snacks, beverages, packaged food and more.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "smart scan",
        "what is scan",
        "what is smart scan",
        "how does scan work",
        "how to scan",
        "scan product",
        "scan a product",
        "how can i scan",
        "scan an item",
        "scan item",
        "camera scan",
      ])
    ) {
      return {
        text:
          "📷 Smart Scan lets you identify a product using your camera or an uploaded image. Open Smart Scan, take a photo or upload one, and use the result to explore the product information.",
        action: {
          label: "Open Smart Scan",
          path: "/scan",
        },
      };
    }
    if (
      hasAny(query, [
        "paracetamol",
        "dolo",
        "dolo 650",
        "crocin",
        "ibuprofen",
        "cetirizine",
        "azithromycin",
        "amoxicillin",
      ])
    ) {
      return {
        text:
          "💊 Sure! I can help you find that medicine. Open Medicines to search for the product and view the available medicine details.",
        action: {
          label: "View Medicines",
          path: `/medicines?search=${encodeURIComponent(text)}`,
        },
      };
    }

    if (
      hasAny(query, [
        "medicine",
        "medicines",
        "tablet",
        "tablets",
        "capsule",
        "capsules",
        "syrup",
        "pharmacy",
        "medical",
        "drug",
      ])
    ) {
      return {
        text:
          "💊 Sure! What medicine are you looking for? Tell me the medicine name and I can take you to the Medicines section.",
        action: {
          label: "Open Medicines",
          path: "/medicines",
        },
      };
    }
    if (
      hasAny(query, [
        "rice",
        "milk",
        "vegetable",
        "vegetables",
        "fruit",
        "fruits",
        "oil",
        "ghee",
        "snack",
        "snacks",
        "biscuit",
        "biscuits",
        "cookie",
        "cookies",
        "coffee",
        "tea",
        "egg",
        "eggs",
        "noodles",
        "pasta",
        "masala",
        "atta",
        "dal",
      ])
    ) {
      return {
        text:
          "🛒 Sure! I can help you find that grocery item. Open Grocery to browse the available categories and products.",
        action: {
          label: "Browse Groceries",
          path: "/grocery",
        },
      };
    }
    if (
      hasAny(query, [
        "grocery",
        "groceries",
        "supermarket",
        "grocery section",
        "shopping items",
        "grocery shopping",
      ])
    ) {
      return {
        text:
          "🛒 OneBasket has a Grocery section with everyday essentials organized into categories and subcategories. You can browse or search for the item you need.",
        action: {
          label: "Browse Groceries",
          path: "/grocery",
        },
      };
    }

    if (
      hasAny(query, [
        "compare",
        "cheapest",
        "best price",
        "lowest price",
        "price comparison",
        "cheaper",
        "compare prices",
        "which is cheaper",
        "find cheap",
      ])
    ) {
      return {
        text:
          "💰 OneBasket helps you compare available product prices so you can find a better deal before shopping.",
        action: {
          label: "Compare Prices",
          path: "/compare",
        },
      };
    }
    if (
      hasAny(query, [
        "how to compare",
        "how can i compare",
        "how do i compare",
        "how to compare prices",
        "how can i compare prices",
      ])
    ) {
      return {
        text:
          "💰 Search for a product or open the Compare section. From there, you can compare available product options and prices before making your choice.",
        action: {
          label: "Compare Prices",
          path: "/compare",
        },
      };
    }

    if (
      hasAny(query, [
        "delivery",
        "deliver",
        "delivery area",
        "where do you deliver",
        "delivery location",
        "delivery cities",
        "delivery available",
        "do you deliver",
        "can you deliver",
        "delivery time",
        "how long does delivery take",
        "when can i get it",
      ])
    ) {
      return {
        text:
          "📍 You can select your delivery location from the Delivery option in the navbar. Choose the available state and city to check delivery-related options.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "chennai",
        "madurai",
        "bangalore",
        "bengaluru",
        "hyderabad",
        "kochi",
        "kerala",
        "tamil nadu",
        "karnataka",
        "telangana",
        "andhra",
        "my location",
        "change location",
        "select location",
        "change city",
        "change state",
      ])
    ) {
      return {
        text:
          "📍 You can select or change your state and city from the Delivery option in the navbar. OneBasket uses the selected location for delivery-related options.",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "deal",
        "deals",
        "offer",
        "offers",
        "discount",
        "discounts",
        "sale",
        "coupon",
        "coupons",
      ])
    ) {
      return {
        text:
          "🔥 You can explore available offers, discounts and deals from the Deals section.",
        action: {
          label: "View Deals",
          path: "/deals",
        },
      };
    }
    if (
      hasAny(query, [
        "cart",
        "shopping cart",
        "my cart",
        "open cart",
        "show cart",
        "view cart",
        "added products",
        "items in my cart",
        "what is in my cart",
      ])
    ) {
      return {
        text:
          "🛒 You can view the products you have added, change quantities and continue shopping from your Cart.",
        action: {
          label: "Open Cart",
          path: "/cart",
        },
      };
    }
    if (
      hasAny(query, [
        "wishlist",
        "wish list",
        "saved products",
        "saved items",
        "favourite products",
        "favorite products",
        "liked products",
        "my favourites",
        "my favorites",
      ])
    ) {
      return {
        text:
          "❤️ Your Wishlist contains products you have saved for later. You can open it to view your saved items.",
        action: {
          label: "Open Wishlist",
          path: "/wishlist",
        },
      };
    }

    if (
      hasAny(query, [
        "account",
        "my account",
        "login",
        "log in",
        "sign in",
        "signin",
        "profile",
        "my profile",
      ])
    ) {
      return {
        text:
          "👤 You can access your OneBasket account from the Account option in the navbar.",
        action: {
          label: "Open Account",
          path: "/login",
        },
      };
    }
    if (
      hasAny(query, [
        "home page",
        "homepage",
        "go home",
        "open home",
        "home",
      ])
    ) {
      return {
        text:
          "🏠 The OneBasket Home page gives you quick access to shopping, search, Smart Scan, Medicines, Grocery, comparison, deals and other features.",
        action: {
          label: "Go to Home",
          path: "/",
        },
      };
    }
    if (
      hasAny(query, [
        "where can i find",
        "where is medicines",
        "where is grocery",
        "where is compare",
        "where is deals",
        "where is cart",
        "where is wishlist",
        "where is account",
        "how do i open",
        "how can i open",
        "where can i open",
      ])
    ) {
      return {
        text:
          "You can use the OneBasket navbar to access Home, Medicines, Grocery, Compare, Deals, Ask OneBasket, Delivery Location, Wishlist, Cart and Account.",
        action: null,
      };
    }
 
    if (
      hasAny(query, [
        "help",
        "what can you do",
        "how can you help",
        "what should i ask",
        "what can i ask",
        "show me options",
      ])
    ) {
      return {
        text:
          "😊 You can ask me natural questions such as:\n\n• Where is my order?\n• Can I cancel my order?\n• How can I return an item?\n• Where is my refund?\n• Find a medicine\n• Find groceries\n• What's the cheapest price?\n• How does Smart Scan work?\n• Where do you deliver?\n• Show my cart\n• Open my wishlist\n• How does OneBasket work?",
        action: null,
      };
    }
    if (
      hasAny(query, [
        "thank you",
        "thanks",
        "thank",
        "thx",
        "thank u",
      ])
    ) {
      return {
        text:
          "You're very welcome! 😊 I'm always here to help you shop smarter with OneBasket.",
        action: null,
      };
    }
    if (
      query === "bye" ||
      query === "goodbye" ||
      query === "ok bye" ||
      query.includes("see you") ||
      query.includes("talk later")
    ) {
      return {
        text:
          "Goodbye! 👋 Come back anytime when you need help with OneBasket.",
        action: null,
      };
    }
 if (
      query === "ok" ||
      query === "okay" ||
      query === "sure" ||
      query === "yes" ||
      query === "yeah" ||
      query === "yep"
    ) {
      return {
        text:
          "😊 Great! What would you like help with — your order, medicines, groceries, delivery, prices, cart, wishlist or anything else on OneBasket?",
        action: null,
      };
    }

    if (
      query === "no" ||
      query === "not now" ||
      query === "nothing"
    ) {
      return {
        text:
          "No problem 😊. I'm here whenever you need help with OneBasket.",
        action: null,
      };
    }
    return {
      text:
        "I can help with that 😊. Try asking me about your order, delivery, cancellation, returns, refunds, medicines, groceries, price comparison, Smart Scan, deals, cart, wishlist, account or how the OneBasket website works.",
      action: null,
    };
  };
const sendMessage = (text = message) => {
    const cleanMessage = text.trim();

    if (!cleanMessage) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: cleanMessage,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setMessage("");

    setTimeout(() => {
      const response = getBotResponse(cleanMessage);

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.text,
        action: response.action,
      };

      setMessages((previous) => [
        ...previous,
        botMessage,
      ]);
    }, 450);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };


  const quickQuestions = [
    {
      text: "Where is my order?",
      icon: Package,
    },
    {
      text: "Can I cancel my order?",
      icon: RotateCcw,
    },
    {
      text: "How can I return an item?",
      icon: RotateCcw,
    },
    {
      text: "Where is my refund?",
      icon: CreditCard,
    },
    {
      text: "What is OneBasket?",
      icon: Bot,
    },
    {
      text: "Find a medicine",
      icon: Pill,
    },
    {
      text: "Find groceries",
      icon: ShoppingCart,
    },
    {
      text: "Find the cheapest price",
      icon: Tag,
    },
    {
      text: "How does Smart Scan work?",
      icon: ScanLine,
    },
    {
      text: "Show my cart",
      icon: ShoppingCart,
    },
    {
      text: "Open my wishlist",
      icon: Heart,
    },
    {
      text: "My account",
      icon: UserCircle,
    },
    {
      text: "Where do you deliver?",
      icon: MapPin,
    },
  ];
  return (
    <div className="ask-page">
<div className="ask-header">

        <div className="ask-bot-icon">
          <Bot size={28} />
        </div>

        <div>
          <h1>
            Ask OneBasket
          </h1>

          <p>
            Your personal shopping assistant
          </p>
        </div>

      </div>
  <div className="chat-box">

    <div className="chat-header">

          <div className="chat-profile">

            <div className="chat-avatar">
              <Bot size={20} />
            </div>

            <div>
              <strong>
                OneBasket Assistant
              </strong>

              <span>
                ● Online
              </span>
            </div>

          </div>

        </div>
        <div className="messages-area">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={
                msg.sender === "user"
                  ? "message-row user-row"
                  : "message-row bot-row"
              }
            >

              {msg.sender === "bot" && (
                <div className="message-avatar bot-avatar">
                  <Bot size={17} />
                </div>
              )}

              <div className="message-column">

                <div className="message-bubble">
                  {msg.text}
                </div>

                {msg.action && (
                  <button
                    type="button"
                    className="chat-action"
                    onClick={() =>
                      navigate(msg.action.path)
                    }
                  >
                    {msg.action.label}
                    <span>→</span>
                  </button>
                )}

              </div>

              {msg.sender === "user" && (
                <div className="message-avatar user-avatar">
                  <User size={17} />
                </div>
              )}

            </div>
          ))}

          <div ref={messagesEndRef} />

        </div>
        <div className="quick-question-area">

          <p>
            Try asking
          </p>

          <div className="quick-questions">

            {quickQuestions.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.text}
                  type="button"
                  onClick={() =>
                    sendMessage(item.text)
                  }
                >
                  <Icon size={15} />
                  {item.text}
                </button>
              );

            })}

          </div>

        </div>

        <div className="chat-input-area">

          <input
            type="text"
            value={message}
            placeholder="Ask OneBasket anything..."
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            onClick={() =>
              sendMessage()
            }
            disabled={!message.trim()}
          >
            <Send size={19} />
          </button>

        </div>
  <div className="chat-footer">
          OneBasket Assistant • Shopping made smarter
        </div>

      </div>

    </div>
  );
}

export default AskOneBasket;