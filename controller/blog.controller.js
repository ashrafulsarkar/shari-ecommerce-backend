const blogServices = require("../services/blog.service");
const Blog = require("../model/Blogs");


// add blog
exports.addBlog = async (req, res,next) => {
  console.log('blog--->',req.body);
  try {
    const result = await blogServices.createBlogService({
      ...req.body,
    });

    console.log('blog-result',result)
 
    res.status(200).json({
      success:true,
      status: "success",
      message: "Blog created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};


// add all blog
module.exports.addAllBlogs = async (req,res,next) => {
  try {
    const result = await blogServices.addAllBlogService(req.body);
    res.json({
      message:'Blogs added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get all blogs
exports.getAllBlogs = async (req,res,next) => {
  try {
    const result = await blogServices.getAllBlogsService();
    res.status(200).json({
      success:true,
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// getSingleBlog
exports.getSingleBlog = async (req,res,next) => {
  try {
    const blog = await blogServices.getBlogService(req.params.id)
    res.json(blog)
  } catch (error) {
    next(error)
  }
}

// get Related blog
exports.getRelatedBlogs = async (req,res,next) => {
  try {
    const blogs = await blogServices.getRelatedBlogService(req.params.id)
    res.status(200).json({
      success:true, 
      data:blogs,
    })
  } catch (error) {
    next(error)
  }
}

// update Blog
exports.updateBlog = async (req, res,next) => {
  try {
    const blog = await blogServices.updateBlogService(req.params.id,req.body)
    res.send({ data: blog, message: "Blog updated successfully!" });
  } catch (error) {
    next(error)
  }
};



// update Blog
exports.deleteBlog = async (req, res,next) => {
  try {
    await blogServices.deleteBlog(req.params.id);
    res.status(200).json({
      message:'Blog delete successfully'
    })
  } catch (error) {
    next(error)
  }
};