// app.js

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = require("./routes/userrouter");
require("dotenv").config();

const app = express();
const port = 4000;
//mangoose connection
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

//connection to uses
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", router);


// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decodedToken.userId;
    next();
  });
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
