import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosQuery } from '../../hooks/query/todo';
import { ITodo, ITodos } from '../../types/todo';
import RemoveTodoModal from './TodoCheckModal';

function TodoList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isRemove, setIsRemove] = useState(false);
    const [removeTodoId, setRemoveTodoId] = useState("");
    
    const todos: ITodos = useGetTodosQuery();
    const { mutate: removeTodoMutate } = useRemoveTodoMutation();

    useEffect(() => {
        if (isRemove === true)
        {
            setIsRemove(false);
            removeTodoMutate(removeTodoId);
            if (removeTodoId === id)
                navigate("/");
        }
    // eslint-disable-next-line
    }, [isRemove])

    const onClickRemoveTodo = (todoId: string) => {
        setIsOpenRemoveModal(true);
        setRemoveTodoId(todoId);
    }

    const todoList = todos && todos.data.map((todo: ITodo, index: number) => {
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
            { isOpenRemoveModal && <RemoveTodoModal setIsAgree={setIsRemove} setIsOpenModal={setIsOpenRemoveModal}/> }
        </>
    );

}

export default TodoList;
