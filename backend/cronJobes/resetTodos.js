const cron = require('node-cron');
const Habit = require('../models/Habit');

cron.schedule('0 0 * * *', async () => {
  const today = new Date().toISOString().slice(0, 10);
  const habits = await Habit.find({});

  for (const habit of habits) {
    let completedTodos = [];

    habit.todos.forEach(todo => {
      if (todo.completed) {
        completedTodos.push(todo.title); // أو todo._id إذا كنت تستعمل ID
        todo.completed = false;
      }
    });

    if (completedTodos.length > 0) {
      habit.history.set(today, completedTodos);
    }

    await habit.save();
  }

  console.log(`[${today}] Todos reset and history updated.`);
});

console.log('⏰ Cron job for resetting todos scheduled.');