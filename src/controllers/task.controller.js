const Task = require("../models/task.model");
const { scheduleReminder } = require("../utils/reminder");
const { sendWebhook } = require("../utils/webhook");

// Create
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, tags } = req.body;

    const task = await Task.create({
      userId: req.user.userId, // keep it simple
      title,
      description,
      dueDate,
      category,
      tags,
    });

    scheduleReminder(task);

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get ALL tasks (NO FILTER → ALWAYS SHOW DATA)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // 🔥 KEY CHANGE
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get SINGLE task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Object.assign(task, req.body);
    await task.save();

    // reminder
    if (req.body.dueDate) {
      scheduleReminder(task);
    }

    // webhook
    if (req.body.status === "completed") {
      await sendWebhook({
        id: task._id,
        title: task.title,
        userId: task.userId,
        completedAt: new Date(),
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};