import { useContext } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { TodoContext } from "./providers/TodoProvider";

import axios from 'axios';

export const AddTodo = () => {
    const { todos, setTodos } = useContext(TodoContext);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get('http://localhost/api/todos')  // Laravel API などに対応
        .then((response) => setTodos(response.data))
        .catch((error) => console.error('エラー:', error));
    }, []);

    const onClickAdd = () => {
        axios.post('http://localhost/api/todos', {
            value: text,
            is_done: false
        }).then((res) => {
            setTodos([...todos, res.data]); // APIが返したTodoを追加
            setText("");
        }).catch((err) => console.error(err));
    };

    return (
        <div className="add_wrapper">
            <input
                type="text"
                placeholder='入力してください'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={onClickAdd}>追加</button>
        </div>
    )
};