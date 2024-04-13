const Feedback = require("./feedback.model");

const save = async (Feedback) => {
  return Feedback.save();
};

const find = async (queryObj) => {
  return Feedback.find(queryObj);
};

const findById = async (id) => {
  return Feedback.findById(id);
};

const deleteOne = async (queryObj) => {
  return Feedback.findOneAndDelete(queryObj);
};
module.exports = {
  save,
  find,
  findById,
  deleteOne,
};
