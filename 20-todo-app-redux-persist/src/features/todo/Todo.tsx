import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from './todoSlice';
import { RootState, AppDispatch } from '../../app/store';

function Todo() {
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todo.todos)


    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
        }
        setText('');
    }

    return (
        <div>
            <h1>Todo List</h1>
            <input type="text" onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAddTodo}>Add todo</button>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span>Id: {todo.id}</span>
                        <span>Text: {todo.text}</span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo