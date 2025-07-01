import { useState, useEffect } from 'react';
import { CheckCircle2, Plus, X, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const TodosComponent = (props) => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setTodos(props.todos || []);
  }, [props.todos]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const showError = (message) => {
    setError(message);
    setSuccess('');
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setError('');
  };

  const toggleTodo = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    if (!todoToUpdate) {
      showError('Todo not found');
      return;
    }

    const originalCompleted = todoToUpdate.completed;

    try {
      // Optimistic update
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );

      const response = await axios.put(`${mainUrl}/profile/updateTodoCompletion`, {
        todoID: id,
        completed: !originalCompleted
      });

      console.log('Todo updated:', response.data);
    } catch (err) {
      console.error('Error updating todo:', err);
      // Revert optimistic update
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id 
            ? { ...todo, completed: originalCompleted }
            : todo
        )
      );
      showError('Failed to update task');
    }
  };

  const addTodo = async () => {
    const trimmedTitle = newTodoTitle.trim();
    if (!trimmedTitle) {
      showError('Please enter a task title');
      return;
    }

    if (trimmedTitle.length > 200) {
      showError('Task title is too long (max 200 characters)');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post(`${mainUrl}/profile/createNewTodo`, {
        newTodoTitle: trimmedTitle,
        completed: false
      });

      console.log('API Response:', response.data);

      // Handle different possible response structures
      let newTodo;
      if (response.data.todo) {
        newTodo = response.data.todo;
      } else if (response.data._id) {
        newTodo = response.data;
      } else {
        // Fallback: create todo object manually
        newTodo = {
          _id: Date.now().toString(), // Temporary ID
          title: trimmedTitle,
          completed: false,
          createdAt: new Date().toISOString()
        };
      }

      // Add new todo to local state
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTodoTitle('');
      showSuccess('Task added successfully!');
      
    } catch (err) {
      console.error('Error creating todo:', err);
      if (err.response?.status === 401) {
        showError('Please log in to add tasks');
      } else if (err.response?.status === 400) {
        showError('Invalid task data');
      } else {
        showError('Failed to add task. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id) => {
    // Store todo for potential rollback
    const todoToRemove = todos.find(todo => todo._id === id);
    
    if (!todoToRemove) {
      showError('Todo not found');
      return;
    }

    try {
      // Optimistic update: remove todo from UI immediately
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));

      // Send delete request with todo ID inside data key
      await axios.delete(`${mainUrl}/profile/deleteTodo`, { data: { todoID: id } });

      showSuccess('Task removed');
    } catch (err) {
      console.error('Error deleting todo:', err);

      // Rollback optimistic update: re-add the todo on error
      setTodos(prevTodos => [...prevTodos, todoToRemove]);

      showError('Failed to delete task');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="rounded-2xl p-6 border-2 border-primary shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-text">Today's Tasks</h3>
          {totalCount > 0 && (
            <div className="text-sm text-muted">
          <span className="text-success font-medium">{completedCount}</span>
          <span> / {totalCount} completed</span>
      </div>
          )}
    </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mb-4">
            <div className="w-full bg-background/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error/Success Messages */}
        {(error || success) && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
            error 
              ? 'bg-error/10 border border-error/20 text-error' 
              : 'bg-success/10 border border-success/20 text-success'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error || success}</span>
          </div>
        )}
        
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map(todo => (
              <div 
                key={todo._id} 
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  todo.completed 
                    ? 'bg-success/5 border-success/20' 
                    : 'bg-background/50 border-surface hover:border-primary/30 hover:bg-background/70'
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo._id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    todo.completed 
                      ? 'bg-success border-success text-background shadow-lg' 
                      : 'border-muted hover:border-primary hover:shadow-md'
                  }`}
                >
                  {todo.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>
                
                <span className={`flex-1 transition-all duration-200 ${
                  todo.completed 
                    ? 'line-through text-muted' 
                    : 'text-text'
                }`}>
                  {todo.title}
                </span>
                
                <button
                  onClick={() => removeTodo(todo._id)}
                  className="text-muted hover:text-error transition-colors p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-error/10 flex-shrink-0"
                  style={{ opacity: 1 }} // Always visible on mobile
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-muted mb-2">No tasks yet</p>
              <p className="text-sm text-muted/70">Add your first task below to get started!</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add new task..."
              disabled={loading}
              maxLength={200}
              className="w-full bg-background/50 border border-primary/20 rounded-lg px-4 py-3 text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all duration-200"
            />
            {newTodoTitle.length > 180 && (
              <div className="absolute -bottom-5 right-0 text-xs text-warning">
                {200 - newTodoTitle.length} chars left
              </div>
            )}
          </div>
          
          <button
            onClick={addTodo}
            disabled={loading || !newTodoTitle.trim()}
            className="bg-primary hover:bg-accent text-background rounded-lg px-4 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[48px] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Quick Stats */}
        {totalCount > 0 && (
          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex justify-between text-xs text-muted">
              <span>Total: {totalCount} tasks</span>
              <span>
                {completedCount === totalCount && totalCount > 0 
                  ? '🎉 All done!' 
                  : `${totalCount - completedCount} remaining`
                }
              </span>
            </div>
          </div>
        )}
    </div>
  );
};

export default TodosComponent;