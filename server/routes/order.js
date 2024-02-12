const router = require("express").Router();
const verifyToken = require("../middleware/verifyJwt");
const controller = require("../controller/order");

router.route("/create-order").post(verifyToken, controller.newOrder);

router.route("/get-orders").get(verifyToken, controller.all);

router
  .route("/payment/stripePublishableKey")
  .get(controller.sendStripePublishableKey);

router.route("/payment").post(verifyToken, controller.newPayment);

module.exports = router;
