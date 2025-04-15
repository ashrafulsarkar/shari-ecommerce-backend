const Brand = require("../model/Brand");
const Type = require("../model/Type");
const Category = require("../model/Category");
const Product = require("../model/Products");
const BusinessSetting = require("../model/BusinessSetting");
const { default: mongoose } = require("mongoose");

// create product service
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand, type, category } = product;
  //update Brand
  await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  //update type
  await Type.updateOne(
    { _id: type.id },
    { $push: { products: productId } }
  );
  //Category Brand
  await Category.updateOne(
    { _id: category.id },
    { $push: { products: productId } }
  );
  return product;
};

// create all product service
exports.addAllProductService = async (data) => {
  await Product.deleteMany();
  const products = await Product.insertMany(data);
  for (const product of products) {
    await Brand.findByIdAndUpdate(product.brand.id, {
      $push: { products: product._id },
    });
    await Type.findByIdAndUpdate(product.type.id, {
      $push: { products: product._id },
    });
    await Category.findByIdAndUpdate(product.category.id, {
      $push: { products: product._id },
    });
  }
  return products;
};

// get product data
exports.getAllProductsService = async () => {
  const products = await Product.find({}).populate("reviews");
  return products;
};

// get type of product service
exports.getProductTypeService = async (req) => {
  const type = req.params.type;
  const query = req.query;
  let products;
  if (query.new === "true") {
    products = await Product.find({ productType: type })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("reviews");
  } else if (query.featured === "true") {
    products = await Product.find({
      productType: type,
      featured: true,
    }).populate("reviews");
  } else if (query.topSellers === "true") {
    products = await Product.find({ productType: type })
      .sort({ sellCount: -1 })
      .limit(8)
      .populate("reviews");
  } else {
    products = await Product.find({ productType: type }).populate("reviews");
  }
  return products;
};

// get offer product service
exports.getOfferTimerProductService = async (query) => {
  const products = await Product.find({
    productType: query,
    "offerDate.endDate": { $gt: new Date() },
  }).populate("reviews");
  return products;
};

// get popular product service by type
exports.getPopularProductServiceByType = async (type) => {
  let get_type;

  // jo
  if (type === 'popular') {
    get_type = await BusinessSetting.findOne({
      key: 'popular_type'
    })
  }
// lee
  if (type === 'typeTopSeller') {
    get_type = await BusinessSetting.findOne({
      key: 'typeTopSeller'
    })
  }

  // types product
  if (type === 'typeFeatureProduct') {
    // 1. Fetch all types
    const allTypes = await Type.find();

    // 2. Get all matching products (that belong to any of the types)
    const allTypeIds = allTypes.map(type => type._id);

    const allProducts = await Product.find({ 'type.id': { $in: allTypeIds } })
      .select('-description -additionalInformation -reviews -imageURLs')
      .populate('type.id'); // populate type info from Type model

    // 3. Combine and return
    return allProducts;

  }

  // Shop Trending Collection section
  if (type === 'ja') {
    const limit  = await BusinessSetting.findOne({
      key: 'limit'
    })

    let products = await Product.find({ ja: true })
    .sort({ "reviews.length": -1 })
    .limit(Number(limit.value))
    .select('-description -additionalInformation -reviews -imageURLs');

  if (products.length === 0) {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    // First: try to get products from the last 15 days
     products = await Product.find({
      createdAt: { $gte: fifteenDaysAgo }
    })
      .sort({ createdAt: -1 }) // Most recent first
      .limit(Number(limit.value))
      .select('-description -additionalInformation -reviews -imageURLs');

    // If no products found, fallback to latest products
    if (products.length === 0) {
      products = await Product.find({})
        .sort({ createdAt: -1 }) // Most recent first
        .limit(Number(limit.value))
        .select('-description -additionalInformation -reviews -imageURLs');
    }
  }

  return products;

  }


  if (type === 'lee') {
    const products = await Product.find({ lee: true })
      .sort({ "reviews.length": -1 })
      .limit(100)
      .select('-description -additionalInformation -reviews -imageURLs  ');
    return products;
  }


  if (get_type) {
    const products = await Product.find({ "brand.id": new mongoose.Types.ObjectId(get_type.value.id) })
      .sort({ "reviews.length": -1 })
      .limit(15)
      .select('-description -additionalInformation -reviews -imageURLs  ');
    return products;
  } else {
    return []
  }

};

exports.getTopRatedProductService = async () => {
  const products = await Product.find({
    reviews: { $exists: true, $ne: [] },
  }).populate("reviews");

  const topRatedProducts = products.map((product) => {
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / product.reviews.length;

    return {
      ...product.toObject(),
      rating: averageRating,
    };
  });

  topRatedProducts.sort((a, b) => b.rating - a.rating);

  return topRatedProducts;
};

// get product data
exports.getProductService = async (id) => {
  const product = await Product.findById(id).populate({
    path: "reviews",
    populate: { path: "userId", select: "name email imageURL" },
  });
  return product;
};

// get product data
exports.getRelatedProductService = async (productId) => {
  const currentProduct = await Product.findById(productId);

  const relatedProducts = await Product.find({
    "category.name": currentProduct?.category?.name,
    _id: { $ne: productId }, // Exclude the current product ID
  });
  return relatedProducts;
};

// update a product
exports.updateProductService = async (id, currProduct) => {
  console.log('currProduct',currProduct.type)
  const product = await Product.findById(id);
  if (product) {
    product.title = currProduct.title;
    product.brand.name = currProduct.brand.name;
    product.brand.id = currProduct.brand.id;
    console.log(product?.type)
    if ( currProduct?.type) {
      product.type.name = currProduct.type.name;
      product.type.id = currProduct.type.id;
    }

    product.category.name = currProduct.category.name;
    product.category.id = currProduct.category.id;
    product.sku = currProduct.sku;
    product.img = currProduct.img;
    product.slug = currProduct.slug;
    product.sizes = currProduct.sizes;
    product.imageURLs = currProduct.imageURLs;
    product.tags = currProduct.tags;
    product.parent = currProduct.parent;
    product.children = currProduct.children;
    product.price = currProduct.price;
    product.discount = currProduct.discount;
    product.quantity = currProduct.quantity;
    product.status = currProduct.status;
    product.productType = currProduct.productType;
    product.description = currProduct.description;
    product.additionalInformation = currProduct.additionalInformation;

    await product.save();
  }

  return product;
};



// get Reviews Products
exports.getReviewsProducts = async () => {
  const result = await Product.find({
    reviews: { $exists: true, $ne: [] },
  })
    .populate({
      path: "reviews",
      populate: { path: "userId", select: "name email imageURL" },
    });

  const products = result.filter(p => p.reviews.length > 0)

  return products;
};

// get Reviews Products
exports.getStockOutProducts = async () => {
  const result = await Product.find({ status: "out-of-stock" }).sort({ createdAt: -1 })
  return result;
};

// get Reviews Products
exports.deleteProduct = async (id) => {
  const result = await Product.findByIdAndDelete(id)
  return result;
};