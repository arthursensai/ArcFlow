const express = require('express');
const router = express.Router();
const { signup_post, login_post, signup_get, login_get, logout } = require('../controllers/authControllers');

router.get("/signup", signup_get);
router.get("/login", login_get);

router.post("/signup", signup_post);
router.post("/login", login_post);

router.get("/logout", logout);

module.exports = router;