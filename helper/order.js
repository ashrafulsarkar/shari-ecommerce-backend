const Order = require("../model/Order");


module.exports = {
  getOrderDetails: async (filter) => {
    console.log("user data");
    try {
      const data = await Order.findOne(filter)
      return data;
    } catch (err) {
      return null;
    }
  },
  updateorder: async (filter, body) => {
    try {
      return await Order.findOneAndUpdate(filter, body, { new: true });
    } catch (err) {
      return null;
    }
  },

};
