const express = require('express');
const router = express.Router();
const { changeUsername, getUserData, checkUserAuth } = require('../controllers/profileControllers');
const requireAuth = require('../middlewares/requireAuth');

router.get("/", requireAuth, getUserData);
router.put("/username", requireAuth, changeUsername);
router.get("/check", requireAuth, checkUserAuth);

module.exports = router;