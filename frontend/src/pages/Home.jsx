import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80"
        alt="Tourism"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Amazing Places ✨
        </h2>

        <Link
          to="/places"
          className="px-6 py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition"
        >
          Explore Places
        </Link>
      </div>
    </div>
  );
}



// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="relative h-screen w-full">
//       {/* Background Image */}
//       <img
//         src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80"
//         alt="Tourism"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>

//       {/* Center Content */}
//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
//         <h2 className="text-4xl md:text-5xl font-bold mb-6">
//           Discover Amazing Places ✨
//         </h2>

//         <Link
//           to="/places"
//           className="px-6 py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition"
//         >
//           Explore Places
//         </Link>
//       </div>
//     </div>
//   );
// }

