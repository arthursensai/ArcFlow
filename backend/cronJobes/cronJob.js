const cron = require('node-cron');
const Habit = require('../models/Habit');

// Function to reset todos and update history
async function resetDailyTodos() {
    try {
        console.log('Starting daily todo reset...');
        
        const today = new Date().toISOString().slice(0, 10);
        const habits = await Habit.find({});
        
        console.log(`Found ${habits.length} habits to process`);
        console.log(`Today's date: ${today}`);
        
        let processedCount = 0;
        let totalCompletedTodos = 0;

        for (const habit of habits) {
            try {
                let completedTodos = [];
                let hasChanges = false;

                // Process todos and mark completed ones
                habit.todos.forEach(todo => {
                    if (todo.completed) {
                        completedTodos.push(todo.title);
                        todo.completed = false;
                        hasChanges = true;
                    }
                });

                // Only save if there were changes
                if (hasChanges) {
                    // If there are completed todos, record them in history
                    if (completedTodos.length > 0) {
                        // Check if today's entry already exists
                        const existingEntryIndex = habit.history.findIndex(entry => entry.date === today);
                        
                        if (existingEntryIndex >= 0) {
                            // Update existing entry - just mark that todos were completed
                            console.log(`📝 Updated existing entry for habit: ${habit.title || habit._id}`);
                        } else {
                            // Create new entry for today
                            habit.history.push({
                                date: today,
                                minutesSpent: 0,
                                progress: 0,
                                todos: []
                            });
                        }
                        
                        totalCompletedTodos += completedTodos.length;
                        console.log(`✅ Reset ${completedTodos.length} todos for habit: ${habit.title || habit._id}`);
                    }

                    await habit.save();
                }

                processedCount++;

            } catch (error) {
                console.error(`❌ Error processing habit ${habit._id}:`, error.message);
                console.error(`Full error:`, error);
            }
        }

        console.log(`✨ Todo reset completed! Processed ${processedCount}/${habits.length} habits, archived ${totalCompletedTodos} completed todos`);

    } catch (error) {
        console.error('❌ Error in daily todo reset:', error.message);
    }
}

const dailyJob = cron.schedule('0 0 * * *', async () => {
    console.log('🕛 Running daily todo reset at midnight...');
    await resetDailyTodos();
}, {
    scheduled: true,
    timezone: process.env.TIMEZONE || "UTC"
});

// Alternative: Run at a specific time (example: 11:59 PM)
const alternativeJob = cron.schedule('0 59 23 * * *', async () => {
    console.log('🕚 Running daily todo reset at 11:59 PM...');
    await resetDailyTodos();
}, {
    scheduled: false // disabled by default
});

// Function to start the cron job
const startDailyReset = () => {
    console.log('🚀 Daily todo reset cron job started!');
    dailyJob.start();
}

// Function to stop the cron job
const stopDailyReset = () => {
    console.log('⏹️  Daily todo reset cron job stopped!');
    dailyJob.stop();
}

// Manual trigger function (for testing)
const triggerManualReset = async () => {
    console.log('🔧 Manual reset trigger activated...');
    await resetDailyTodos();
}

// Auto-start the cron job when this module is required
console.log('🚀 Daily todo reset cron job started automatically!');

module.exports = {
    startDailyReset,
    stopDailyReset,
    triggerManualReset,
    resetDailyTodos
};