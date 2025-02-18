const ApiError = require('../errors/api-error');
const Type = require('../model/Type');

// addTypeService
module.exports.addTypeService = async (data) => {
  const type = await Type.create(data);
  return type
}

// create all Types service
exports.addAllTypeService = async (data) => {
  await Type.deleteMany()
  const types = await Type.insertMany(data);
  return types;
}


// get all Types service
exports.getTypesService = async () => {
  const types = await Type.find({status:'active'}).populate('products');
  return types;
}

// get all Types service
exports.deleteTypesService = async (id) => {
  const types = await Type.findByIdAndDelete(id);
  return types;
}

// update category
exports.updateTypeService = async (id,payload) => {
  const isExist = await Type.findOne({ _id:id })

  if (!isExist) {
    throw new ApiError(404, 'Type not found !')
  }

  const result = await Type.findOneAndUpdate({ _id:id }, payload, {
    new: true,
  })
  return result
}

// get single category
exports.getSingleTypeService = async (id) => {
  const result = await Type.findById(id);
  return result;
}