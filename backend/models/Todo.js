const mongoose = require('mongoose');
const Habit = require('./Habit');

const TodoShema = new mongoose.Schema({
    userID: {
      type: String,
      required: [true, 'no valid user']
    },
    habitID: {
        type: String,
        required: [true, 'no valid habitID']
    },
    title: {
        type: String,
        required: [true, 'no valid todo title']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Search for one todo
TodoShema.statics.getTodoByID = async function(userID, habitID, todoID){
    if(!userID) throw new Error('no valid user');
    if(!habitID) throw new Error('no valid habitID');
    if(!todoID) throw new Error('no valid todoID');

    const todo = await this.findOne({ _id: todoID, userID, habitID }).select('-userID');

    if(!todo) throw Error('No valid todo exist with this ID');

    return todo;
};

// Search for all todos
TodoShema.statics.getAllTodos = async function(userID, habitID) {
    if(!userID) throw new Error('no valid user');
    if(!habitID) throw new Error('no valid habitID');

    return await this.find({ userID, habitID }).select('-userID');
};

//create a todo
TodoShema.statics.createTodo = async function(userID, habitID, title){
    if(!habitID) throw new Error('no valid habitID');
    if(!title) throw new Error('no valid todo title');

    const habit = await Habit.getHabitByID(userID, habitID);
    
    if(!habit) throw new Error('no valid habit exists with this ID');

    try {
        const todo = await this.create({
            userID,
            habitID,
            title
        });

        return todo;
    } catch(err){
        throw new Error(err.message || 'Failed to create todo');
    }
};

// Delete a todo
TodoShema.statics.deleteTodo = async function(userID, habitID, todoID) {
    if(!habitID) throw new Error('no valid habitID');
    if(!todoID) throw new Error('no valid todoID');

    const habit = await checkHabit(habitID);

    if(!habit) throw Error('No valid habit exist with this ID');

    try {
        return this.deleteOne({
            _id: todoID,
            userID,
            habitID
        });
    } catch(err){
        throw new Error(err.message || 'Failed to delete todo');
    }
};

// Update todo completion
TodoShema.statics.updateTodoCompletion = async function(userID, habitID, todoID, completed) {
    if(!habitID) throw new Error('no valid habit');
    if(!todoID) throw new Error('no valid todo');

    if (typeof completed !== 'boolean') throw new Error('no valid todo status');
    
    const habit = await checkHabit(habitID);

    if(!habit) throw Error('No valid habit exist with this ID');

    try {
        return this.updateOne(
            { _id: todoID, userID, habitID },
            { $set: { completed } }
        );
    } catch(err){
        throw new Error(err.message || 'Failed to update todo');
    }
};

const Todo = mongoose.model('todo', TodoShema);

module.exports = Todo;