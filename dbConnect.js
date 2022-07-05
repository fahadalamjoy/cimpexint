const mongoose = require("mongoose");

const URL = "mongodb+srv://pos:pos@cluster0.tbjio0h.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL);

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
  console.log("Mongo db connection Successfully");
});

connectionObj.on("error", () => {
  console.log("Mongo db connection Failed");
});
