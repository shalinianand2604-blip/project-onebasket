import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Grocery from "./pages/Grocery";
import AskOneBasket from "./pages/AskOneBasket";

function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/medicines"
          element={<Medicines />}
        />

        <Route
          path="/grocery"
          element={<Grocery />}
        />
        <Route
  path="/ask"
  element={<AskOneBasket />}
/>

        <Route
          path="/compare"
          element={
            <div style={{ padding: "100px" }}>
              <h1>Compare Coming Soon ⚖️</h1>
            </div>
          }
        />

        <Route
          path="/deals"
          element={
            <div style={{ padding: "100px" }}>
              <h1>Deals Coming Soon 🔥</h1>
            </div>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;