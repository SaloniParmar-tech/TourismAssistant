const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tourismDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const placesRouter = require("./routes/places");
app.use("/api/places", placesRouter);

// Gemini API Route
app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ answer: "Prompt is required ❌" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
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

// Tourist Places API Route
app.get("/api/tourist-places", async (req, res) => {
  const { scope } = req.query; // "india" or "world"

  try {
    let url = "";

    if (scope === "india") {
      // Attractions in Delhi, India
      url =
        "https://travel-advisor.p.rapidapi.com/attractions/list?location_id=295424&currency=INR&lang=en_US&lunit=km&sort=recommended";
    } else {
      // Attractions in New York, USA
      url =
        "https://travel-advisor.p.rapidapi.com/attractions/list?location_id=60763&currency=USD&lang=en_US&lunit=km&sort=recommended";
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });

    const data = await response.json();
    res.json(data?.data || []); // Send only useful data
  } catch (err) {
    console.error("Tourist Places API Error:", err);
    res.status(500).json({ error: "Error fetching tourist places ❌" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Tourism Assistant Backend Running 🚀");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

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
