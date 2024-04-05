const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const User = require("../models/usermodel");

app.use(cookieParser());

const formatDatatosend = (user) => {
  console.log(user,"ok");
  const token = jwt.sign({ Id: User._id }, "your-secret-key");
  return {
    token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    Fullname: user.personal_info.Fullname,
  };
};

const login =
  ("/login",
  async (req, res) => {
    try {
      const { Email, Password } = req.body;

      // Find user by email
      User.findOne({ "personal_info.Email": Email })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          // Compare passwords
          bcrypt.compare(
            Password,
            user.personal_info.Password,
            (err, result) => {
              if (err) {
                return res.status(404).json({ error: "Please try again" });
              }
              if (!result) {
                return res.status(401).json({ message: "Invalid password" });
              } else {
                return res.status(200).json(formatDatatosend(user));
              }


              // Passwords match, generate JWT token and send response
              // const token = jwt.sign({ Id: user._id }, "your-secret-key");
              // return res.status(200).json({ token });
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

// Generate JWT token
// const token = jwt.sign({ userId: user._id }, "your-secret-key");

// res.cookie('token', token, { httpOnly: true });

// res.json({ token });

module.exports = login;
