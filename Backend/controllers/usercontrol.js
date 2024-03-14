const User = require('../models/usermodel'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let emailregrex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passwordregrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const signup = ("/signup", async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
  
      if (fullname < 3) {
        return res.status(403).json({"error":"full name must be atleast 3 letters long"})
      }
      if (!email.length) {
        return res.status(403).json({"error":"Enter Email"})
      }
      if (!emailregrex.test(email)) {
        return res.status(403).json({"error":"Email is Invalid"})
      }
      if (!passwordregrex.test(password)) {
        return res.status(403).json({"error":"Password must be 6 to 20 characters long with a number,1 lowercase and 1 uppercase letters"})
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({ fullname, email, password: hashedPassword });
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, "your-secret-key");
  
      res.json({ token });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = signup;
  