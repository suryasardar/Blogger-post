// app.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;
app.use(cors());

app.use(cookieParser());

mongoose.connect('mongodb+srv://suryaprakashchary515:Mahesh%40123@blog-post-database-clus.qn1xwf4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const postSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  long: String,
  summary: String,
  image: String // Assuming you store the image path
});

const User = mongoose.model('User', userSchema);
const BlogPost = mongoose.model('Post', postSchema);

app.use(express.json());
// const userrouter = require("./useRouter");
// app.use("apis", userrouter);

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');

    res.json({ token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Authentication endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = decodedToken.userId;
    next();
  });
}

app.get('/get/posts', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const blogPosts = await BlogPost.find();
    res.json(blogPosts); // Send the blog posts as a JSON response
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/api/posts', async (req, res) => {
  const { title, shortDescription, long, summary } = req.body;
  let image = "./product-11.jpeg"; // Default image URL


  if (!title || !shortDescription || !long || !summary) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  if (title.length <=10 || shortDescription.length <= 25 || long.length <=1000 || summary.length <= 30) {
    try {
      // Create a new blog post instance
      const newPost = new BlogPost({
        title,
        shortDescription,
        long,
        summary,
        image // Assign the default image URL
      });
  
      // Save the post to the database
      await newPost.save();
  
      // Respond with a success message
      return res.json({ message: 'Blog post created successfully' });
    } catch (error) {
      console.error('Error creating blog post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});