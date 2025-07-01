const User = require('../models/User');
const { usernameSchema } = require('../Validators/userValidation');

//get user data
const getUserData = async (req, res) => {
    const userID = req.user;
    try {
        const userData = await User.findById(userID);
        if(!userData) return res.status(400).json({ error: 'No valid user exists with this userID' });
        return res.status(200).json({ username: userData.username });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to get user data'});
    }
};

//change username
const changeUsername = async (req, res) => {
    const userID = req.user;
    try {
        const { error, value } = usernameSchema.validate(req.body);
        if(error) {
            return res.status(400).json({ errorDetails: {
            context: error.details[0].path,
            message: error.details[0].message
        }})};
        const newUsername = value.username;
        const newUser = await User.changeUsername(userID, newUsername);
        res.status(200).json({ newUser });
    } catch (err){
        res.status(500).json({ error: err.message || 'Server error' });
    }
};

//check user
const checkUserAuth = (req, res) => {
    res.status(200).json({ loggedIn: true, userId: req.user });
};

module.exports = {
    getUserData,
    changeUsername,
    checkUserAuth
}