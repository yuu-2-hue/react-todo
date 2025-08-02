import { useContext } from "react";
import { useState } from 'react';
import { TodoContext } from "./providers/TodoProvider";

export const AddTodo = () => {
    const { todos, setTodos } = useContext(TodoContext);
    const [text, setText] = useState("");

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