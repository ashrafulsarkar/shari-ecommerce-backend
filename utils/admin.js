const bcrypt = require('bcryptjs');
const admins = [
  {
    name:'Admin',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin@123456"),
    phone: "708-628-3122",
    role: "Admin",
    joiningData: new Date()
  },
];

module.exports = admins;
