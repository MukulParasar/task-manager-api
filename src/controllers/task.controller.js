const Task = require("../models/task.model");

// Create
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.userId,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
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
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId !== req.user.userId)
      return res.status(404).json({ message: "Not found" });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId !== req.user.userId)
      return res.status(403).json({ message: "Forbidden" });

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
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