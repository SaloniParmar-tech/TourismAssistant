import { Link } from "react-router-dom";

export default function PlaceCard({ place, onDelete }) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img src={place.image} alt={place.name} className="w-full h-48 object-cover rounded-md mb-3" />
      <h3 className="text-xl font-semibold">{place.name}</h3>
      <p className="text-gray-600">{place.location}</p>
      <p className="mt-2 text-sm text-gray-700">{place.description}</p>

      <div className="flex gap-3 mt-3">
        <Link to={`/places/${place._id}`} className="px-3 py-1 bg-blue-500 text-white rounded">
          View
        </Link>
        <Link to={`/places/edit/${place._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded">
          Edit
        </Link>
        <button
          onClick={() => onDelete(place._id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
