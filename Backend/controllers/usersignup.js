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
          console.log(user, "ok");
          user
            .save()
            .then((u) => {
              return res.status(200).json(formatDatatosend(u));
            })
            .catch((err) => {
              if (err.code == 11000) {
                return res.status(500).json({ error: "email already exists" });
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
