const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter a username'],
        minlength: [3, 'minimum length is 3'],
        maxlength: [10, 'maximum username length is 10']
    },
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum password length is 6 characters']
    },
});

//hash password befors saving it to db
UserSchema.pre('save' , async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//check the password
const checkPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error('Failed to check password');
    }
};

//sign up function
UserSchema.statics.signup = async function(username, email, password) {
    if(!username) throw new Error('no valid username');
    if (!email) throw new Error('No valid email');
    if (!password) throw new Error('No valid password');
    try {
        const newUser = await this.create({ username, email, password});
        return newUser;
    } catch (err) {
        if (err.code === 11000) {
            throw new Error('Email already exists');
        }
        throw new Error(err.message || 'Failed to signup the new user');
    }
};

//login function
UserSchema.statics.login = async function(email, password) {
    if (!email) throw new Error('No valid email');
    if (!password) throw new Error('No valid password');

    const user = await this.findOne({ email });
    if (!user) throw new Error("No user exists with this email");

    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) throw new Error("Incorrect email or password");

    return user;
};

UserSchema.statics.changeUsername = async function(userID, newUsername) {
    if (!userID) throw new Error('No valid userID');
    if (!newUsername) throw new Error('No valid new username');

    const updatedUser = await this.findByIdAndUpdate(
        userID,
        { $set: { username: newUsername } },
        { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error('No user found with this ID');

    return updatedUser;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;