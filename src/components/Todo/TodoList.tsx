import React, { useState } from 'react';
import { useGetTodosQuery } from '../../hooks/query/todo';
import { ITodo, ITodos } from '../../types/todo';
import { Button } from '../Auth/styled';
import CreateTodo from './CreateTodo';
import TodoListItem from './TodoListItem';

function TodoList() {    
    const todos: ITodos = useGetTodosQuery();

    const todoList = todos && todos.data.map((todo: ITodo, index: number) => {
        return (
            <TodoListItem todo={todo} key={index} />
        );
    });

    const [openCreateTodo, setOpenCreateTodo] = useState(false);

    return (
        <div className="flexBasis50">
            <p className="todoListTitle">
                <span>- TODO LIST -</span>
                <Button onClick={() => setOpenCreateTodo(true)}>+</Button>
            </p>
            <ul className="todoList left m-4">
                {todoList}
            </ul>
            { openCreateTodo && <CreateTodo setOpenCreateTodo={setOpenCreateTodo}/> }
        </div>
    );

}

export default TodoList;
