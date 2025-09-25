import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Places from "./pages/Places";
import AddPlace from "./pages/AddPlace";
import EditPlace from "./pages/EditPlace";
import PlaceDetails from "./pages/PlaceDetails";
import Home from "./pages/Home";
import AuthModal from "./components/AuthModal";
import GeminiPage from "./pages/GeminiPage";
import ExternalPlaceDetails from "./pages/ExternalPlaceDetails";

export default function App() {
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setMessage({ type: "success", text: `Welcome, ${username}! ✅` });
    setShowAuthModal(false);
  };

  return (
    <Router>
      <div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {message && (
          <div
            className={`p-3 mt-16 text-white text-center ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/places"
            element={
              <Places
                setMessage={setMessage}
                isLoggedIn={isLoggedIn}
                setShowAuthModal={setShowAuthModal}
              />
            }
          />
          <Route
            path="/places/add"
            element={<AddPlace setMessage={setMessage} isLoggedIn={isLoggedIn} setShowAuthModal={setShowAuthModal} />}
          />
          <Route path="/places/edit/:id" element={<EditPlace setMessage={setMessage} />} />
          <Route path="/places/:id" element={<PlaceDetails isLoggedIn={isLoggedIn} currentUser={{ id: "USER_ID" }}/>} />
          <Route path="/places/external/:id" element={<ExternalPlaceDetails />} />
          <Route path="/gemini" element={<GeminiPage/>} />
        </Routes>

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}
