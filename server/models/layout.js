const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema(
    {
        question: { type: String },
        answer: { type: String },
    }
)

const category = new mongoose.Schema(
    {
        title: { type: String },
    }
)

const bannerImage = new mongoose.Schema(
    {
        public_id: { type: String },
        url: { type: String }
    }
)

const layout = new mongoose.Schema(
    {
        type: { type: String },
        faq: [faqSchema],
        categories: [category],
        banner: {
            image: bannerImage,
            title: { type: String },
            subTitle: { type: String },
        }
    }
)

module.exports = mongoose.model("Layout", layout)