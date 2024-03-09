import  { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import {
  Typography,
  List,
  ListItem,
  Button,
  TextField,
} from '@mui/material';
const TodoListContainer = styled('div')({
  marginTop: 16,
});

const TodoItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
  border: '1px solid #ccc',
  marginBottom: 8,
});

const InputContainer = styled('div')({
  display: 'flex',
  marginBottom: 16,
});

const InputField = styled(TextField)({
  marginRight: 16,
});
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };
const addTodo = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };
const deleteTodo = async (id) => {
    try {
      await axios.delete("https://jsonplaceholder.typicode.com/todos/${id}");
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };
const completeTodo = async (id) => {
    try {
      const response = await axios.patch("https://jsonplaceholder.typicode.com/todos/${id}", {
        completed: true,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: response.data.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error marking todo as completed:', error.message);
    }
  };
useEffect(() => {
    fetchTodos();
  }, []);
return (
    <TodoListContainer>
      <Typography variant="h4">Todo List</Typography>

      <List>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <Typography>{todo.title} - Completed: {todo.completed ? 'Yes' : 'No'}</Typography>
            <div>
              <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
              <Button onClick={() => completeTodo(todo.id)}>Complete</Button>
            </div>
          </TodoItem>
        ))}
      </List>
<InputContainer>
        <InputField
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </InputContainer>
    </TodoListContainer>
  );
};

export default TodoList;