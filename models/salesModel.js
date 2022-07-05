const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
  {
    invoice_no:{type:Number,required:false},
    id:{type:String,required:false},
    customer_name: { type: String, required: true },
    selected_product: { type: String, required: true },
    customer_number: { type: String, required: true },
    address: { type: String, required: false },
    unit_price: { type: Number, required: false },
    unit_sold: { type: Number, required: false },
    total: { type: Number, required: false },
    d_charge: { type: Number, required: false },
    advance: { type: Number, required: false },
    discount: { type: Number, required: false },
    shipping_date: { type: String, required: false },
    delivery: { type: String, required: false },
    payment: { type: String, required: false },
    comments: { type: String, required: false },
  },
  { timestamps: true }
);

const SalesModel = mongoose.model("sales", itemsSchema);

module.exports = SalesModel;
