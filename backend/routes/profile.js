const express = require('express');
const router = express.Router();
const { habits_get, habit_get, habit_post, habit_todo_post, habit_todo_delete, updateTodoCompletion, updateTotalMinutes, changeUsername } = require('../controllers/profileControllers');

router.get("/habits", habits_get);
router.get("/habit", habit_get);
router.post("/createHabit", habit_post);
router.post("/createNewTodo", habit_todo_post);
router.delete("/deleteTodo", habit_todo_delete);
router.put("/updateTodoCompletion", updateTodoCompletion);
router.put("/updateTotalMinutes", updateTotalMinutes);
router.post("/changeUsername", changeUsername);

module.exports = router;