import { createContext } from "react";
import { useState } from 'react';

export const TodoContext = createContext({});

export const TodoProvider = props => {
    const { children } = props;

    const [todos, setTodos] = useState([]);

    return (
        <TodoContext.Provider value={{todos, setTodos}}>
            {children}
        </TodoContext.Provider>
    );
};