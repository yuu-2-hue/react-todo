import { useState } from 'react';
import { useRef } from 'react';
import '../css/Content.css'
import trashIcon from '/trash.png'
import editIcon from '/edit.png'

const Content = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    const inputRefs = useRef({});

    const onClickAdd = () => {
        const newTodo = {
            id: Date.now(),
            value: text,
            isDone: false,
            isEditing: false
        };
        setTodos([...todos, newTodo]);
        setText("");
    }

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
        <div className='container'>
            <div className='add_wrapper'>
                <input
                    type="text"
                    placeholder='入力してください'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={onClickAdd}>追加</button>
            </div>
            <ul className='list_container'>
                {todos.map((todo) => (
                    <li className='list_wrapper' key={todo.id}>
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
        </div>
    );
}

export default Content