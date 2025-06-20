const express = require('express');
const router = express.Router();
const { habits_get, habit_get, habit_post, habit_delete, updateTotalMinutes } = require('../controllers/habitControllers');
const requireAuth = require('../middlewares/requireAuth');

//get All user habits
router.get("/", requireAuth, habits_get);
//get a specific habit
router.get("/:id", requireAuth, habit_get);
//delete a habit
router.delete("/:id", requireAuth, habit_delete);
//create a new habit
router.post("/createHabit", requireAuth ,habit_post);
//update totalMinutes
router.put("/updateTotalMinutes", requireAuth , updateTotalMinutes);

module.exports = router;