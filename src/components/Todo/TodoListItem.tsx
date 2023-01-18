import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveTodoMutation } from '../../hooks/mutation/todo';
import { ITodoListItemProps } from '../../types/todo';
import { Button } from '../Auth/styled';
import RemoveTodoModal from './TodoCheckModal';

function TodoListItem({todo}: ITodoListItemProps) {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isRemove, setIsRemove] = useState(false);
    const { mutate: removeTodoMutate } = useRemoveTodoMutation();

    useEffect(() => {
        if (isRemove === true)
        {
            setIsRemove(false);
            removeTodoMutate(todo.id);
            if (todo.id === id)
                navigate("/");
        }
    // eslint-disable-next-line
    }, [isRemove])

    return (
        <li>
            <div className="todo cursorPointer m-4">
                <p className="todoTitle left" onClick={(e) => {
                    if (e.target === e.currentTarget){
                        queryClient.invalidateQueries("todosId");
                        if (id !== todo.id)
                            navigate(`/${todo.id}`);
                    }
                }}>{todo.title}</p>
                <Button onClick={(e) => {
                    setIsOpenRemoveModal(true)}
                }>x</Button>
            </div>
            { isOpenRemoveModal && <RemoveTodoModal setIsAgree={setIsRemove} setIsOpenModal={setIsOpenRemoveModal}/> }
        </li>
    );
}

export default TodoListItem;
