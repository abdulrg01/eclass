const router = require('express').Router()
const controller = require("../controller/course")
const verifyToken = require('../middleware/verifyJwt')

router.route("/create-course")
    .post(verifyToken, controller.uploadCourse)

router.route("/edit-course/:id")
    .patch(verifyToken, controller.edithCourse)

router.route("/get-course/:id")
    .get(controller.getSingleCourse)

router.route("/get-courses")
    .get(controller.getAllCourses)

//only admin    
router.route("/get-admin-courses")
    .get(verifyToken, controller.getAdminCourses)

router.route("/get-course-content/:id")
    .get(verifyToken, controller.getCourseByUser)

router.route("/add-question")
    .patch(verifyToken, controller.addQuestion)

router.route("/add-answer")
    .patch(verifyToken, controller.addAnswer)

router.route("/add-review/:id")
    .patch(verifyToken, controller.addReview)

//only admin    
router.route("/add-replay")
    .patch(verifyToken, controller.addReplayToReview)

router.route("/getVdoCipherOTP")
    .post(controller.generateVideoUrl)

//only admin
router.route("/delete-course/:id")
    .delete(verifyToken, controller.deleteCourse)

module.exports = router