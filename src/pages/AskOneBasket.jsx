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
  X,
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
        "Hi! 👋 I'm OneBasket. I can help you find medicines, groceries, compare prices and check delivery options. What are you looking for?",
    },
  ]);

  const messagesEndRef = useRef(null);

  // Always open this page at the top, while keeping chat scrolling inside the messages area.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);


  /* =========================================================
     AUTO SCROLL
  ========================================================= */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

  }, [messages]);


  /* =========================================================
     BOT RESPONSE
  ========================================================= */

  const getBotResponse = (text) => {

    const query = text.toLowerCase().trim();


    /* MEDICINES */

    if (
      query.includes("paracetamol") ||
      query.includes("dolo") ||
      query.includes("crocin") ||
      query.includes("ibuprofen") ||
      query.includes("cetirizine") ||
      query.includes("azithromycin")
    ) {

      return {
        text:
          "Sure! 💊 I can help you find that medicine. You can view the available medicines and check their details and prices.",

        action: {
          label: "View Medicines",
          path: `/medicines?search=${encodeURIComponent(text)}`,
        },
      };
    }


    /* GENERAL MEDICINE */

    if (
      query.includes("medicine") ||
      query.includes("medicines") ||
      query.includes("tablet") ||
      query.includes("capsule") ||
      query.includes("syrup") ||
      query.includes("pharmacy")
    ) {

      return {
        text:
          "Sure! 💊 What medicine are you looking for? You can tell me the medicine name, such as Paracetamol, Dolo 650 or Cetirizine.",
        action: null,
      };
    }


    /* GROCERY */

    if (
      query.includes("grocery") ||
      query.includes("groceries") ||
      query.includes("rice") ||
      query.includes("milk") ||
      query.includes("vegetable") ||
      query.includes("vegetables") ||
      query.includes("fruit") ||
      query.includes("fruits")
    ) {

      return {
        text:
          "Sure! 🛒 I can help you find groceries. Tell me what grocery item you're looking for and I'll take you to the grocery section.",
        action: {
          label: "Browse Groceries",
          path: "/grocery",
        },
      };
    }


    /* COMPARE */

    if (
      query.includes("compare") ||
      query.includes("cheapest") ||
      query.includes("best price") ||
      query.includes("lowest price") ||
      query.includes("price comparison")
    ) {

      return {
        text:
          "Absolutely! 💰 OneBasket can help you compare prices and find the better deal.",
        action: {
          label: "Compare Prices",
          path: "/compare",
        },
      };
    }


    /* DELIVERY */

    if (
      query.includes("delivery") ||
      query.includes("deliver") ||
      query.includes("delivery area") ||
      query.includes("where do you deliver")
    ) {

      return {
        text:
          "📍 We provide delivery options across supported cities in South India. You can select your state and then choose your city using the delivery selector in the navbar.",
        action: null,
      };
    }


    /* LOCATION */

    if (
      query.includes("chennai") ||
      query.includes("bangalore") ||
      query.includes("bengaluru") ||
      query.includes("hyderabad") ||
      query.includes("kochi") ||
      query.includes("kerala") ||
      query.includes("tamil nadu") ||
      query.includes("karnataka") ||
      query.includes("telangana") ||
      query.includes("andhra")
    ) {

      return {
        text:
          "📍 You can select your state and city from the Delivery option in the navbar. OneBasket will use your selected location for delivery-related options.",
        action: null,
      };
    }


    /* DEALS */

    if (
      query.includes("deal") ||
      query.includes("deals") ||
      query.includes("offer") ||
      query.includes("offers") ||
      query.includes("discount") ||
      query.includes("discounts")
    ) {

      return {
        text:
          "🔥 We have a Deals section where you can explore available offers and discounts.",
        action: {
          label: "View Deals",
          path: "/deals",
        },
      };
    }


    /* CART */

    if (
      query.includes("cart") ||
      query.includes("shopping cart")
    ) {

      return {
        text:
          "🛒 You can view the products you've added to your cart here.",
        action: {
          label: "Open Cart",
          path: "/cart",
        },
      };
    }


    /* WISHLIST */

    if (
      query.includes("wishlist") ||
      query.includes("saved products")
    ) {

      return {
        text:
          "❤️ You can view your saved products in your wishlist.",
        action: {
          label: "Open Wishlist",
          path: "/wishlist",
        },
      };
    }


    /* GREETING */

    if (
      query === "hi" ||
      query === "hello" ||
      query === "hey" ||
      query.includes("good morning") ||
      query.includes("good evening")
    ) {

      return {
        text:
          "Hello! 👋 Welcome to OneBasket. What would you like help with today?",
        action: null,
      };
    }


    /* HELP */

    if (
      query.includes("help") ||
      query.includes("what can you do") ||
      query.includes("how can you help")
    ) {

      return {
        text:
          "I can help you with 💊 medicines, 🛒 groceries, 💰 price comparison, 🔥 deals, 📍 delivery information, 🛒 cart and ❤️ wishlist. Just ask me naturally!",
        action: null,
      };
    }


    /* THANK YOU */

    if (
      query.includes("thank") ||
      query.includes("thanks")
    ) {

      return {
        text:
          "You're very welcome! 😊 I'm always here to help you shop smarter with OneBasket.",
        action: null,
      };
    }


    /* DEFAULT */

    return {
      text:
        "I'm still learning about that 😊. Try asking me about medicines, groceries, prices, deals, delivery, cart or wishlist.",
      action: null,
    };
  };


  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const sendMessage = (text = message) => {

    const cleanMessage = text.trim();

    if (!cleanMessage) return;


    /* CUSTOMER MESSAGE */

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


    /* BOT RESPONSE */

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

    }, 500);
  };


  /* =========================================================
     ENTER KEY
  ========================================================= */

  const handleKeyDown = (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      sendMessage();
    }
  };


  /* =========================================================
     QUICK QUESTIONS
  ========================================================= */

  const quickQuestions = [
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
      text: "Where do you deliver?",
      icon: MapPin,
    },
  ];


  return (

    <div className="ask-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

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


      {/* =====================================================
          CHATBOX
      ===================================================== */}

      <div className="chat-box">


        {/* CHAT HEADER */}

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


        {/* ===================================================
            MESSAGES
        =================================================== */}

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

              {/* BOT ICON */}

              {msg.sender === "bot" && (

                <div className="message-avatar bot-avatar">
                  <Bot size={17} />
                </div>

              )}


              <div className="message-column">

                <div className="message-bubble">

                  {msg.text}

                </div>


                {/* ACTION BUTTON */}

                {msg.action && (

                  <button
                    type="button"
                    className="chat-action"
                    onClick={() =>
                      navigate(msg.action.path)
                    }
                  >

                    {msg.action.label}

                    <span>
                      →
                    </span>

                  </button>

                )}

              </div>


              {/* USER ICON */}

              {msg.sender === "user" && (

                <div className="message-avatar user-avatar">
                  <User size={17} />
                </div>

              )}

            </div>

          ))}


          <div ref={messagesEndRef} />

        </div>


        {/* ===================================================
            QUICK QUESTIONS
        =================================================== */}

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
                  onClick={() => sendMessage(item.text)}
                >

                  <Icon size={15} />

                  {item.text}

                </button>

              );

            })}

          </div>

        </div>


        {/* ===================================================
            INPUT
        =================================================== */}

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
            onClick={() => sendMessage()}
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