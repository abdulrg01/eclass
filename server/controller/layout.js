const Layout = require("../models/layout");
const cloudinary = require("cloudinary");

const createLayout = async (req, res) => {
  const { type } = req.body;

  const isTypeExist = await Layout.findOne({ type }).exec();
  if (isTypeExist) {
    return res.status(400).json({ message: `${type} already exist, 404` });
  }

  if (type === "Banner") {
    const { image, title, subTitle } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout",
    });

    const banner = {
      type: "Banner",
      banner: {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        title,
        subTitle,
      },
    };
    await Layout.create(banner);
  }

  if (type === "FAQ") {
    const { faq } = req.body;
    const faqItems = await Promise.all(
      faq.map(async (item) => {
        return {
          question: item.question,
          answer: item.answer,
        };
      })
    );
    await Layout.create({ type: "FAQ", faq: faqItems });
  }
  if (type === "Categories") {
    const { categories } = req.body;
    const categoriesItems = await Promise.all(
      categories.map(async (item) => {
        return {
          title: item.title,
        };
      })
    );
    await Layout.create({ type: "Categories", categories: categoriesItems });
  }

  res.status(200).json({
    success: true,
    message: "Layout created successfully",
  });
};

//EDITH LAYOUT
const edithLayout = async (req, res) => {
  const { type } = req.body;

  if (type === "Banner") {
    const bannerData = await Layout.findOne({ type: "Banner" });

    const { image, title, subTitle } = req.body;

    const data = image.startsWith("https")
      ? bannerData
      : await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

    const banner = {
      type: "Banner",
      image: {
        public_id: image.startsWith("https")
          ? bannerData.banner.image.public_id
          : data?.public_id,
        url: image.startsWith("https")
          ? bannerData.banner.image.url
          : data?.secure_url,
      },
      title,
      subTitle,
    };

    await Layout.findByIdAndUpdate(bannerData._id, { banner });
  }

  if (type === "FAQ") {
    const { faq } = req.body;
    const faqItem = await Layout.findOne({ type: "FAQ" });
    const faqItems = await Promise.all(
      faq.map(async (item) => {
        return {
          question: item.question,
          answer: item.answer,
        };
      })
    );
    await Layout.findByIdAndUpdate(faqItem._id, { type: "FAQ", faq: faqItems });
  }
  if (type === "Categories") {
    const { categories } = req.body;
    const category = await Layout.findOne({ type: "Categories" });
    const categoriesItems = await Promise.all(
      categories.map(async (item) => {
        return {
          title: item.title,
        };
      })
    );
    await Layout.findByIdAndUpdate(category._id, {
      type: "Categories",
      categories: categoriesItems,
    });
  }

  res.status(200).json({
    success: true,
    message: "Layout updated successfully",
  });
};

//GET LAYOUT BY TYPE
const getLayoutByType = async (req, res) => {
  const { type } = req.params;
  const layout = await Layout.findOne({ type });
  if (!layout) return res.status(400).json({ message: "Layout not found" });

  res.status(200).json({
    success: true,
    layout,
  });
};

module.exports = { createLayout, edithLayout, getLayoutByType };
