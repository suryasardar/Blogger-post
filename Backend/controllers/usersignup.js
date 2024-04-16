const User = require("../models/usermodel"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uid = require("uuid");
// const { nanoid } = require('nanoid');

let emailregrex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passwordregrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const formatDatatosend = (user) => {
  const token = jwt.sign({ Id: User._id }, "your-secret-key");
  return {
    token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateusername = async (email) => {
  try {
    let username = email.split("@")[0];
    let userunique = await User.exists({
      "personal_info,username": username,
    }).then((result) => result);
    userunique ? (username += uid().substring(0, 5)) : "";
    return username;
  } catch (error) {
    console.error("error generating username", error);
  }
};

const signup =
  ("/signup",
  async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      console.log(fullname, email, password);

      if (fullname < 3) {
        return res
          .status(403)
          .json({ error: "full name must be atleast 3 letters long" });
      }

      if (!email) {
        return res.status(403).json({ error: "Enter Email" });
      }
      if (!emailregrex.test(email)) {
        return res.status(403).json({ error: "Email is Invalid" });
      }

      if (!passwordregrex.test(password)) {
        return res.status(403).json({
          error:
            "Password must be 6 to 20 characters long with a number,1 lowercase and 1 uppercase letters",
        });
      }
      let mail = await User.findOne({ "personal_info.email": email });
      console.log(mail, "suryajsdfj");
      if (!mail) {
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          let username = await generateusername(email);

          // Create new user
          const user = new User({
            personal_info: {
              fullname,
              email,
              password: hashedPassword,
              username,
            },
          });
          user.save().then((u) => {
            console.log(u, "ok");
              return res.status(200).json(formatDatatosend(u));
            })
            .catch((err) => {
              if (err.code == 11000) {
                return res.status(409).json({ error: "email already exists" });
              }
              return res.status(500).json({ errror: err.message });
            });
        });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server OK error" });
    }
  });

module.exports = signup;


// const express = require('express');
// const router = express.Router();
// const User = require("../models/usermodel"); // Import the User model
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const uid = require("uuid");

// const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// const generateUsername = async (email) => {
//   let username = email.split("@")[0];
//   let userExists = await User.exists({ "personal_info.username": username });
//   if (userExists) {
//     username += uid().substring(0, 5);
//   }
//   return username;
// };

// const formatDataToSend = (user) => {
//   const token = jwt.sign({ Id: user._id },"your-secret-key");
//   return {
//     token,
//     profile_img: user.personal_info.profile_img,
//     username: user.personal_info.username,
//     fullname: user.personal_info.fullname,
//   };
// };

// const signup=('/signup', async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     // Validate input data
//     if (fullname.length < 3) {
//       return res.status(400).json({ error: "Full name must be at least 3 characters long" });
//     }

//     if (!email || !emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         error: "Password must be 6 to 20 characters long with at least one number, one lowercase, and one uppercase letter",
//       });
//     }
     

//     // Check if email already exists
//     const existingUser = await User.findOne({ "personal_info.email_1": email });
//     if (existingUser) {
//       return res.status(409).json({ error: "Email already exists" });
//     }

//     // Generate username
//     const username = await generateUsername(email);

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       personal_info: {
//         fullname,
//         email,
//         password: hashedPassword,
//         username,
//       },
//     });

//     // Save user to database
//     const savedUser = await newUser.save();

//     // Format data and send response
//     return res.status(201).json(formatDataToSend(savedUser));
//   } catch (error) {
//     console.error("Error signing up:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = signup;

