const Habit = require('../models/Habit');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

//check if the user exits
const checkUserToken = async (req) => {
    const token = req.cookies.jwt;
    console.log(token)

    if (!token) { return null };
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
    
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
        return null;
        }
    
        return user._id;
    } catch (err) {
        return null;
    }
};

//get all habits
const habits_get = async (req, res) => {
    const userID = await checkUserToken(req);
    if(userID !== null) {
        try {
            const habits = await Habit.getAllHabits(userID);
            return res.status(201).json({ habits });
        } catch (err){
            return res.status(400).json({ err: err });
        }
    }
    return res.status(400).json({ loggedIn: false });
};

//get a habit 
const habit_get = async (req, res) => {
    const { habitID } = req.cookies;
    const userID = await checkUserToken(req);
    if(!habitID) { return res.status(400).json({ err: 'no valid habitID' }); };
    if(userID !== null) {
        try {
            const habit = await Habit.getHabitByID(habitID);
            return res.status(200).json({ habit });
        } catch (err) {
            return res.status(401).json({ err });
        }
    }
    return res.status(400).json({ loggedIn: false });
};

//create a habit
const habit_post = async (req, res) => {
    const userID = await checkUserToken(req);
    if(userID !== null) {
        const date = new Date();
        const startDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const { title, description, status, firstTodo } = req.body;
        const habitData = {
        userID: userID,
        title: title,
        description: description,
        status: status,
        startDate: startDate,
        streak: 0,
        totalMinutes: 0,
        todos: [ { title: firstTodo, completed: false } ]
    }
        try {
            const habit = await Habit.create(habitData);
            return res.status(201).json({ habit });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
    return res.status(400).json({ loggedIn: false });
};

//add a new todo to a habit
const habit_todo_post = async (req, res) => {
    const userID = await checkUserToken(req);
    const { newTodoTitle } = req.body;
    const { habitID } = req.cookies;
    if(userID !== null && habitID !== null) {
        try {
            const newTodo = await Habit.addNewTodo(habitID, newTodoTitle);
            return res.status(201).json({ newTodo });
        } catch (err){
            return res.status(400).json({ err });
        }
    } else if(userID == null){
        return res.status(400).json({ loggedIn: false });
    } else if(habitID == null){
        return res.status(400).json({ err: 'no valid habit' });
    }
    return res.status(400).json({ loggedIn: false });
};

//delete a to do
const habit_todo_delete = async (req, res) => {
  try {
    const userID = await checkUserToken(req);
    const { todoID } = req.body;
    console.log('delete todo request')
    const { habitID } = req.cookies;

    if (!userID) return res.status(400).json({ loggedIn: false });
    if (!habitID) return res.status(400).json({ err: "No valid habit." });

    const deletedTodo = await Habit.deleteTodo(habitID, todoID);
    return res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong", details: err.message });
  }
};

//update todo completion
const updateTodoCompletion = async (req, res) => {
  try {
    const userID = await checkUserToken(req);
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
        const userID = await checkUserToken(req);
        const { habitID } = req.cookies;
        const { minutesToAdd } = req.body;
        console.log(userID, habitID, minutesToAdd);

        if (!userID) return res.status(400).json({ loggedIn: false });
        if (!habitID) return res.status(400).json({ err: "No valid habit." });
        
        const result = await Habit.updateTotalMinutes(habitID, Math.round(minutesToAdd));
        return res.status(200).json({ message: "Todo updated", result });
    } catch (err) {
        return res.status(500).json({ err: "Failed to update todo", details: err.message });
    }
};

//update username
const changeUsername = async (req, res) => {
    const userID = await checkUserToken(req);
    if(!userID) return res.status(400).json({ loggedIn: false });
    try{
        const { newUsername } = req.body;
        const newUser = await User.changeUsername(userID, newUsername);
        res.status(200).json({ newUser });
    } catch (err){
        return res.status(500).json({ err });
    }
};

module.exports = {
    habits_get,
    habit_get,
    habit_post,
    habit_todo_post,
    habit_todo_delete,
    updateTodoCompletion,
    updateTotalMinutes,
    changeUsername
}