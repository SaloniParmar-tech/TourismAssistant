const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single place by ID
router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new place
router.post("/", async (req, res) => {
  const place = new Place({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a place (Edit)
router.put("/:id", async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlace) return res.status(404).json({ message: "Place not found" });
    res.json(updatedPlace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a place
router.delete("/:id", async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) return res.status(404).json({ message: "Place not found" });
    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
