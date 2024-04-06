const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const User = require("../models/usermodel");

app.use(cookieParser());

const formatDatatosend = (user) => {
  
  const token = jwt.sign({ Id: User._id }, "your-secret-key");
  return {
    token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const login =("/login",async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      User.findOne({ "personal_info.email": email })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          // Compare passwords
          bcrypt.compare(
            password,
            user.personal_info.password,
            (err, result) => {
              if (err) {
                return res.status(404).json({ error: "Please try again" });
              }
              if (!result) {
                return res.status(401).json({ message: "Invalid password" });
              } else {
                return res.status(200).json(formatDatatosend(user));
              }
            }
          );
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

 

module.exports = login;
