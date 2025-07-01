const User = require('../models/User');
const { signupSchema, loginSchema } = require('../Validators/userValidation');
const createToken = require('../utils/jwt');
const { setAuthCookie } = require('../utils/cookie');

//declaring .env variables
const frontendURL = process.env.FRONTEND_URL;
const isProduction = process.env.NODE_ENV === 'production';

//redirecting auth get requests to the frontend page
const signup_get = (req, res) => {
    res.redirect(frontendURL + '/login');
};

const login_get = (req, res) => {
    res.redirect(frontendURL + '/login');
};

//hadnle signup errors function
const handleSignUpErrors = (err) => {
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
const handleLoginErrors = (err) => {
    let errors = { email: '', password: '' };

    if (err.message.includes('email') || err.message.includes('user')) {
        errors.email = 'Email not found';
    }
    if (err.message.includes('password')) {
        errors.password = 'Incorrect password';
    }

    return errors;
};

//handling sign up requests
const signup_post = async (req, res) => {
    const { error, value } = signupSchema.validate(req.body);
    if(error) {
        return res.status(400).json({ errorDetails: {
        context: error.details[0].path,
        message: error.details[0].message
    }})};
    const { username, email, password } = value;
        try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        setAuthCookie(res, token);
        res.status(201).json({ message: 'User signed up successfully'});
        console.log("New Signup!");
    } catch (err) {
        const errors = handleSignUpErrors(err);
        res.status(400).json({ errors });
    }
}

//handling login requests 
const login_post = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if(error) {
        return res.status(400).json({ errorDetails: {
        context: error.details[0].path,
        message: error.details[0].message
    }})};
    const { email, password } = value;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        setAuthCookie(res, token);
        res.status(200).json({ message: 'User logged in successfully'});
        console.log('New Login!');
    } catch (err) {
        const errors = handleLoginErrors(err);
        res.status(400).json({ errors });
    }
};

const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Lax'
    });
  res.json({ loggedIn: false });
};

module.exports = {
    signup_post,
    login_post,
    signup_get,
    login_get,
    logout
};