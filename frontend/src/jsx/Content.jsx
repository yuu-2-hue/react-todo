import '../css/Content.css'

import { TodoProvider } from '../components/providers/TodoProvider.jsx'
import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';

const Content = () => {
    return (
        <div className='container'>
            <TodoProvider>
                <AddTodo />
                <TodoItem />
            </TodoProvider>
        </div>
    );
}

export default Content