const router = require('express').Router()
const controller = require("../controller/analytics")
const verifyToken = require('../middleware/verifyJwt')

router.route("/get-user-analytics")
    .get(verifyToken, controller.getUserAnalytics)

router.route("/get-courses-analytics")
    .get(verifyToken, controller.getCoursesAnalytics)

router.route("/get-orders-analytics")
    .get(verifyToken, controller.getOrderAnalytics)

module.exports = router