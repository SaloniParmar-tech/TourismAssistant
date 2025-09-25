import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ExternalPlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/external/${id}`
        );

        if (!response.ok) {
          let errMsg = "Failed to fetch place ❌";
          try {
            const errData = await response.json();
            errMsg = errData.error || errMsg;
          } catch {
            const text = await response.text();
            errMsg = text;
          }
          throw new Error(errMsg);
        }

        const data = await response.json();
        setPlace(data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!place) return <div>No place found.</div>;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "80px auto 40px auto",
        padding: 0,
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 32 }}>
        <button
          onClick={() => navigate("/places")}
          style={{
            background: "linear-gradient(90deg, #6366f1 60%, #818cf8 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 28px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 24,
            boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
            transition: "background 0.2s",
          }}
        >
          ← Back
        </button>
        <h2 style={{ marginBottom: 20, color: "#3730a3", fontSize: 36, fontWeight: 800 }}>
          {place.name}
        </h2>
        {place.photo?.images?.large?.url && (
          <img
            src={place.photo.images.large.url}
            alt={place.name}
            style={{
              width: "100%",
              maxHeight: 500,
              objectFit: "cover",
              borderRadius: 14,
              marginBottom: 28,
              boxShadow: "0 4px 24px rgba(99,102,241,0.13)",
            }}
          />
        )}
        <p style={{ fontSize: 20, marginBottom: 18, color: "#334155" }}>
          {place.description}
        </p>
        <div style={{ fontSize: 17, marginBottom: 10, color: "#475569" }}>
          {place.rating && (
            <div style={{ marginBottom: 8 }}>
              <span style={{
                background: "#6366f1",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 12px",
                fontWeight: 700,
                marginRight: 10,
                fontSize: 18,
              }}>
                ★ {place.rating}
              </span>
              <span>
                ({place.num_reviews} reviews)
              </span>
            </div>
          )}
          {place.ranking && (
            <div style={{ marginBottom: 8 }}>
              <strong>Ranking:</strong> {place.ranking}
            </div>
          )}
          {place.fee && (
            <div style={{ marginBottom: 8 }}>
              <strong>Entry Fee:</strong> {place.fee}
            </div>
          )}
          {place.recommended_visit_length && (
            <div style={{ marginBottom: 8 }}>
              <strong>Recommended Visit Length:</strong> {place.recommended_visit_length}
            </div>
          )}
          {place.category?.name && (
            <div style={{ marginBottom: 8 }}>
              <strong>Category:</strong> {place.category.name}
            </div>
          )}
          {place.local_name && (
            <div style={{ marginBottom: 8 }}>
              <strong>Local Name:</strong> {place.local_name}
            </div>
          )}
        </div>
        {place.reviews && place.reviews.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <h3 style={{ color: "#6366f1", fontWeight: 700, fontSize: 22, marginBottom: 16 }}>
              Recent Reviews
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {place.reviews.slice(0, 3).map((review, idx) => (
                <li
                  key={idx}
                  style={{
                    background: "#f1f5f9",
                    borderRadius: 10,
                    padding: "16px 20px",
                    marginBottom: 14,
                    boxShadow: "0 1px 4px rgba(99,102,241,0.06)",
                  }}
                >
                  <strong style={{ color: "#3730a3" }}>{review.title}</strong>
                  <div style={{ margin: "8px 0", color: "#334155" }}>{review.text}</div>
                  <div style={{ fontSize: 14, color: "#64748b" }}>
                    by {review.author} | Rating: {review.rating}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalPlaceDetails;
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ExternalPlaceDetails() {
//   const { id } = useParams(); // external place id from URL
//   const navigate = useNavigate();
//   const [place, setPlace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPlace = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/places/external/${id}`
//         );

//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.error || "Failed to fetch place ❌");
//         }

//         const data = await response.json();
//         setPlace(data || null);
//       } catch (err) {
//         console.error("Error fetching external place:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlace();
//   }, [id]);

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!place) return <p className="p-6 text-red-500">Place not found ❌</p>;

//   return (
//     <div className="p-6 mt-20 max-w-4xl mx-auto">
//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//       >
//         ⬅ Back
//       </button>

//       {/* Place Image */}
//       <img
//         src={
//           place.photo?.images?.large?.url ||
//           "https://via.placeholder.com/600x400?text=No+Image"
//         }
//         alt={place.name}
//         className="w-full h-80 object-cover rounded-lg shadow"
//       />

//       {/* Place Info */}
//       <h2 className="text-3xl font-bold mt-4">{place.name}</h2>
//       <p className="text-gray-600">{place.location_string}</p>

//       {/* Ratings */}
//       {place.rating && (
//         <p className="mt-2 text-yellow-600 font-semibold">
//           ⭐ {place.rating} / 5 ({place.num_reviews} reviews)
//         </p>
//       )}

//       {/* Description */}
//       <p className="mt-4 text-lg">
//         {place.description || "No description available."}
//       </p>

//       {/* Contact Info */}
//       <div className="mt-4 space-y-2">
//         {place.address && (
//           <p>
//             📍 <span className="font-semibold">Address:</span> {place.address}
//           </p>
//         )}
//         {place.phone && (
//           <p>
//             📞 <span className="font-semibold">Phone:</span> {place.phone}
//           </p>
//         )}
//         {place.website && (
//           <p>
//             🌐{" "}
//             <a
//               href={place.website}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline"
//             >
//               Official Website
//             </a>
//           </p>
//         )}
//       </div>

//       {/* Hours */}
//       {place.hours && place.hours.week_ranges && (
//         <div className="mt-4">
//           <h3 className="font-semibold">🕒 Opening Hours:</h3>
//           <ul className="list-disc ml-6 text-gray-700">
//             {place.hours.week_ranges.map((day, idx) => (
//               <li key={idx}>
//                 {day.map(
//                   (range, i) =>
//                     `${range.open_time} - ${range.close_time}${
//                       i < day.length - 1 ? ", " : ""
//                     }`
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
