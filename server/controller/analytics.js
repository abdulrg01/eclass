const course = require("../models/course");
const order = require("../models/order");
const userModel = require("../models/user");
const analyticsData = require("../utils/analyticsGenerator");

//GET USER ANALYTICS __ ONLY ADMIN
const getUserAnalytics = async(req, res) => {
    const users = await analyticsData(userModel)

    if (!users) {
        return res.status(400).json({ message: "Error generating analytics:, error" })
    }

    res.status(200).json({
        success: true,
        users
    })
}

//GET COURSE ANALYTICS __ ONLY ADMIN
const getCoursesAnalytics = async(req, res) => {
    const courses = await analyticsData(course)

    if (!courses) {
        return res.status(400).json({ message: "Error generating analytics:, error" })
    }

    res.status(200).json({
        success: true,
        courses
    })
}

//GET ORDER ANALYTICS __ ONLY ADMIN
const getOrderAnalytics = async(req, res) => {
    const orders = await analyticsData(order)

    if (!orders) {
        return res.status(400).json({ message: "Error generating analytics:, error" })
    }

    res.status(200).json({
        success: true,
        orders
    })
}

module.exports = { 
    getUserAnalytics, 
    getCoursesAnalytics,
    getOrderAnalytics
}