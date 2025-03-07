const ApiError = require('../errors/api-error');
const BlogCategory = require('../model/BlogCategory');
const Blogs = require('../model/Blogs');

// create category service
exports.createCategoryService = async (data) => {
  const category = await BlogCategory.create(data);
  return category;
}

// create all category service
exports.addAllCategoryService = async (data) => {
  await BlogCategory.deleteMany()
  const category = await BlogCategory.insertMany(data);
  return category;
}

// get all show category service
exports.getShowCategoryServices = async () => {
  const category = await BlogCategory.find({status:'Show'}).populate('blogs');
  return category;
}

// get all category
exports.getAllCategoryServices = async () => {
  const category = await Category.find({})
  return category;
}

// get type of category service
exports.deleteCategoryService = async (id) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
}

// update category
exports.updateCategoryService = async (id,payload) => {
  const isExist = await Category.findOne({ _id:id })

  if (!isExist) {
    throw new ApiError(404, 'Category not found !')
  }

  const result = await Category.findOneAndUpdate({ _id:id }, payload, {
    new: true,
  })
  return result
}

// get single category
exports.getSingleCategoryService = async (id) => {
  const result = await Category.findById(id);
  return result;
}