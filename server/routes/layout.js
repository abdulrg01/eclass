const router = require("express").Router();
const controller = require("../controller/layout");
const verifyToken = require("../middleware/verifyJwt");

router.route("/create-layout").post(verifyToken, controller.createLayout);

router.route("/edith-layout").patch(verifyToken, controller.edithLayout);

router.route("/get-layout/:type").get(controller.getLayoutByType);

module.exports = router;
