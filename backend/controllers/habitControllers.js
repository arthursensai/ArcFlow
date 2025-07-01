const Habit = require('../models/Habit');
const { habitSchema } = require('../Validators/habitValidation');
const { setHabitCookie } = require("../utils/cookie");

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
    const { id: habitID } = req.params;

    if (!habitID) return res.status(400).json({ error: 'No valid habitID' });

    try {
        const habit = await Habit.getHabitByID(userID, habitID);
        setHabitCookie(res, habitID);
        return res.status(200).json({ habit });
        
    } catch (err) {
        return res.status(404).json({ error: "Habit not found or DB error" });
    }
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

    const { title, description } = value;

    try {
        const habit = await Habit.createHabit(userID, title, description);
        return res.status(201).json({ habit });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

//delete a habit
const habit_delete = async (req, res) => {
    const userID = req.user;
    const { id: habitID } = req.params;
    try {
        const deletedHabit = await Habit.deleteHabit(habitID, userID);
        return res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to delete the habit'});
    }
};

//update total minutes
const updateTotalMinutes = async (req, res) => {
    try {
        const userID = req.user;
        const { id: habitID } = req.params;
        const { minutes } = req.body;
        
        if (!habitID) return res.status(400).json({ err: "No valid habitID" });
        if (!minutes) return res.status(400).json({ err: "No valid minutes to add" });

        const minutesToAdd = Math.round(minutes);

        const result = await Habit.updateTotalMinutes(userID, habitID, minutesToAdd);
        
        return res.status(200).json({ message: "habit updated", result });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to update the habit'});
    }
};

module.exports = {
    habits_get,
    habit_get,
    habit_post,
    habit_delete,
    updateTotalMinutes,
}