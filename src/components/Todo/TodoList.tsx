import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosQuery } from '../../hooks/query/todo';
import { todo, todos } from '../../types/todo';

function TodoList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { mutate: removeTodoMutate } = useRemoveTodoMutation();

    const todos: todos = useGetTodosQuery();

    const onClickRemoveTodo = (todoId: string) => {
        removeTodoMutate(todoId);
        if (id === todoId)
            navigate("/");
    }

    const todoList = todos && todos.data.map((todo: todo, index: number) => {
        return (
            <div key={index}>
                <div className="todo cursorPointer" onClick={() => {
                    queryClient.invalidateQueries("todosId");
                    if (id !== todo.id)
                        navigate(`/${todo.id}`);
                }}>
                    <span>{todo.title}</span>
                </div>
                <button className="removeBtn" onClick={() => onClickRemoveTodo(todo.id)}> X </button>
            </div>
        )
    });

    return (
        <>
            {todoList}
        </>
    );

}

export default TodoList;
