import mongoose from "mongoose";
// Creating the Cart model
const cartschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
    index: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});


const Cart = mongoose.model("Cart", cartschema);
export default Cart;
