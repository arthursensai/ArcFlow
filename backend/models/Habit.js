const mongoose = require('mongoose');
const Todo = require('./Todo');

const HabitSchema = new mongoose.Schema({
    userID: {
      type: String,
      required: [true, 'no valid user']
    },
    title: {
        type: String,
        required: [true, 'no valid habit title'],
        minlength: [3, 'minimum length is 3 characters'],
        maxlength: [15, 'maximum length is 15 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'minimum length is 10 characters'],
        maxlength: [50, 'maximum length is 50 characters']
    },
    streak: {
        type: Number,
        default: 0
    },
    totalMinutes: {
        type: Number,
        default: 0
    },          
    history: [{
        date: {
            type: String,
            required: true
        },
        minutesSpent: {
            type: Number,
            default: 0
        },
        progress: {
            type: Number,
            default: 0
        }
    }]
});

// Search for one habit
HabitSchema.statics.getHabitByID = async function(userID, habitID){
    if(!habitID) throw new Error('no valid habitID');

    const habit = await this.findOne({ _id: habitID, userID }).select('-userID');
    if(!habit) throw Error('No valid habit exist with this ID');

    return habit;
};

// Search for all habits
HabitSchema.statics.getAllHabits = async function(userID) {
    if(!userID) throw new Error('no valid user');

    const habits = await this.find({ userID }).select('-userID');

    if(!habits) throw Error("No valid habits");

    return habits;
};

// Create a new habit
HabitSchema.statics.createHabit = async function (userID, title, description) {
    if (!userID) throw new Error('no valid user');
    if(!title) throw new Error('no valid title');
    if(!description) throw new Error('no valid description');

    try {
        const newHabit = await this.create({ userID, title, description });
        return newHabit;
    } catch (err) {
        throw new Error('Failed to create habit');
    }
};


//delete a habit
HabitSchema.statics.deleteHabit = async function(userID, habitID) {
  if (!habitID) throw new Error('No valid habit ID');

  try {
    const habitResponse = await this.findOneAndDelete({ _id: habitID, userID: userID });

    if (!habitResponse) {
      throw new Error('Habit not found or already deleted');
    }

    // Delete associated todos
    const todosResponse = await Todo.deleteMany({ habitID });

    return `Habit deleted. ${todosResponse.deletedCount} todos also removed.`;
  } catch (err) {
    throw new Error(err.message || 'Failed to delete the habit');
  }
};

// Update total minutes
HabitSchema.statics.updateTotalMinutes = async function(userID, habitID, minutesToAdd) {
    if(!habitID) throw new Error('no valid habit');
    if(typeof minutesToAdd !== 'number') throw new Error('minutes to add must be a valid number');
    try {
        return this.updateOne(
            { userID, _id: habitID },
            { $inc: { totalMinutes: minutesToAdd } }
        );
    } catch (err){
        throw new Error(err.message || 'failed to add minutest to the total');
    }
};

const Habit = mongoose.model('habit', HabitSchema);

module.exports = Habit;