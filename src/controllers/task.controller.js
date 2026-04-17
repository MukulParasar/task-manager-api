const Task = require("../models/task.model");
const { scheduleReminder } = require("../utils/reminder");
const { sendWebhook } = require("../utils/webhook");

// Create
exports.createTask = async (req, res) => {
  const { title, description, dueDate, category, tags } = req.body;

  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    dueDate,
    category,
    tags,
  });

  scheduleReminder(task);

  res.json(task);
};

// Get all
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get one
exports.getTasks = async (req, res) => {
  const { category, tag } = req.query;

  let filter = { user: req.user.id };

  if (category) filter.category = category;
  if (tag) filter.tags = tag;

  const tasks = await Task.find(filter);

  res.json(tasks);
};

// Update
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ msg: "Task not found" });

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
      user: task.user,
      completedAt: new Date(),
    });
  }

  res.json(task);
};

// Delete
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId !== req.user.userId)
      return res.status(403).json({ message: "Forbidden" });

    await task.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};