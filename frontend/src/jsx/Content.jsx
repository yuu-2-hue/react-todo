import '../css/Content.css'

import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';

const Content = () => {
    return (
        <div className='container'>
            <AddTodo />
            <TodoItem />
        </div>
    );
}

export default Content