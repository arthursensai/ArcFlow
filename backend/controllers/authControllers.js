const User = require('../models/User');
const jwt = require('jsonwebtoken');

//declaring .env variables
const frontendURL = process.env.FRONTEND_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const checkToken = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ loggedIn: false });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
        return res.status(404).json({ loggedIn: false });
        }

        res.json({ loggedIn: true, userData: { username: user.username, userID: user._id } });
    } catch (err) {
        res.status(401).json({ loggedIn: false });
    }
};

//hadnle signup errors function
const handlSignUpErrors = (err) => {
    let errors = { email: '', password: '', username: ''};

    //duplicate email
    if(err.code === 11000){
        errors.email = 'email already exists';
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
};

//hadnle login errors function
const handlLoginErrors = (err) => {
    let errors = { email: '', password: '' };

     if(err.message.includes('email')){
        errors['email'] = err.message;
    }
    if(err.message.includes('password')){
        errors['password'] = err.message;
    }

    return errors;
};

//this "createToken" function will be responsible for creating jwt for the users
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: maxAge
    })
};

//handling sign up requests
const signup_post = async (req, res) => {
    const { email, password, username } = req.body;
    console.log('new signup request!');
    try {
        const user = await User.create({ email, password, username});
        //create a jwt for the user
        const token = createToken(user._id);
        //send the jwt cookie to the user
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        //send a success message and console.log it
        res.status(201).json({ message: 'user signed up successfully'});
        console.log("New User added successfully! 🔥");
    } catch (err) {
        const errors = handlSignUpErrors(err);
        res.status(400).json({ errors });
    }
}

//handling login requests | needs fixing |
const login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log('new Login request!');
    try {
        const user = await User.login(email, password);
        //create a jwt for the user
        const token = createToken(user._id);
        //send the jwt cookie to the user
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: true, sameSite: 'none' });
        res.status(200).json({ message: 'User logged in successfully'})
    } catch (err) {
        const errors = handlLoginErrors(err);
        res.status(400).json({ errors });
    }
};

//redirecting auth get requests to the frontend page
const signup_get = (req, res) => {
    res.redirect(frontendURL + '/login');
};

const login_get = (req, res) => {
    res.redirect(frontendURL + '/login');
};

const logout = (req, res) => {
    res.clearCookie('jwt', {
    httpOnly: true,
  });
  res.json({ message: 'Logged out' });
};

module.exports = {
    signup_post,
    login_post,
    signup_get,
    login_get,
    checkToken,
    logout
};