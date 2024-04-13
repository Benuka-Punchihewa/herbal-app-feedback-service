const express = require("express");
const FeedbackController = require("./feedback.controller");
const AuthMiddleware = require("../auth/auth.middleware");
const constants = require("../../constants");

const router = express.Router();

router.post(
  "/:productId",
  AuthMiddleware.authorize([constants.ACCESS.ROLES.CUSTOMER]),
  FeedbackController.createFeedback
);

router.get(
  "/:productId",
  AuthMiddleware.authorize([constants.ACCESS.ROLES.CUSTOMER]),
  FeedbackController.getFeedbacks
);

router.delete(
  "/:id",
  AuthMiddleware.authorize([constants.ACCESS.ROLES.CUSTOMER]),
  FeedbackController.deleteFeedback
);

module.exports = router;
