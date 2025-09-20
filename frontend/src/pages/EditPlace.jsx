import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPlace({ setMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/places/${id}`);
        // Convert arrays to comma-separated strings
        setFormData({
          ...res.data,
          attractions: res.data.attractions?.join(", ") || "",
          facilities: res.data.facilities?.join(", ") || "",
          rating: res.data.rating || "",
        });
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "Failed to fetch place ❌" });
      }
    };
    fetchPlace();
  }, [id, setMessage]);

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

      await axios.put(`http://localhost:5000/api/places/${id}`, payload);
      setMessage({ type: "success", text: "Place updated successfully ✅" });
      navigate("/places");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update place ❌" });
    }
  };

  if (!formData) return <p className="p-6">Loading place data...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Place Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="text" name="bestTimeToVisit" placeholder="Best Time to Visit" value={formData.bestTimeToVisit} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="number" name="rating" placeholder="Rating (0-5)" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" className="w-full p-2 border rounded"/>
        <input type="text" name="attractions" placeholder="Attractions (comma-separated)" value={formData.attractions} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="text" name="facilities" placeholder="Facilities (comma-separated)" value={formData.facilities} onChange={handleChange} className="w-full p-2 border rounded"/>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Place</button>
      </form>
    </div>
  );
}
