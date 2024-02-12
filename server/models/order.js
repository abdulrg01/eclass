const mongoose = require("mongoose");

const order = new mongoose.Schema(
  {
    courseId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    payment_info: {
      type: Object,
      //require: true
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Order", order)
