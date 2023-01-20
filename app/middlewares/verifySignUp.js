const db = require("../models");
const jsonParser = require("body-parser").json();
const ROLES = db.role;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  // Username
  console.log(req.body);

  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      console.log("found user " + user.username);
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
}


checkDublicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  });
};



checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.findOne(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};


const verifySignUp = {
  checkDuplicateUsername,
  checkDublicateEmail,
  checkRolesExisted
};
module.exports = verifySignUp;
