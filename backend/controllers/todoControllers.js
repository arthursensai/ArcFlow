const Todo = require("../models/Todo");
const { todoSchema } = require("../Validators/todoValidation");

//get all todos
const todos_get = async (req, res) => {
  const userID = req.user;
  const { habitID } = req.cookies;

  if (!habitID) return res.status(400).json({ error: "No valid habitID" });

  try {
    const todos = await Todo.getAllTodos(userID, habitID);
    return res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to get habit todos" });
  }
};

//get a specific todo
const todo_get = async (req, res) => {
  const userID = req.user;
  const { habitID, todoID } = req.params;

  if (!habitID) return res.status(400).json({ error: "No valid habitID" });
  if (!todoID) return res.status(400).json({ error: "No valid todoID" });

  try {
    const todo = await Todo.getTodoByID(userID, habitID, todoID);
    return res.status(200).json({ todo });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to get habit todos" });
  }
};

//create a todo
const todo_post = async (req, res) => {
  const userID = req.user;
  const { habitID } = req.cookies;
  if (!habitID) return res.status(400).json({ error: "No valid habitID" });

  const { error, value } = todoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      errorDetails: {
        context: error.details[0].path,
        message: error.details[0].message,
      },
    });
  }

  const { title } = value;
  
  try {
    const newTodo = await Todo.createTodo(userID, habitID, title);
    return res.status(200).json({ newTodo });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to create the todo" });
  }
};

//delete a todo
const todo_delete = async (req, res) => {
  const userID = req.user;
  const { habitID, todoID } = req.params;

  if (!habitID) return res.status(400).json({ error: "No valid habitID" });
  if (!todoID) return res.status(400).json({ error: "No valid todoID" });

  try {
    const deletedTodo = await Todo.deleteTodo(userID, habitID, todoID);
    return res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to delete the todo" });
  }
};

//update a todo completion
const todo_completion_update = async (req, res) => {
  const userID = req.user;
  const { habitID, todoID } = req.params;
  const { completed } = req.body;

  if (!habitID) return res.status(400).json({ error: "No valid habitID" });
  if (!todoID) return res.status(400).json({ error: "No valid todoID" });

  try {
    const updatedTodo = await Todo.updateTodoCompletion(
      userID,
      habitID,
      todoID,
      completed
    );
    return res.status(201).json({ updatedTodo });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to get habit todos" });
  }
};

module.exports = {
  todos_get,
  todo_get,
  todo_post,
  todo_delete,
  todo_completion_update,
};
