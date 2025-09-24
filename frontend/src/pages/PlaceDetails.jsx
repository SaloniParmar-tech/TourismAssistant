import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

export default function PlaceDetails({ isLoggedIn, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [place, setPlace] = useState(location.state || null); // ✅ preload from state
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    // If already have place data (from state), skip fetch
    if (location.state) return;

    // Only fetch if it's MongoDB id
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      const fetchPlace = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/places/${id}`);
          if (!response.ok) throw new Error("Failed to fetch place ❌");
          const data = await response.json();
          setPlace(data);
        } catch (error) {
          console.error("Error fetching place:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlace();
    } else {
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!place) return <p className="p-6">Place not found ❌</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this place?")) return;

    try {
      await fetch(`http://localhost:5000/api/places/${id}`, {
        method: "DELETE",
      });
      navigate("/places");
    } catch (err) {
      console.error("Delete failed ❌", err);
    }
  };

  const isOwner = isLoggedIn && place.createdBy === currentUser?.id;

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ⬅ Back
      </button>

      <img
        src={place.image || "https://via.placeholder.com/600"}
        alt={place.name}
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      <h2 className="text-3xl font-bold mt-4">{place.name}</h2>
      <p className="text-gray-600">{place.location}</p>
      <p className="mt-4 text-lg">{place.description}</p>

      {isOwner && (
        <div className="flex gap-3 mt-6">
          <Link
            to={`/places/edit/${place._id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
