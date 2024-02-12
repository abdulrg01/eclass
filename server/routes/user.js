const e = require("express");
const router = e.Router();
const controller = require("../controller/user");
const verifyJwt = require("../middleware/verifyJwt");
const loginLimiter = require("../middleware/loginLimiter");

router.route("/registration").post(controller.newUser);

router.route("/activate-user").post(controller.activateUser);

router.route("/login").post(loginLimiter, controller.login);

router.route("/refresh").get(controller.refresh);

router.route("/logout").post(verifyJwt, controller.logout);

router.route("/get-user-info").get(verifyJwt, controller.getUserInfo);

router.route("/social-auth").post(controller.socialAuth);

router.route("/updateUser").patch(verifyJwt, controller.updateUserinfo);

router
  .route("/update-user-Password")
  .patch(verifyJwt, controller.updatePassword);

router.route("/update-user-role").patch(verifyJwt, controller.updateUserRole);

router.route("/set-user-image").put(verifyJwt, controller.updateProfilePicture);

router.route("/").get(verifyJwt, controller.all);

router.route("/delete-user/:id").delete(verifyJwt, controller.deleteUser);

module.exports = router;
