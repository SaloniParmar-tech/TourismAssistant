const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/tourismDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const placesRouter = require("./routes/places");
app.use("/api/places", placesRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Tourism Assistant Backend Running 🚀");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
