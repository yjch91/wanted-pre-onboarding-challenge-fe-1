import React, { useState } from 'react';
import { ITodo, ITodoList } from './type';
import { Button } from '../Styled';
import CreateTodo from './CreateTodo';
import TodoListItem from './TodoListItem';

function TodoList({todos}: ITodoList) {
    const todoList = todos && todos.map((todo: ITodo, index: number) => {
        return (
            <TodoListItem key={index} todo={todo} />
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
                { (todos && todos.length > 0) ? todoList : <div>todolist가 비어있습니다.</div> }
            </ul>
            { openCreateTodo && <CreateTodo setOpenCreateTodo={setOpenCreateTodo}/> }
        </div>
    );

}

export default TodoList;
