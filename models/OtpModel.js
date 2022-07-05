const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    otp: { type: String, required: false },

  },
  { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema);

module.exports = otpModel;
