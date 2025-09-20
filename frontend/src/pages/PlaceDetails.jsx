import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/places/${id}`);
        setPlace(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch place ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <p className="p-6">Loading place details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">{place.name}</h2>
      <p className="text-gray-600 mb-2">{place.location}</p>
      <img src={place.image} alt={place.name} className="w-full max-w-lg h-64 object-cover rounded-md mb-4" />
      <p className="mb-2">{place.description}</p>
      <p><strong>Category:</strong> {place.category}</p>
      <p><strong>Best Time to Visit:</strong> {place.bestTimeToVisit}</p>
      <p><strong>Rating:</strong> {place.rating} ⭐</p>
      <p><strong>Attractions:</strong> {place.attractions?.join(", ")}</p>
      <p><strong>Facilities:</strong> {place.facilities?.join(", ")}</p>

      <div className="mt-4">
        <Link to="/places" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Back to All Places
        </Link>
      </div>
    </div>
  );
}
