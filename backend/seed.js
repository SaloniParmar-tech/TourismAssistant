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
  {
    name: "Angkor Wat",
    location: "Siem Reap, Cambodia",
    description: "Largest religious monument in the world, a symbol of Cambodia.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Angkor_Wat_temple.jpg",
  },
  {
    name: "Acropolis of Athens",
    location: "Athens, Greece",
    description: "Ancient citadel containing the Parthenon and other historic buildings.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Acropolis_of_Athens_2019.jpg",
  },
  {
    name: "Sagrada Familia",
    location: "Barcelona, Spain",
    description: "Unfinished basilica designed by Antoni Gaudí, a masterpiece of architecture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Sagrada_Familia_2019.jpg",
  },
  {
    name: "Alhambra",
    location: "Granada, Spain",
    description: "Palace and fortress complex of the Moorish monarchs of Granada.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Alhambra_Granada_Spain.jpg",
  },
  {
    name: "Table Mountain",
    location: "Cape Town, South Africa",
    description: "Flat-topped mountain offering panoramic views of Cape Town.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Table_Mountain_2015.jpg",
  },
  {
    name: "Mount Kilimanjaro",
    location: "Tanzania",
    description: "Africa’s highest peak and a popular climbing destination.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mount_Kilimanjaro_2020.jpg",
  },
  {
    name: "Versailles Palace",
    location: "Versailles, France",
    description: "Lavish royal palace built by Louis XIV, known for gardens and the Hall of Mirrors.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Palace_of_Versailles.jpg",
  },
  {
    name: "Blue Mosque",
    location: "Istanbul, Turkey",
    description: "Historic mosque with stunning blue tiles and grand architecture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Sultan_Ahmed_Mosque_Istanbul.jpg",
  },
  {
    name: "Hagia Sophia",
    location: "Istanbul, Turkey",
    description: "Architectural marvel that has served as a church, mosque, and museum.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Hagia_Sophia_2020.jpg",
  },
  {
    name: "Buckingham Palace",
    location: "London, England",
    description: "Official residence of the British monarch, famous for Changing of the Guard.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Buckingham_Palace_2020.jpg",
  },
  {
    name: "Prague Castle",
    location: "Prague, Czech Republic",
    description: "Largest ancient castle complex in the world, symbol of Prague.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Prague_Castle_2021.jpg",
  },
  {
    name: "Brandenburg Gate",
    location: "Berlin, Germany",
    description: "Neoclassical monument symbolizing German unity and peace.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Brandenburg_Gate_2021.jpg",
  },
  {
    name: "Red Square",
    location: "Moscow, Russia",
    description: "Historic square surrounded by Kremlin, St. Basil’s Cathedral, and Lenin’s Mausoleum.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Red_Square_2021.jpg",
  },
  {
    name: "St. Peter’s Basilica",
    location: "Vatican City",
    description: "One of the holiest Catholic shrines and largest church in the world.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/St_Peter%27s_Basilica_2021.jpg",
  },
  {
    name: "Chichen Itza",
    location: "Yucatán, Mexico",
    description: "Ancient Mayan pyramid and archaeological site, one of the New Seven Wonders.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chichen_Itza_2020.jpg",
  },
  {
    name: "Banff National Park",
    location: "Alberta, Canada",
    description: "Stunning national park in the Canadian Rockies with lakes and mountains.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Banff_National_Park_2018.jpg",
  },
  {
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Famous for annual wildebeest migration and African safaris.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Serengeti_National_Park.jpg",
  },
  {
    name: "Great Barrier Reef",
    location: "Queensland, Australia",
    description: "Largest coral reef system in the world, visible from space.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Great_Barrier_Reef_2011.jpg",
  },
  {
    name: "Yellowstone National Park",
    location: "Wyoming, USA",
    description: "America’s first national park, known for geysers, hot springs, and wildlife.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Grand_Prismatic_Spring.jpg",
  },
  {
    name: "CN Tower",
    location: "Toronto, Canada",
    description: "Iconic tower with observation deck offering views of Toronto skyline.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/CN_Tower_Toronto_2017.jpg",
  },
  {
    name: "Mecca Masjid",
    location: "Mecca, Saudi Arabia",
    description: "Holiest site in Islam, visited by millions during the Hajj pilgrimage.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Mecca_Masjid.jpg",
  },
  {
    name: "Golden Gate Bridge",
    location: "San Francisco, USA",
    description: "Suspension bridge spanning Golden Gate strait, symbol of San Francisco.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Golden_Gate_Bridge_2019.jpg",
  },
  {
    name: "Venice Canals",
    location: "Venice, Italy",
    description: "Romantic gondola rides through historic canals of Venice.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Venice_Canals.jpg",
  },
  {
    name: "Disneyland",
    location: "California, USA",
    description: "World’s most famous theme park, created by Walt Disney.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Disneyland_2020.jpg",
  },
  {
    name: "Forbidden City",
    location: "Beijing, China",
    description: "Imperial palace complex for Ming and Qing dynasties.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Forbidden_City_2020.jpg",
  },
  {
    name: "Mount Everest",
    location: "Nepal/China Border",
    description: "Tallest mountain in the world, popular among climbers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Mount_Everest_2018.jpg",
  },
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
