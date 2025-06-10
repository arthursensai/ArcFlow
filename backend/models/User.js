const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const UserShema = new mongoose.Schema({
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
    username: {
        type: String,
        required: [true, 'please enter a username']
    }
});

//hash password befors saving it to db
UserShema.pre('save' , async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login the user
UserShema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("password incorrect");
    }
    throw Error("email doesn't exist");
};

UserShema.statics.changeUsername = async function(userID, newUsername){
    return this.findByIdAndUpdate( userID,
    { $set: { username: newUsername } },
    { new : true }
  );
};

const User = mongoose.model('user', UserShema);

module.exports = User;