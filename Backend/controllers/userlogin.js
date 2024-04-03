const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const User = require('../models/usermodel');

app.use(cookieParser());

const login = ("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find user by email
      User.findOne({ "personal_info.email": email })
          .then(user => {
              if (!user) {
                  return res.status(404).json({ message: "User not found" });
              }

              // Compare passwords
              bcrypt.compare(password, user.personal_info.password, (err, result) => {
                  if (err) {
                      return res.status(404).json({ error: "Please try again" });
                  }
                  if (!result) {
                      return res.status(401).json({ message: "Invalid password" });
                  }
                  // Passwords match, generate JWT token and send response
                  const token = jwt.sign({ Id: user._id }, "your-secret-key");
                  return res.status(200).json({ token });
              });
          })
          .catch(error => {
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
  