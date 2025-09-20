import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "./AuthModal";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    navigate("/"); // redirect to home
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20 ${
          isHome ? "bg-transparent" : "bg-white shadow-md"
        }`}
      >
        {/* ✅ Website Name is now clickable */}
        <Link
          to="/"
          className={`text-2xl font-bold transition ${
            isHome
              ? "text-white hover:text-green-200"
              : "text-green-600 hover:text-green-800"
          }`}
        >
          Tourism Assistant
        </Link>

        {/* Search bar -> only show on /places */}
        {location.pathname === "/places" && (
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-full border focus:outline-none w-64 bg-gray-100"
          />
        )}

        {/* Right side */}
        <div className="relative flex items-center gap-4">
          {!isLoggedIn ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                isHome
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Login / Signup
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`font-medium ${
                  isHome ? "text-white" : "text-gray-700"
                }`}
              >
                Welcome, {username}
              </span>
              <div className="relative">
                <FaUserCircle
                  size={30}
                  className={`cursor-pointer ${
                    isHome ? "text-white" : "text-gray-700"
                  }`}
                  onClick={() => setShowDropdown(!showDropdown)}
                />

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2 text-gray-700">
                    <Link className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}


// import { Link } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";

// export default function Navbar() {
//   return (
//     <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
//       {/* Website name on the left */}
//       <h1 className="text-2xl font-bold text-blue-600">Tourism Assistant</h1>

//       {/* Right side (Login + Signup + User icon) */}
//       <div className="flex items-center gap-4">
//         <Link
//           to="/login"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Login
//         </Link>
//         <Link
//           to="/signup"
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Signup
//         </Link>
//         <FaUserCircle size={30} className="text-gray-700 cursor-pointer" />
//       </div>
//     </nav>
//   );
// }
