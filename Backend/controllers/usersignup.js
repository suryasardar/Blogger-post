const User = require("../models/usermodel"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  let username = email.split("@")[0];
  let userunique = await User.exists({ personal_info: username }).then(
    (result) => result
  );
  userunique ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

const signup =
  ("/signup",
  async (req, res) => {
    try {
      const { fullname, email, password } = req.body;

      if (fullname < 3) {
        return res
          .status(403)
          .json({ error: "full name must be atleast 3 letters long" });
      }
      if (!email.length) {
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

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        let username = generateusername(email);
        // Create new user
        const user = new User({
          personal_info: {
            fullname,
            email,
            password: hashedPassword,
            username,
          },
        });
        newUser
          .save()
          .then((u) => {
            return res.status(200).json(formatDatatosend(u));
          })
          .catch((err) => {
            if (err.code == 11000) {
              return res.status(500).json({ eror: "email already exists" });
            }
            return res.status(500).json({ eror: err.message });
          });
      });

      // Generate JWT token
      // 

      res.json({ token });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = signup;
