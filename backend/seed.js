const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Place = require("./models/Place");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tourismDB";

// 50 World Famous Tourist Places
const placesData = [
  {
    name: "Eiffel Tower",
    location: "Paris, France",
    description: "An iconic wrought-iron lattice tower offering panoramic views of Paris.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
  },
  {
    name: "Great Wall of China",
    location: "Beijing, China",
    description: "A world wonder stretching thousands of kilometers across northern China.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/20090529_Great_Wall_8185.jpg",
  },
  {
    name: "Taj Mahal",
    location: "Agra, India",
    description: "A white marble mausoleum built by Mughal emperor Shah Jahan, symbol of love.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
  },
  {
    name: "Statue of Liberty",
    location: "New York City, USA",
    description: "Gift from France, symbolizing freedom and democracy, located on Liberty Island.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Statue_of_Liberty_7.jpg",
  },
  {
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
  },
  {
    name: "Colosseum",
    location: "Rome, Italy",
    description: "Massive ancient amphitheater once hosting gladiatorial contests and public spectacles.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
  },
  {
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    description: "Giant statue of Jesus overlooking Rio, symbol of Christianity and Brazil.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg",
  },
  {
    name: "Sydney Opera House",
    location: "Sydney, Australia",
    description: "Iconic performing arts center with a distinctive sail-like design.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Sydney_Opera_House_Sails.jpg",
  },
  {
    name: "Big Ben",
    location: "London, England",
    description: "Iconic clock tower at the north end of the Palace of Westminster.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Big_Ben_2012.JPG",
  },
  {
    name: "Santorini",
    location: "Santorini, Greece",
    description: "Aegean island famous for whitewashed houses, blue domes, and sunsets.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Santorini_sunset_Oia.jpg",
  },
  {
    name: "Petra",
    location: "Ma'an, Jordan",
    description: "Ancient rock-cut city known as the Rose City, famous for its architecture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Petra_Jordan_BW_21.JPG",
  },
  {
    name: "Niagara Falls",
    location: "Ontario, Canada & New York, USA",
    description: "Three massive waterfalls straddling the US-Canada border.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Niagara_Falls_2.jpg",
  },
  {
    name: "Pyramids of Giza",
    location: "Giza, Egypt",
    description: "Ancient pyramids and the Great Sphinx, one of the Seven Wonders of the Ancient World.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
  },
  {
    name: "Burj Khalifa",
    location: "Dubai, UAE",
    description: "Tallest building in the world, offering views from the observation deck.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Burj_Khalifa.jpg",
  },
  {
    name: "Grand Canyon",
    location: "Arizona, USA",
    description: "Vast canyon carved by the Colorado River, offering breathtaking views.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Grand_Canyon_view.jpg",
  },
  {
    name: "Louvre Museum",
    location: "Paris, France",
    description: "World's largest art museum, home to the Mona Lisa and thousands of works.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Louvre_Museum_Wikimedia_Commons.jpg",
  },
  {
    name: "Times Square",
    location: "New York City, USA",
    description: "Famous entertainment hub, bright with billboards, Broadway shows, and energy.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Times_Square_1-2.jpg",
  },
  {
    name: "Stonehenge",
    location: "Wiltshire, England",
    description: "Prehistoric monument with massive standing stones in a circular layout.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Stonehenge2007_07_30.jpg",
  },
  {
    name: "Dubai Mall",
    location: "Dubai, UAE",
    description: "One of the largest shopping malls in the world, with aquarium and ice rink.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Dubai_Mall.jpg",
  },
  {
    name: "Mount Fuji",
    location: "Honshu, Japan",
    description: "Japan’s tallest mountain, a UNESCO site and pilgrimage destination.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Mount_Fuji_from_Yamanaka.jpg",
  },
  // 👉 Add ~30 more places here in same format
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    await Place.deleteMany({});
    console.log("🗑️ Old places deleted");

    await Place.insertMany(placesData);
    console.log("🌍 World tourist places seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
};

seedDB();
