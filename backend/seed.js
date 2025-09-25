// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Place = require("./models/Place");

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tourismDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Famous tourist places worldwide
const places = [
  {
    name: "Eiffel Tower",
    location: "Paris, France",
    description: "An iconic iron tower built in 1889, symbol of Paris.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
  },
  {
    name: "Statue of Liberty",
    location: "New York, USA",
    description:
      "A colossal neoclassical sculpture on Liberty Island, gifted by France.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg",
  },
  {
    name: "Great Wall of China",
    location: "Beijing, China",
    description: "Ancient series of walls built to protect Chinese states.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Great_Wall_of_China_Jinshanling-edit.jpg",
  },
  {
    name: "Taj Mahal",
    location: "Agra, India",
    description: "A white marble mausoleum built by Mughal emperor Shah Jahan.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
  },
  {
    name: "Colosseum",
    location: "Rome, Italy",
    description: "A massive ancient amphitheater used for gladiatorial contests.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Colosseo_2020.jpg",
  },
  {
    name: "Machu Picchu",
    location: "Cusco, Peru",
    description: "15th-century Inca citadel set high in the Andes Mountains.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
  },
  {
    name: "Sydney Opera House",
    location: "Sydney, Australia",
    description: "A multi-venue performing arts centre on Sydney Harbour.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/Sydney_Opera_House_Sails.jpg",
  },
  {
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    description: "A huge Art Deco statue of Jesus Christ atop Mount Corcovado.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg",
  },
  {
    name: "Santorini",
    location: "Santorini, Greece",
    description: "A picturesque island with whitewashed houses and blue domes.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Santorini_sunset_01.jpg",
  },
  {
    name: "Pyramids of Giza",
    location: "Giza, Egypt",
    description: "The oldest of the Seven Wonders of the Ancient World.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
  },
];

// Function to insert data
const seedDB = async () => {
  try {
    await Place.deleteMany(); // Clear old data
    await Place.insertMany(places);
    console.log("Database seeded with famous tourist places 🌍✨");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedDB();
