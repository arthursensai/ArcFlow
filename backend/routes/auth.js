const express = require('express');
const router = express.Router();
const { signup_post, login_post, signup_get, login_get, checkToken, logout } = require('../controllers/authControllers');

router.post("/signup", signup_post);
router.post("/login", login_post);
router.get("/signup", signup_get);
router.get("/login", login_get);
router.get("/check", checkToken);
router.get("/logout", logout);

module.exports = router;