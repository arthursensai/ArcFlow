const mongoose = require('mongoose');

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
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    streak: {
        type: Number,
        default: 0
    },
    startDate: {
        type: String,
        required: true
    },
    totalMinutes: {
        type: Number,
        default: 0
    },
    todos: [{
        title: {
            type: String,
            required: [true, 'no valid todo title']
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    history: {
        type: Map,
        of: [String],
        default: () => new Map()
    }
});

//search for user habits
HabitSchema.statics.getAllHabits = async function(userID) {
    const habits = await this.find({ userID }).select('-userID');
    if(habits){
        return habits;
    }
    throw Error("No habits exist add one");
};

//search for one habit
HabitSchema.statics.getHabitByID = async function(habitID){
    const habit = await this.findOne({ _id: habitID }).select('-userID');
    if(habit){
        return habit;
    }
    throw Error("No valid habit exist with this ID");
};

//add a new to do to the todos arrat of the habit
HabitSchema.statics.addNewTodo = async function(habitID, newTodoTitle){
    const todo = await this.findByIdAndUpdate(habitID,
    {
        $push: {
        todos: {
            title: newTodoTitle,
            completed: false
        }
        }
    },
    { new: true }
    );
}

//delete a todo
HabitSchema.statics.deleteTodo = async function(habitId, todoId) {
  return this.updateOne(
    { _id: habitId },
    { $pull: { todos: { _id: todoId } } }
  );
};

//update todo completion
HabitSchema.statics.updateTodoCompletion = async function(habitId, todoId, completed) {
  return this.updateOne(
    { _id: habitId, "todos._id": todoId },
    { $set: { "todos.$.completed": completed } }
  );
};

HabitSchema.statics.updateTotalMinutes = async function(habitId, minutesToAdd) {
  return this.updateOne(
    { _id: habitId },
    { $inc: { totalMinutes: minutesToAdd } }
  );
};

const Habit = mongoose.model('habit', HabitSchema);

module.exports = Habit;