const express = require('express');
const router = express.Router();
const { habits_get, habit_get, habit_post, habit_delete, updateTotalMinutes } = require('../controllers/habitControllers');
const requireAuth = require('../middlewares/requireAuth');

//get All user habits
router.get("/", requireAuth, habits_get);
//get a specific habit
router.get("/:id", requireAuth, habit_get);
//create a new habit
router.post("/new", requireAuth ,habit_post);
//delete a habit
router.delete("/:id", requireAuth, habit_delete);
//update totalMinutes
router.put("/:id", requireAuth , updateTotalMinutes);

module.exports = router;