import React from 'react';
import { ITodo, ITodoList } from './type';
import { Button } from '../Styled';
import CreateTodo from './CreateTodo';
import TodoListItem from './TodoListItem';
import { useDispatch } from 'react-redux';
import { setOpenCreateTodo } from '../../redux/reducer/todoConfirm';

function TodoList({todos}: ITodoList) {
    const todoList = todos && todos.map((todo: ITodo, index: number) => {
        return (
            <TodoListItem key={index} todo={todo} />
        );
    });

    const dispatch = useDispatch();

    return (
        <div className="flexBasis50">
            <p className="todoListTitle">
                <span>- TODO LIST -</span>
                <Button onClick={() => {dispatch(setOpenCreateTodo(true))}}>+</Button>
            </p>
            <ul className="todoList left m-4">
                { (todos && todos.length > 0) ? todoList : <div>todolist가 비어있습니다.</div> }
            </ul>
            <CreateTodo />
        </div>
    );

}

export default TodoList;
