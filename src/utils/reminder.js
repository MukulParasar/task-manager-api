const scheduleReminder = (task) => {
  if (!task.dueDate) {
    console.log("❌ No dueDate provided, skipping reminder");
    return;
  }

  const now = Date.now();
  const dueTime = new Date(task.dueDate).getTime();

  // 🔥 For testing: reminder 10 seconds before dueDate
  const reminderTime = dueTime - 10 * 1000;

  const delay = reminderTime - now;

  console.log("📌 Scheduling reminder...");
  console.log("Current Time:", new Date(now));
  console.log("Due Time:", new Date(dueTime));
  console.log("Reminder Time:", new Date(reminderTime));
  console.log("Delay (ms):", delay);

  if (delay <= 0) {
    console.log("⚠️ Reminder time already passed, skipping...");
    return;
  }

  setTimeout(() => {
    console.log(`🔔 Reminder: Task "${task.title}" is due soon!`);
  }, delay);
};

module.exports = { scheduleReminder };