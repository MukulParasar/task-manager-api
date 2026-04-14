const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);