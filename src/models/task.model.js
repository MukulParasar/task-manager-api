const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    title: String,
    description: String,

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    dueDate: Date,

    category: {
      type: String,
      default: "General",
    },

    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);