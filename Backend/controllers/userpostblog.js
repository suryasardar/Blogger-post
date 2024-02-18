const BlogPost = require('../models/Blogmodel'); // Import the BlogPost model
const uuid = require("uuid");

const postblog = ("/api/posts", async (req, res) => {
    const { title, shortDescription, long, summary } = req.body;
    let image = "./product-11.jpeg"; // Default image URL
  
    if (!title || !shortDescription || !long || !summary) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const uid = uuid.v4();
  
    if (
      title.length <= 10 ||
      shortDescription.length <= 25 ||
      long.length <= 1000 ||
      summary.length <= 30
    ) {
      try {
        // Create a new blog post instance
        const newPost = new BlogPost({
          title,
          uid,
          shortDescription,
          long,
          summary,
          image, // Assign the default image URL
        });
  
        // Save the post to the database
        await newPost.save();
  
        // Respond with a success message
        return res.json({ message: "Blog post created successfully" });
      } catch (error) {
        console.error("Error creating blog post:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
module.exports = postblog;