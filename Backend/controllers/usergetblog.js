const BlogPost = require('../models/Blogmodel'); // Import the BlogPost model

const getblog = ("/get/posts/", async (req, res) => {
    try {
      // Fetch all blog posts from the database
      const blogPosts = await BlogPost.find();
      res.json(blogPosts); // Send the blog posts as a JSON response
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});
  
module.exports = getblog;