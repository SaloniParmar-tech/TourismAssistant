const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // store image URL
  category: {String},       // e.g., Beach, Mountain, Historical
  bestTimeToVisit: {String},
  rating: {Number},
  attractions: [String],  // e.g., ["Sunset View", "Boat Ride"]
  facilities: [String],
});

module.exports = mongoose.model("Place", placeSchema);
