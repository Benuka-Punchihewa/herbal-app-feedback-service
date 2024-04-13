const { StatusCodes } = require("http-status-codes");
const Feedback = require("./feedback.model");
const FeedbackService = require("./feedback.service");
const NotFoundError = require("../error/error.classes/NotFoundError");
const UnauthorizedError = require("../error/error.classes/UnauthorizedError");

const createFeedback = async (req, res) => {
  const auth = req.auth;
  const { rating, description } = req.body;
  const { productId } = req.params;

  const feedback = new Feedback({
    user: {
      _id: auth.user._id,
      name: auth.user.name,
    },
    product: {
      _id: productId,
    },
    rating,
    description,
  });

  const dbFeedback = await FeedbackService.save(feedback);

  return res.status(StatusCodes.CREATED).json(dbFeedback);
};

const getFeedbacks = async (req, res) => {
  const { productId } = req.params;
  const dbFeedbacks = await FeedbackService.find({ "product._id": productId });
  return res.status(StatusCodes.OK).json(dbFeedbacks);
};

const deleteFeedback = async (req, res) => {
  const auth = req.auth;
  const { id } = req.params;

  // Check if the feedback exists
  const feedback = await FeedbackService.findById(id);
  if (!feedback) {
    throw new NotFoundError("Feedback not found");
  }

  // Check if the user is authorized to delete the feedback
  if (feedback.user._id.toString() !== auth.user._id.toString())
    throw new UnauthorizedError("You're unauthorized to access this resource!");

  // Delete the feedback
  await FeedbackService.deleteOne({ _id: id });

  return res.status(StatusCodes.OK).json();
};

module.exports = {
  createFeedback,
  getFeedbacks,
  deleteFeedback,
};
