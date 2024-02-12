const router = require('express').Router()
const verifyToken = require('../middleware/verifyJwt')
const controller = require('../controller/notification')

router.route('/get-notification')
    .get(verifyToken, controller.getNotification)

router.route('/update-notification/:id')
    .patch(verifyToken, controller.updateNotification)

module.exports = router