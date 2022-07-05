const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    castomerName: { type: String, required: true },
    castomerPhoneNumber: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    tax: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    cartItems: { type: Array, required: true },
  },
  { timestamps: true }
);

const billModel = mongoose.model("bills", BillSchema);

module.exports = billModel;
