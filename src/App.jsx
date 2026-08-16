import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Grocery from "./pages/Grocery";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* MEDICINES */}
        <Route
          path="/medicines"
          element={<Medicines />}
        />

        {/* GROCERY */}
        <Route
          path="/grocery"
          element={<Grocery />}
        />

        {/* COMPARE */}
        <Route
          path="/compare"
          element={
            <div style={{ padding: "100px" }}>
              <h1>Compare Coming Soon ⚖️</h1>
            </div>
          }
        />

        {/* DEALS */}
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