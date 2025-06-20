const mongoose = require('mongoose');
const Todo = require('./Todo');

const HabitSchema = new mongoose.Schema({
    userID: {
      type: String,
      required: [true, 'no valid user']
    },
    title: {
        type: String,
        required: [true, 'no valid habit title']
    },
    description: {
        type: String
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
HabitSchema.statics.getHabitByID = async function(habitID){
    if(!habitID) throw new Error('no valid habitID');
    const habit = await this.findOne({ _id: habitID }).select('-userID');
    if(!habit) throw Error('No valid habit exist with this ID');
    return habit;
};

// Search for all habits
HabitSchema.statics.getAllHabits = async function(userID) {
    if(!userID) throw new Error('no valid user');
    const habits = await this.find({ userID }).select('-userID');
    if(!habits) throw Error("No valid habits");
    if(habits) return habits;
};

//delete a habit
HabitSchema.statics.deleteHabit = async function(habitID, userID) {
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
HabitSchema.statics.updateTotalMinutes = async function(habitID, minutesToAdd) {
    if(!habitID) throw new Error('no valid habit');
    if(typeof minutesToAdd !== 'number') throw new Error('no valid minutes to add');
    try {
        return this.updateOne(
            { _id: habitID },
            { $inc: { totalMinutes: minutesToAdd } }
        );
    } catch (err){
        throw new Error(err.message || 'failed to add minutest to the total');
    }
};

const Habit = mongoose.model('habit', HabitSchema);

module.exports = Habit;