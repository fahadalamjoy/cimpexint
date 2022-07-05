const express = require("express");
const SalesModel = require('../models/salesModel')
const otpModel = require("../models/OtpModel");
const router = express.Router();

router.get("/",  (req, res) => {
    const searchField = req.query.name
    // console.log(searchField)
    SalesModel.find({"$or":[{customer_name:{$regex:searchField,$options:'$i'}},
                            {customer_number:{$regex:searchField,$options:'$i'}},
                            {payment:{$regex:searchField,$options:'$i'}}]})
    .then(data=>{
      res.send(data)
    })
  });
// router.get("/:name", async (req, res) => {
//     try {
//       // var regex =  req.params.name
//       console.log(regex)
//       const Customer = await SalesModel.find({
//         "$or":{"customer_name":{$regex:req.params.name}}
//       })
//       console.log(Customer)
//       if(!Customer){
//         res.status(400).json(error);
//       }
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   });

  module.exports = router;