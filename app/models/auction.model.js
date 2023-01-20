const mongoose = require("mongoose");
const status={
    closed:0,
    scheduled:1,
    open:2,
    terminated:3
}

const Auction = mongoose.model(
  "Auction",
  new mongoose.Schema({
    opendate: Date,
    closedate: Date,
    maxbids: Number,
    auctionstatus: Number,
    apartment:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment"
      }
    ],
    description: String
  })
);
module.exports = Auction;