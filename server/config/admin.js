const User = require("../models/user");

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  console.log(email);
  if (!email) return res.status(400).json({ message: "No User" });

  const isAdmin = await User.findOne({ email }).exec();
  if (isAdmin.role !== "admin") {
    return res.status(400).json({ message: "You are not an admin, 400" });
  } else {
    next();
  }
};

module.exports = isAdmin
