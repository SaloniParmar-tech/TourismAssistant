const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// ✅ Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    console.error("Error fetching all places:", err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// ✅ Get single place by ID
router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(place);
  } catch (err) {
    console.error("Error fetching place:", err);
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

// ✅ Add a new place
router.post("/", async (req, res) => {
  const { name, location, description, image } = req.body;

  if (!name || !location || !description || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const place = new Place({ name, location, description, image });

  try {
    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (err) {
    console.error("Error adding place:", err);
    res.status(400).json({ error: "Failed to add place" });
  }
});

// ✅ Update a place (Edit)
router.put("/:id", async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(updatedPlace);
  } catch (err) {
    console.error("Error updating place:", err);
    res.status(400).json({ error: "Failed to update place" });
  }
});

// ✅ Delete a place
router.delete("/:id", async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    console.error("Error deleting place:", err);
    res.status(500).json({ error: "Failed to delete place" });
  }
});

module.exports = router;
