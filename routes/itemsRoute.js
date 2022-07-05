const express = require("express");
const ItemModel = require("../models/itemModel");
const router = express.Router();

router.get("/get-all-items", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-item", async (req, res) => {
  try {
    const newItme = new ItemModel(req.body);
    await newItme.save();
    res.send("Itme added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/edit-item", async (req, res) => {
  try {
    await ItemModel.findByIdAndUpdate({ _id: req.body.itemId }, req.body);
    res.send("Itme updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/delete-item", async (req, res) => {
  try {
    await ItemModel.findByIdAndDelete({ _id: req.body.itemId });
    res.send("Itme deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = router;
