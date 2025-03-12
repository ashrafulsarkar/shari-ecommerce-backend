const { default: slugify } = require("slugify");
const { getListBlog } = require("../helper/blog");
const Blog = require("../model/Blog");
const BlogCategory = require("../model/BlogCategory");
const moment = require("moment");
const BusinessSetting = require("../model/BusinessSetting");
const { getSetting } = require("../lib/helper");
// Create a Category
exports.createBlog = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title, { lower: true });
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All BLog list front end
exports.getListBlogs = async (req, res) => {
    try {
        const blogs = await getListBlog(req.query);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Categories
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Category by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title, { lower: true });
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.category_with_count = async (req, res) => {
    try {
        const categoryCounts = await Blog.aggregate([
            {
              $group: {
                _id: "$category.id",
                count: { $sum: 1 }
              }
            }
          ]);

          const categories = await BlogCategory.find();

          // Merge category counts with categories
          const result = categories.map(cat => {
            const count = categoryCounts.find(c => String(c._id) === String(cat._id))?.count || 0;
            return {
              _id: cat._id,
              name: cat.name,
              slug: cat.slug,
              description: cat.description,
              count
            };
          });

          res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// popular_tags
exports.popular_tags = async (req, res) => {
    try {
        const tagsAggregation = await Blog.aggregate([
            { $unwind: "$tags" }, // Unwind the tags array to count each tag separately
            { $group: { _id: "$tags", count: { $sum: 1 } } }, // Group by tag and count occurrences
            { $sort: { count: -1 } }, // Sort by count in descending order
            { $limit: 5 }, // Limit to the top 10 popular tags
          ]);

          const popularTags = tagsAggregation.map(tag => ({
            name: tag._id,
            count: tag.count
          }));

          res.status(200).json(popularTags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.blog_details = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate({
            path:'created_by',
            select:'_id name image  bio '
        });

        if (!blog) return res.status(404).json({ error: "Blog not found" });

        // Convert Mongoose document to plain JavaScript object
        const data = blog.toObject();
        data.createdAt = moment(blog.createdAt).format("MMMM D, YYYY");


        // Fetch the previous blog post (older than the current one)
        let previousPost = await Blog.findOne({
            createdAt: { $lt: blog.createdAt },
        })
            .sort({ createdAt: -1 })
            .select("title slug createdAt");

        // Fetch the next blog post (newer than the current one)
        let nextPost = await Blog.findOne({
            createdAt: { $gt: blog.createdAt },
        })
            .sort({ createdAt: 1 })
            .select("title slug createdAt");

        // Convert to plain objects and format dates
        previousPost = previousPost ? previousPost.toObject() : null;
        nextPost = nextPost ? nextPost.toObject() : null;

        if (previousPost) previousPost.createdAt = moment(previousPost.createdAt).format("MMMM D, YYYY");
        if (nextPost) nextPost.createdAt = moment(nextPost.createdAt).format("MMMM D, YYYY");



        const facebook = await getSetting('facebook')
        const twitter = await getSetting('twitter')
        const vimeo = await getSetting('vimeo')
        const linkedin = await getSetting('linkedin')

        res.status(200).json({...data,social_data:[
            {
              id:1,
              link:facebook,
              icon:'fa-brands fa-facebook-f',
              title:'Facebook'
            },
            {
              id:2,
              link:twitter,
              icon:'fa-brands fa-twitter',
              title:'Twitter'
            },
            {
              id:3,
              link:linkedin,
              icon:'fa-brands fa-linkedin-in',
              title:'Linkedin'
            },
            {
              id:4,
              link:vimeo,
              icon:'fa-brands fa-vimeo-v',
              title:'Vimeo'
            },
          ],
          previousPost,
          nextPost,

        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};