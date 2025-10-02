const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ==================== DB Connection ====================
mongoose
  .connect("mongodb://127.0.0.1:27017/tourismDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const Place = require("./models/Place");

// ==================== Local DB Routes ====================
const placesRouter = require("./routes/places");
app.use("/api/places", placesRouter);

// ==================== Countries List ====================
app.get("/api/countries", async (req, res) => {
  try {
    const countries = await Place.distinct("country");
    res.json(countries.sort());
  } catch (err) {
    console.error("Country fetch error:", err);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// ==================== Search (City/Spot + Country) ====================
app.get("/api/search", async (req, res) => {
  try {
    const { q, country } = req.query;

    let filter = {};
    if (q) {
      filter.$or = [
        { city: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
      ];
    }
    if (country && country !== "all") {
      filter.country = country;
    }

    const results = await Place.find(filter);

    if (results.length === 0) {
      return res.status(404).json({ message: "No such city or place found" });
    }

    // ✅ Normalize before sending
    const formatted = results.map((item) => ({
      id: item._id,
      name: item.name || "Unknown Place",
      city: item.city || "",
      country: item.country || "Unknown Country",
      description: item.description || "No description available",
      image:
        item.image ||
        "https://via.placeholder.com/300x200?text=No+Image",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Failed to search places" });
  }
});

// ==================== Live Search Suggestions ====================
app.get("/api/suggestions", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const results = await Place.find({
      $or: [
        { city: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
      ],
    }).limit(5);

    const formatted = results.map((item) => ({
      id: item._id,
      name: item.name,
      city: item.city,
      country: item.country,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Suggestions error:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// ==================== Gemini API ====================
app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ answer: "Prompt is required ❌" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ answer });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ answer: "Error calling Gemini API ❌" });
  }
});

// ==================== Tourist Places List API ====================
app.get("/api/tourist-places", async (req, res) => {
  const { city, country } = req.query;

  try {
    let url = "";

    if (city) {
      url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${encodeURIComponent(
        city + (country && country !== "all" ? ` ${country}` : "")
      )}&currency=USD&lang=en_US`;
    } else if (country && country !== "all") {
      url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${encodeURIComponent(
        country
      )}&currency=USD&lang=en_US`;
    } else {
      url = `https://travel-advisor.p.rapidapi.com/attractions/list?location_id=60763&currency=USD&lang=en_US&lunit=km&sort=recommended`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });

    const data = await response.json();

    // ✅ Normalize results
    const results = (data?.data || []).map((item) => {
      const obj = item.result_object || item;

      return {
        id: obj.location_id || item.location_id,
        name: obj.name || "Unknown Place",
        city: obj.address_obj?.city || "",
        country: obj.address_obj?.country || "Unknown Country",
        description: obj.geo_description || item.description || "",
        image:
          obj.photo?.images?.medium?.url ||
          item.photo?.images?.medium?.url ||
          "https://via.placeholder.com/300x200?text=No+Image",
      };
    });

    res.json(results.slice(0, 50));
  } catch (err) {
    console.error("Tourist Places API Error:", err);
    res.status(500).json({ error: "Error fetching tourist places ❌" });
  }
});

// ==================== External Place Details API ====================
app.get("/api/places/external/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://travel-advisor.p.rapidapi.com/attractions/get-details?location_id=${id}&currency=USD&lang=en_US`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.json(data || {});
    } catch {
      res
        .status(404)
        .json({ error: "Invalid place ID or external API error ❌" });
    }
  } catch (err) {
    console.error("External Place API Error:", err);
    res.status(500).json({ error: "Error fetching external place ❌" });
  }
});

// ==================== Test Route ====================
app.get("/", (req, res) => {
  res.send("Tourism Assistant Backend Running 🚀");
});

// ==================== Start Server ====================
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const fetch = require("node-fetch");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // DB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/tourismDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log(err));

// // Routes
// const placesRouter = require("./routes/places");
// app.use("/api/places", placesRouter);

// // Gemini API Route
// app.post("/api/gemini", async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) return res.status(400).json({ answer: "Prompt is required ❌" });

//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }],
//         }),
//       }
//     );

//     const data = await response.json();
//     const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//     res.json({ answer });
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     res.status(500).json({ answer: "Error calling Gemini API ❌" });
//   }
// });

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Tourism Assistant Backend Running 🚀");
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
