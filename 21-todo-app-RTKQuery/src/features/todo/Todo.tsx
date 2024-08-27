import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addTodo as addTodoLocal, toggleTodo, deleteTodo as deleteTodoLocal } from './todoSlice';
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from './todoApi';

const Todo: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { data: todos = [], isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodo = async () => {
    if (text.trim()) {
      const newTodo = await addTodo({ title: text, completed: false }).unwrap();
      dispatch(addTodoLocal(newTodo.title));
      setText('');
    }
  };
  const handleToggleTodo = async (todoId: number) => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
      await updateTodo({
        ...todo,
        completed: !todo.completed,
      });
      dispatch(toggleTodo(todoId));
    }
  };
  const handleDeleteTodo = async (todoId: number) => {
    await deleteTodo(todoId);
    dispatch(deleteTodoLocal(todoId));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => handleToggleTodo(todo.id)}
              >
                {todo.title}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
