
const moment = require("moment");
const Comment = require("../model/Comment");


// Create a Comment
exports.createComment = async (req, res) => {
    try {
        const { blogId, message,created_by } = req.body;
    if (!blogId ||!message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newComment = new Comment({ blogId, message,created_by });
    await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Create a Comment
exports.getCommentByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10

        const options = {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          sort: { createdAt: -1 }, // Sort by latest comments
          populate: {
            path: "created_by", // Populate User data
            select: "name email imageURL", // Select only required fields
          },
        };

        const result = await Comment.paginate({ blogId }, options);

        res.json({
          totalComments: result.totalDocs,
          totalPages: result.totalPages,
          currentPage: result.page,
          comments: result.docs.map((comment) => ({
            _id: comment._id,
            blogId: comment.blogId,
            created_by: comment.created_by
              ? {
                  _id: comment.created_by._id,
                  name: comment.created_by.name,
                  email: comment.created_by.email,
                  imageURL: comment.created_by.imageURL || null,
                }
              : null,
            message: comment.message,
            createdAt: moment(comment.createdAt).format("DD MMM, YYYY [at] h:mma"),
          })),
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

