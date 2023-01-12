import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveTodoMutation } from '../../hooks/mutation/todo';
import { ITodoListItemProps } from '../../types/todo';
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
        <div>
            <div className="todo cursorPointer" onClick={() => {
                queryClient.invalidateQueries("todosId");
                if (id !== todo.id)
                    navigate(`/${todo.id}`);
            }}>
                <span>{todo.title}</span>
            </div>
            <button className="removeBtn" onClick={() => setIsOpenRemoveModal(true)}> X </button>
            { isOpenRemoveModal && <RemoveTodoModal setIsAgree={setIsRemove} setIsOpenModal={setIsOpenRemoveModal}/> }
        </div>
    );
}

export default TodoListItem;
