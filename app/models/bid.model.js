const mongoose = require('mongoose');

const Bid = mongoose.model(
    "Bid",
    new mongoose.Schema({
        date: Date,
        amount: Number,
        auction: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Auction"
            }
        ],
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })
);

module.exports = Bid;