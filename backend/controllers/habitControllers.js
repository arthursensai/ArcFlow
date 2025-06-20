const Habit = require('../models/Habit');
const Todo = require('../models/Todo');
const { habitSchema } = require('../Validators/habitValidation');

//get all habits
const habits_get = async (req, res) => {
    const userID = req.user;
    try {
        const habits = await Habit.getAllHabits(userID);
        return res.status(200).json({ habits });
    } catch (err){
        return res.status(400).json({ err: err });
    }
};

//get a habit
const habit_get = async (req, res) => {
    const userID = req.user;
    const habitID = req.params.id;

    if(!habitID)  return res.status(400).json({ error: 'No valid habitID'});

    try {
        const habit = await Habit.getHabitByID(habitID);
        return res.status(200).json({ habit });
    } catch (err) {
        return res.status(401).json({ err: "Habit not found or DB error" });
    };
};

//create a habit
const habit_post = async (req, res) => {
    const userID = req.user;

    const { error, value } = habitSchema.validate(req.body);

    if(error) {
        return res.status(400).json({ errorDetails: {
        context: error.details[0].path,
        message: error.details[0].message
    }})};

    const date = new Date();
    const startDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const { title, description } = value;
    
    const habitData = {
        userID: userID,
        title: title,
        description: description,
        startDate: startDate,
        streak: 0,
        totalMinutes: 0,
    }

    try {
        const habit = await Habit.create(habitData);
        return res.status(201).json({ habit });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

//delete a habit
const habit_delete = async (req, res) => {
    const userID = req.user;
    const habitID = req.params.id;
    try {
        const deletedHabit = await Habit.deleteHabit(habitID, userID);
        return res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to delete the habit'});
    }
};

//update todo completion
const updateTodoCompletion = async (req, res) => {
  try {
    const userID = req.user;
    const { habitID } = req.cookies;
    const { todoID, completed } = req.body;

    if (!userID) return res.status(400).json({ loggedIn: false });
    if (!habitID) return res.status(400).json({ err: "No valid habit." });

    const result = await Habit.updateTodoCompletion(habitID, todoID, completed);
    return res.status(200).json({ message: "Todo updated", result });
  } catch (err) {
    return res.status(500).json({ err: "Failed to update todo", details: err.message });
  }
};

//update total minutes
const updateTotalMinutes = async (req, res) => {
    try {
        const userID = req.user;
        const { habitID } = req.cookies;
        const { minutesToAdd } = req.body;
        
        if (!userID) return res.status(400).json({ loggedIn: false });
        if (!habitID) return res.status(400).json({ err: "No valid habit." });
        
        const result = await Habit.updateTotalMinutes(habitID, Math.round(minutesToAdd));
        return res.status(200).json({ message: "Todo updated", result });
    } catch (err) {
        return res.status(500).json({ err: "Failed to update todo", details: err.message });
    }
};

//I should add a trackDay function that exepts the 'habitID', date, totalWorked minutes, the percentage of worked to do
//For totalWorked minutes in the frontend, i'll make it so whenever the pomodoro timer finishes, it sents two requests one to add those totolWorked Minutes to the habit and one for the specific day for a better tracking
//for the percentage, i'll set a simple function in the backend that get triggers whenever a todo get marked, increase the percentage if it's done, and decrease it if it's undone
//e.g 5todos with 3completed ==> percentage of the specific day will be 3/5 wich means 60%
const trackDay = async (req, res) => {
    const { habitID, date } = req.params;
    try {
        const trackedDay = await Habit.trackDay(habitID);
    } catch (err) {
        res.send(500).json({ error: err });
    }
};

const getTrackedDays = async (req, res) => {
    const { habitID } = req.params;
    
}

module.exports = {
    habits_get,
    habit_get,
    habit_post,
    habit_delete,
    updateTodoCompletion,
    updateTotalMinutes,
}