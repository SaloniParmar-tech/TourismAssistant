import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Places({ setMessage }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("all");

  // ✅ Country List
  const countries = [
    "All Countries", "India", "United States", "China", "France", "Italy",
    "Japan", "United Kingdom", "Australia", "Brazil", "Canada", "Germany",
    "Spain", "Thailand", "Turkey", "United Arab Emirates", "Egypt", "Russia",
    "Mexico", "South Africa"
  ];

  const fetchPlaces = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/tourist-places?city=${searchQuery}&country=${country}`
      );
      if (!res.ok) throw new Error("Failed to fetch places from server");
      const data = await res.json();

      const formattedPlaces = data.map((item) => {
  const name = item.name || item.result_object?.name || "Unknown Place";
  const country =
    item.address_obj?.country ||
    item.result_object?.address_obj?.country ||
    "Unknown Country";
  const location =
    item.address_obj?.city ||
    item.result_object?.address_obj?.city ||
    item.address ||
    "";

  return {
    id: item.location_id || item._id || Math.random().toString(),
    name,
    country,
    location,
    description:
      item.description ||
      item.result_object?.geo_description ||
      "No description available",
    image:
      item.photo?.images?.medium?.url ||
      item.result_object?.photo?.images?.medium?.url ||
      "https://via.placeholder.com/300x200?text=No+Image",
  };
});

      setPlaces(formattedPlaces);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage?.({ type: "error", text: "Failed to load places ❌" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 mt-24"> {/* ✅ Added margin top */}
      <h2 className="text-2xl font-bold mb-6">🌍 Famous Places</h2>

      {/* ✅ Search & Country Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by city or place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded"
        >
          {countries.map((c, idx) => (
            <option key={idx} value={c === "All Countries" ? "all" : c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={fetchPlaces}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading places...</p>
      ) : places.length === 0 ? (
        <p className="text-gray-600">No places found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              className="border p-4 rounded-lg shadow hover:shadow-xl transition flex flex-col"
            >
              <Link to={`/places/${place.id}`} state={place} className="flex flex-col flex-1">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image")
                  }
                />
                <h3 className="text-xl font-semibold">{place.name}</h3>
                {/* ✅ Country Name Below Title */}
                <p className="text-gray-700 text-sm">{place.country}</p>
                {place.location && (
                  <p className="text-gray-600 mt-1">{place.location}</p>
                )}
                <p className="mt-2 text-gray-500 text-sm flex-1">
                  {place.description.length > 100
                    ? place.description.slice(0, 100) + "..."
                    : place.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Places({ setMessage }) {
//   const [places, setPlaces] = useState([]);
//   const [region, setRegion] = useState("world"); // default top 50 world
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);

//   // Fetch places based on region (India/World) or search term
//   useEffect(() => {
//     if (!searchTerm) {
//       fetchPlaces(region);
//     }
//   }, [region, searchTerm]);

//   const fetchPlaces = async (scopeOrCity) => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/tourist-places?${scopeOrCity ? `scope=${scopeOrCity}` : ""}`
//       );
//       const json = await res.json();

//       const extractedPlaces =
//         json?.map((item) => ({
//           id: item._id || item.location_id,
//           name: item.name || "Unknown",
//           location: item.address || `${item.latitude}, ${item.longitude}`,
//           description: item.description || `${item.num_reviews} reviews`,
//           image: item.photo?.images?.medium?.url || "",
//         })) || [];

//       setPlaces(extractedPlaces);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setMessage({ type: "error", text: "Failed to load places ❌" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Autocomplete & city search with "city, country"
//   useEffect(() => {
//     if (!searchTerm) {
//       setSuggestions([]);
//       return;
//     }

//     const fetchCityPlaces = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/tourist-places?city=${encodeURIComponent(searchTerm)}`
//         );
//         const json = await res.json();

//         // Suggestions for autocomplete with city + country
//         const citySuggestions =
//           json?.slice(0, 10).map((item) => {
//             const cityName = item.name || "Unknown";
//             const countryName = item.address?.split(",").pop() || "";
//             return countryName ? `${cityName}, ${countryName}` : cityName;
//           }) || [];

//         setSuggestions(citySuggestions);

//         const extractedPlaces =
//           json?.map((item) => ({
//             id: item._id || item.location_id,
//             name: item.name || "Unknown",
//             location: item.address || `${item.latitude}, ${item.longitude}`,
//             description: item.description || `${item.num_reviews} reviews`,
//             image: item.photo?.images?.medium?.url || "",
//           })) || [];

//         setPlaces(extractedPlaces);
//       } catch (err) {
//         console.error("Search fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const delayDebounce = setTimeout(() => {
//       fetchCityPlaces();
//     }, 500); // 0.5s debounce

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, setMessage]);

//   return (
//     <div className="p-6 mt-20">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
//         <h2 className="text-2xl font-bold">Explore Places</h2>

//         <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
//           {/* Region dropdown */}
//           <select
//             value={region}
//             onChange={(e) => setRegion(e.target.value)}
//             className="border px-3 py-2 rounded"
//           >
//             <option value="india">India</option>
//             <option value="world">World</option>
//           </select>

//           {/* City search input */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search city..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border px-3 py-2 rounded w-full md:w-64"
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow-md max-h-48 overflow-y-auto z-10">
//                 {suggestions.map((suggestion, idx) => (
//                   <li
//                     key={idx}
//                     className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                     onClick={() => setSearchTerm(suggestion)}
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : places.length === 0 ? (
//         <p className="text-gray-600">No places found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {places.map((place, index) => (
//             <div
//               key={place.id || index}
//               className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition"
//             >
//               <Link
//                 to={
//                   place._id ? `/places/${place._id}` : `/places/external/${place.id}`
//                 }
//                 state={place}
//               >
//                 <img
//                   src={place.image || "https://via.placeholder.com/300"}
//                   alt={place.name}
//                   className="w-full h-40 object-cover rounded"
//                 />
//                 <h3 className="text-xl font-semibold mt-2">{place.name}</h3>
//                 <p className="text-gray-600">{place.location}</p>
//                 <p className="mt-2 text-sm text-gray-500">
//                   {place.description?.slice(0, 100)}...
//                 </p>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Places({ setMessage, isLoggedIn, setShowAuthModal }) {
//   const [places, setPlaces] = useState([]);
//   const [filteredPlaces, setFilteredPlaces] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   // Fetch all places
//   useEffect(() => {
//     const fetchPlaces = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/places");
//         const data = await res.json();
//         setPlaces(data);
//         setFilteredPlaces(data);
//       } catch (err) {
//         setMessage({ type: "error", text: "Failed to load places ❌" });
//       }
//     };
//     fetchPlaces();
//   }, [setMessage]);

//   // Filter places on search
//   useEffect(() => {
//     setFilteredPlaces(
//       places.filter((p) =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, places]);

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/api/places/${id}`, {
//         method: "DELETE",
//       });
//       setPlaces(places.filter((place) => place._id !== id));
//       setMessage({ type: "success", text: "Place deleted ✅" });
//     } catch (err) {
//       setMessage({ type: "error", text: "Delete failed ❌" });
//     }
//   };

//   const handleAddPlace = () => {
//     if (!isLoggedIn) {
//       setShowAuthModal(true);
//     } else {
//       navigate("/places/add");
//     }
//   };

//   return (
//     <div className="p-6 mt-20">
//       <h2 className="text-2xl font-bold mb-4">Explore Places</h2>

//       {filteredPlaces.length === 0 ? (
//         <p className="text-gray-600">No places found. Add one!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredPlaces.map((place) => (
//             <div
//               key={place._id}
//               className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition"
//             >
//               <Link to={`/places/${place._id}`}>
//                 <img
//                   src={place.image}
//                   alt={place.name}
//                   className="w-full h-40 object-cover rounded"
//                 />
//                 <h3 className="text-xl font-semibold mt-2">{place.name}</h3>
//                 <p className="text-gray-600">{place.location}</p>
//                 <p className="mt-2">{place.description}</p>
//               </Link>

//               <div className="flex gap-3 mt-4">
//                 <Link
//                   to={`/places/edit/${place._id}`}
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => handleDelete(place._id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-6">
//         <button
//           onClick={handleAddPlace}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Add New Place
//         </button>
//       </div>
//     </div>
//   );
// }
