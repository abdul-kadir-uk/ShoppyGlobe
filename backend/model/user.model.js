import mongoose from "mongoose";
// Creating the user model
const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const user = mongoose.model("user", Userschema);
export default user;