const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.Apartment = require("./apartment.model");
db.Auction = require("./auction.model");
db.Bid = require("./bid.model");
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
