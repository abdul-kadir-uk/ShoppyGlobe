import mongoose from "mongoose";
// Creating the product model
const Productschema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
})

const product = mongoose.model("product", Productschema);
export default product;