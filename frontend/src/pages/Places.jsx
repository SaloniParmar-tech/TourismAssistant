import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Places({ setMessage }) {
  const [places, setPlaces] = useState([]);
  const [region, setRegion] = useState("india"); // 🌏 Default India

  // Fetch places based on dropdown selection
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/tourist-places?scope=${region}`
        );
        const json = await res.json();

        const extractedPlaces =
          json?.map((item) => ({
            id: item._id || item.location_id,
            name: item.name || "Unknown",
            location: item.address || `${item.latitude}, ${item.longitude}`,
            description: item.description || `${item.num_reviews} reviews`,
            image: item.photo?.images?.medium?.url || "",
          })) || [];

        setPlaces(extractedPlaces);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage({ type: "error", text: "Failed to load places ❌" });
      }
    };

    fetchPlaces();
  }, [region, setMessage]);

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Explore Places</h2>

        {/* 🌍 Dropdown to choose India or World */}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="india">India</option>
          <option value="world">World</option>
        </select>
      </div>

      {places.length === 0 ? (
        <p className="text-gray-600">No places found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <div
              key={place.id || index}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <Link
  to={place._id ? `/places/${place._id}` : `/places/external/${place.id}`}
  state={place} // ✅ Pass place data
>
  <img
    src={place.image || "https://via.placeholder.com/300"}
    alt={place.name}
    className="w-full h-40 object-cover rounded"
  />
  <h3 className="text-xl font-semibold mt-2">{place.name}</h3>
  <p className="text-gray-600">{place.location}</p>
  <p className="mt-2 text-sm text-gray-500">
    {place.description?.slice(0, 100)}...
  </p>
</Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}


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
