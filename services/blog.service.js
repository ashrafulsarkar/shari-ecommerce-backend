const Category = require("../model/Category");
const Blog = require("../model/Blogs");

// create blog service
exports.createBlogService = async (data) => {
  const blog = await Blog.create(data);
  const { _id: blogId, category } = blog;
  
  //Category Brand
  await Category.updateOne(
    { _id: category.id },
    { $push: { blogs: blogId } }
  );
  return blog;
};

// create all blog service
exports.addAllBlogService = async (data) => {
  await Blog.deleteMany();
  const blogs = await Blog.insertMany(data);
  for (const blog of blogs) {
    await Category.findByIdAndUpdate(blog.category.id, {
      $push: { blogs: blog._id },
    });
  }
  return blogs;
};


// get blog data
exports.getBlogService = async (id) => {
  const blog = await Blog.findById(id).populate({
    path: "reviews",
    populate: { path: "userId", select: "name email imageURL" },
  });
  return blog;
};

// get blog data
exports.getRelatedBlogService = async (blogId) => {
  const currentBlog = await Blog.findById(blogId);

  const relatedBlogs = await Blog.find({
    "category.name": currentBlog.category.name,
    _id: { $ne: blogId }, // Exclude the current blog ID
  });
  return relatedBlogs;
};

// update a blog
exports.updateBlogService = async (id, currBlog) => {
  // console.log('currBlog',currBlog)
  const blog = await Blog.findById(id);
  if (blog) {
    blog.title = currBlog.title;
    blog.slug = currBlog.slug;
    blog.img = currBlog.img;
    blog.description = currBlog.description;
    blog.category.name = currBlog.category.name;
    blog.category.id = currBlog.category.id;
    blog.tags = currBlog.tags;

    await blog.save();
  }

  return blog;
};


// delete Blogs
exports.deleteBlog = async (id) => {
  const result = await Blog.findByIdAndDelete(id)
  return result;
};