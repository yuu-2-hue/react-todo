import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import { TodoContext } from "./providers/TodoProvider";

import trashIcon from '/trash.png'
import editIcon from '/edit.png'

import axios from 'axios';

export const TodoItem = () => {
    const { todos, setTodos } = useContext(TodoContext);
    const inputRefs = useRef({});

    useEffect(() => {
        axios.get('http://localhost/api/todos')  // Laravel API などに対応
        .then((response) => setTodos(response.data))
        .catch((error) => console.error('エラー:', error));
    }, []);

    const onClickEdit = (id) => {
        setTodos(todos.map((todo) => {
                if (todo.id === id) todo.isEditing = true;
                return todo;
            }
        ));

        setTimeout(() => {
            inputRefs.current[id]?.focus();
        }, 0);
    };

    const onChangeEdit = (id, value) => {
        setTodos(todos.map((todo) => {
                if (todo.id === id) todo.value = value;
                return todo;
            }
        ));
    };

    const onEditDone = (id) => {
        const editedTodo = todos.find(todo => todo.id === id);
        axios.put(`http://localhost/api/todos/${id}`, {
            value: editedTodo.value,
            is_done: editedTodo.isDone,
        })
        .then(() => {
            setTodos(todos.map(todo => {
                if (todo.id === id) todo.isEditing = false;
                return todo;
            }));
        })
        .catch((err) => console.error('更新エラー:', err));
    };

    const onClickDelete = (id) => {
        axios.delete(`http://localhost/api/todos/${id}`)
        .then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        })
        .catch((err) => console.error('削除エラー:', err));
    };

    const onToggleCheck = (id) => {
        const target = todos.find(todo => todo.id === id);
        axios.patch(`http://localhost/api/todos/${id}`, {
            is_done: !target.isDone,
        })
            .then(() => {
                setTodos(todos.map(todo =>
                    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
                ));
            })
            .catch((err) => console.error('チェック切替エラー:', err));
    };

    return (
        <ul className='todo_container'>
            {todos.map((todo) => (
                <li className='todo_wrapper' key={todo.id}>
                    <div className='input'>
                        <input className='checkbox'
                            type="checkbox"
                            checked={todo.isDone ?? false}
                            onChange={() => onToggleCheck(todo.id)}
                        />
                        <input
                            className={`text ${todo.isDone ? 'done' : ''}`}
                            type="text"
                            value={todo.value ?? ""}
                            onChange={(e) => onChangeEdit(todo.id, e.target.value)}
                            ref={el => inputRefs.current[todo.id] = el}
                            readOnly={!todo.isEditing}
                            onKeyDown={(e) => e.key === 'Enter' && onEditDone(todo.id)}
                            onBlur={() => onEditDone(todo.id)}
                        />
                    </div>
                    <div className='button'>
                        <button className='edit' onClick={() => onClickEdit(todo.id)}>
                            <img src={editIcon} alt="編集" />
                        </button>
                        <button className='delete' onClick={() => onClickDelete(todo.id)}>
                            <img src={trashIcon} alt="削除" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
};