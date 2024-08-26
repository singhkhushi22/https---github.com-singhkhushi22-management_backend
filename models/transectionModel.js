const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const transectionModel = mongoose.model("Transection", transectionSchema);
module.exports = transectionModel;

