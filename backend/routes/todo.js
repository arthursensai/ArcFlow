const express = require('express');
const router = express.Router();
const { todos_get, todo_get, todo_post, todo_delete, todo_completion_update } = require('../controllers/todoControllers');
const requireAuth = require('../middlewares/requireAuth');

//get All user todos
router.get("/", requireAuth, todos_get);
//get a specific todo
router.get("/:id", requireAuth, todo_get);
//delete a todo
router.delete("/:id", requireAuth, todo_delete);
//create a new todo
router.post("/new", requireAuth ,todo_post);
//update todo completion
router.put("/:id", requireAuth , todo_completion_update);

module.exports = router;