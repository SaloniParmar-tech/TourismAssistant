import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPlace({ setMessage, isLoggedIn, setShowAuthModal }) {
  const navigate = useNavigate();

  // Redirect or show login modal if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);      // show AuthModal
      navigate("/places");         // redirect back to places page
    }
  }, [isLoggedIn, navigate, setShowAuthModal]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    category: "",
    bestTimeToVisit: "",
    rating: "",
    attractions: "",
    facilities: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        rating: Number(formData.rating),
        attractions: formData.attractions.split(",").map((a) => a.trim()),
        facilities: formData.facilities.split(",").map((f) => f.trim()),
      };

      await axios.post("http://localhost:5000/api/places", payload);
      setMessage({ type: "success", text: "Place added successfully ✅" });
      navigate("/places");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to add place ❌" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Place Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Beach, Mountain)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bestTimeToVisit"
          placeholder="Best Time to Visit (e.g., Jan-Mar)"
          value={formData.bestTimeToVisit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="attractions"
          placeholder="Attractions (comma-separated)"
          value={formData.attractions}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="facilities"
          placeholder="Facilities (comma-separated)"
          value={formData.facilities}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Place
        </button>
      </form>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AddPlace({ setMessage }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     description: "",
//     image: "",
//     category: "",
//     bestTimeToVisit: "",
//     rating: "",
//     attractions: "",
//     facilities: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Convert comma-separated strings to arrays
//       const payload = {
//         ...formData,
//         rating: Number(formData.rating),
//         attractions: formData.attractions.split(",").map((a) => a.trim()),
//         facilities: formData.facilities.split(",").map((f) => f.trim()),
//       };

//       await axios.post("http://localhost:5000/api/places", payload);
//       setMessage({ type: "success", text: "Place added successfully ✅" });
//       navigate("/places");
//     } catch (err) {
//       console.error(err);
//       setMessage({ type: "error", text: "Failed to add place ❌" });
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Place Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category (e.g., Beach, Mountain)"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="bestTimeToVisit"
//           placeholder="Best Time to Visit (e.g., Jan-Mar)"
//           value={formData.bestTimeToVisit}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           name="rating"
//           placeholder="Rating (0-5)"
//           value={formData.rating}
//           onChange={handleChange}
//           min="0"
//           max="5"
//           step="0.1"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="attractions"
//           placeholder="Attractions (comma-separated)"
//           value={formData.attractions}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="facilities"
//           placeholder="Facilities (comma-separated)"
//           value={formData.facilities}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Add Place
//         </button>
//       </form>
//     </div>
//   );
// }
