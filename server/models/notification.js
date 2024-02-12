const mongoose = require("mongoose");

const notification = new mongoose.Schema(
  {
    title: { type: String, require: true },
    message: { type: String, require: true },
    status: {
      type: String,
      require: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

 module.exports = mongoose.model("Notification", notification);
