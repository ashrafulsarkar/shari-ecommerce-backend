const Type = require('../model/Type');
const typeService = require('../services/type.service');

// add a type 
exports.addType = async (req, res,next) => {
  try {
    const result = await typeService.addTypeService(req.body);
    res.status(200).json({
      status: "success",
      message: "Type created successfully!",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}

// add all Type
exports.addAllType = async (req,res,next) => {
  try {
    const result = await typeService.addAllTypeService(req.body);
    res.json({
      message:'Types added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get active Type
exports.getAllTypes = async (req,res,next) => {
  try {
    const result = await Type.find({},{name:1,description:1,status:1});
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get active Type
exports.getActiveTypes = async (req,res,next) => {
  try {
    const result = await typeService.getTypesService();
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// delete Type
exports.deleteType = async (req,res,next) => {
  try {
    await typeService.deleteTypesService(req.params.id);
    res.status(200).json({
      success:true,
      message:'Type delete successfully',
    })
  } catch (error) {
    next(error)
  }
}

// update category
exports.updateType = async (req,res,next) => {
  try {
    const result = await typeService.updateTypeService(req.params.id,req.body);
    res.status(200).json({
      status:true,
      message:'Type update successfully',
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// get single category
exports.getSingleType = async (req,res,next) => {
  try {
    const result = await typeService.getSingleTypeService(req.params.id);
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}