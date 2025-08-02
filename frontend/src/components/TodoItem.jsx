import { useRef } from 'react';
import { useContext } from "react";
import { TodoContext } from "./providers/TodoProvider";

import trashIcon from '/trash.png'
import editIcon from '/edit.png'

export const TodoItem = () => {
    const { todos, setTodos } = useContext(TodoContext);
    const inputRefs = useRef({});

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
        setTodos(todos.map((todo) => {
                if (todo.id === id) todo.isEditing = false;
                return todo;
            }
        ));
    };

    const onClickDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const onToggleCheck = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    };

    return (
        <ul className='todo_container'>
            {todos.map((todo) => (
                <li className='todo_wrapper' key={todo.id}>
                    <div className='input'>
                        <input className='checkbox'
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => onToggleCheck(todo.id)}
                        />
                        <input className={`text ${todo.isDone ? 'done' : ''}`}
                            type="text"
                            value={todo.value}
                            onChange={(e) => onChangeEdit(todo.id, e.target.value)}
                            ref={el => inputRefs.current[todo.id] = el} readOnly={!todo.isEditing}
                            onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onEditDone(todo.id);
                                    }
                                }}
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