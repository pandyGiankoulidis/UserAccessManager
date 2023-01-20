const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * 
 * Signup service
 */
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

/**
 * 
 * Login service
 */
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {

      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        res.status(200).send({ message: "User Not found." });
        return;
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      sessions.user = user;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

/**
 * Reset password service
 */
exports.reset = (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).exec((err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!result) {
        res.status(400).send({ message: "User with email address " + req.body.email + " not found" });
        return;
      }
      User.updateOne({ email: req.body.email },
        {
          password: bcrypt.hashSync(req.body.password, 8)
        }).exec((err, results) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({ message: "Successfully updated user!" });
        });

    });
  } else {
    res.status(400).send({ message: "No email or new password in the request body provided" });
  }
}
