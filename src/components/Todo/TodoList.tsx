import React from 'react';
import { useGetTodosQuery } from '../../hooks/query/todo';
import { ITodo, ITodos } from '../../types/todo';
import TodoListItem from './TodoListItem';

function TodoList() {    
    const todos: ITodos = useGetTodosQuery();

    const todoList = todos && todos.data.map((todo: ITodo, index: number) => {
        return (
            <TodoListItem todo={todo} key={index} />
        );
    });

    return (
        <div className="size">
            <div>TodoList (title)</div>
            <br />
            <div className="flex-col">
                {todoList}
            </div>
        </div>
    );

}

export default TodoList;
