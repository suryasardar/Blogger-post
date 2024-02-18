const User = require('../models/usermodel'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = ("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({ username, email, password: hashedPassword });
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
  