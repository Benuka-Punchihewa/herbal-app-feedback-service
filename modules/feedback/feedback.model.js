const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    product: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
    },
    description: {
      type: String,
      required: [true, "Feedback is required!"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
