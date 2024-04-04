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
    Fullname: user.personal_info.Fullname,
  };
};

const generateusername = async (Email) => {
  try {
    let username = Email.split("@")[0];
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
      const { Fullname, Email, Password } = req.body;
      console.log(Fullname, Email, Password);

      if (Fullname < 3) {
        return res
          .status(403)
          .json({ error: "full name must be atleast 3 letters long" });
      }
      if (!Email) {
        return res.status(403).json({ error: "Enter Email" });
      }
      if (!emailregrex.test(Email)) {
        return res.status(403).json({ error: "Email is Invalid" });
      }
      if (!passwordregrex.test(Password)) {
        return res.status(403).json({
          error:
            "Password must be 6 to 20 characters long with a number,1 lowercase and 1 uppercase letters",
        });
      }

      bcrypt.hash(Password, 10, async (err, hashedPassword) => {
        let username = await generateusername(Email);
        // Create new user
        const user = new User({
          personal_info: {
            Fullname,
            Email,
            Password: hashedPassword,
            username,
          },
        });
        user
          .save()
          .then((u) => {
            return res.status(200).json(formatDatatosend(u));
          })
          .catch((err) => {
            if (err.code == 11000) {
              return res.status(500).json({ eror: "email already exists" });
            }
            return res.status(500).json({ errror: err.message });
          });
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server OK error" });
    }
  });

module.exports = signup;
