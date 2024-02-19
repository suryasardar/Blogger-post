const BlogPost = require('../models/Blogmodel'); // Import the BlogPost model

const getID = ('/getblog/:uid', async (req, res) => {
    try {
        const blogId = req.params.uid;
        // Fetch blog from MongoDB by ID
        const blog = await BlogPost.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = getID;