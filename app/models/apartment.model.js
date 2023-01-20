const mongoose = require("mongoose");
const Apartment = mongoose.model(
  "Apartment",
  new mongoose.Schema({
    price: Number,
    area: String,
    rooms: Number,
    age: Number,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    description: String
  })
);
module.exports = Apartment;