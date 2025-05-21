require("dotenv").config();
const express = require("express");
const SSLCommerzPayment = require('sslcommerz-lts')
const bodyParser = require('body-parser')
const timeout = require('connect-timeout');
const app = express();
const path = require('path');
const cors = require("cors");
const connectDB = require("./config/db");
const { secret } = require("./config/secret");
const PORT = secret.port || 7000;
const morgan = require('morgan')
// error handler
const globalErrorHandler = require("./middleware/global-error-handler");
// routes
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const blogCategoryRoutes = require("./routes/blog-category.routes");
const blogPostRoutes = require("./routes/Blog.routes");
const brandRoutes = require("./routes/brand.routes");
const typeRoutes = require("./routes/type.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");
// const uploadRouter = require('./routes/uploadFile.routes');
const cloudinaryRoutes = require("./routes/cloudinary.routes");
const albumRoutes = require("./routes/album.routes");
const businessSettingRoutes = require("./routes/businessSetting.routes");
const commentRoutes = require("./routes/Comment.routes");
const SSLCommerzeRoutes = require("./routes/SSLCommerze.routes");
const subscribeRoutes = require("./routes/subscribe.routes"); // adjust path if needed
const contactRoutes = require('./routes/contactRoutes.routes');
// middleware
app.use(timeout('300s'));
app.use(cors());
// app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// connect database
connectDB();
app.use('/api/contact', contactRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/type", typeRoutes);
app.use("/api/product", productRoutes);
// app.use('/api/upload',uploadRouter);
app.use("/api/order", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

// blog category
app.use("/api/blog", blogCategoryRoutes);

// blog post
app.use("/api/blog_post", blogPostRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/business_setting", businessSettingRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/sslcommerze", SSLCommerzeRoutes);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// global error handler
app.use(globalErrorHandler);
//* handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

module.exports = app;
