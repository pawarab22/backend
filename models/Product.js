const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  productname: {
    type: String,
    required: true
  },
  productImg: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("products", schema);
module.exports = Product;
