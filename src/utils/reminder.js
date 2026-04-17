const scheduleReminder = (task) => {
  if (!task.dueDate) return;

  const reminderTime = new Date(task.dueDate).getTime() - 60 * 60 * 1000;
  const delay = reminderTime - Date.now();

  if (delay <= 0) return;

  setTimeout(() => {
    console.log(`🔔 Reminder: Task "${task.title}" is due soon!`);
  }, delay);
};

module.exports = { scheduleReminder };