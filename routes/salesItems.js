const express = require("express");
const SalesModel = require('../models/salesModel')
const router = express.Router();

router.get("/get-all-sales", async (req, res) => {
  try {
    const items = await SalesModel.find();
    res.send(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-sale", async (req, res) => {
    try {
      const newSale = new SalesModel(req.body);
      await newSale.save();
      res.send("Itme added successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.post("/edit-sale", async (req, res) => {
    try {
      await SalesModel.findByIdAndUpdate({ _id: req.body.itemId }, req.body);
      res.send("Itme updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.post("/delete-sale", async (req, res) => {
    try {
      await SalesModel.findByIdAndDelete({ _id: req.body.itemId });
      res.send("Itme deleted successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  });
  router.get("/find-id/:id", async (req, res) => {
    try {
      // console.log( req.params.id )
      const findId = await SalesModel.findById( req.params.id );
      res.send(findId);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = router;