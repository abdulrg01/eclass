const mongoose = require("mongoose");

const review = new mongoose.Schema(
  {
    user: { type: Object },
    ratings: { type: Number, default: 0 },
    reviews: { type: String },
    commentReplies: [{ type: Object }],
  },
  { timestamps: true }
);

const link = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
});

const comment = new mongoose.Schema(
  {
    user: { type: Object },
    question: { type: String },
    questionReplies: [{ type: Object }],
  },
  { timestamps: true }
);

const courseContent = new mongoose.Schema({
  videoUrl: { type: String },
  title: { type: String },
  videoSection: { type: String },
  description: { type: String },
  videoLength: { type: Number },
  videoPlayer: { type: String },
  links: [link],
  suggestion: { type: String },
  questions: [comment],
});

const course = new mongoose.Schema(
  {
    title: { type: String, require: true },
    courseData: [courseContent],
    name: { type: String, require: true },
    categories: { type: String, require: true },
    description: { type: String },
    price: { type: Number },
    estimatedPrice: { type: Number },
    thumbnail: {
      publicId: String,
      url: String,
    },
    tags: { type: String },
    level: { type: String },
    demoUrl: { type: String, require: true },
    benefits: [{ type: Object }],
    prerequisites: [{ type: Object }],
    reviews: [review],
    ratings: { type: Number, default: 0 },
    purchase: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", course);
