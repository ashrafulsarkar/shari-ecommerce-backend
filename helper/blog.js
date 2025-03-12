const Blog = require("../model/Blog");
const moment = require("moment"); // Ensure moment.js is installed

module.exports = {
  getListBlog: async ({
    page = 1,
    limit = 2,
    title = "",
    tag = "",
    category = "",
    pagination = "true",
    resent_post = false,
    status = "",
  }) => {
    let filter = {};

    if (status) filter.status = status;
    if (title) filter.title = { $regex: title, $options: "i" };
    if (tag) filter.tags = { $elemMatch: { $regex: tag, $options: "i" } };

    // Add category filter
    if (category) {
      filter["category.name"] = { $regex: category, $options: "i" };
    }

    if (resent_post) {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      filter.createdAt = { $gte: sevenDaysAgo };
    }

    try {
      let parsedPagination = JSON.parse(pagination);

      let blog = await Blog.paginate(filter, {
        page: page,
        limit: limit,
        pagination: parsedPagination,
        sort: { createdAt: -1 },
        populate: [
          { path: "created_by", select: "name" },
          { path: "category.id", select: "name" }, // Populate category details if needed
        ],
      });

      // Format `createdAt` date for each blog
      blog.docs = blog.docs.map((post) => ({
        ...post._doc,
        createdAt: moment(post.createdAt).format("MMMM D, YYYY"), // Example: January 20, 2023
      }));

      return blog || { docs: [], totalDocs: 0, message: "No blogs found" };
    } catch (err) {
      return { error: "Something went wrong", details: err.message };
    }
  },
};
