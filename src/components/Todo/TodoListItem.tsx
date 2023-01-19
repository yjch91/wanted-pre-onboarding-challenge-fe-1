import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveTodoMutation } from './api/mutation';
import { ITodoListItem } from './type';
import { Button } from '../Styled';
import CheckModal from '../Modal/CheckModal';
import ErrorModal from '../Modal/ErrorModal';

function TodoListItem({todo}: ITodoListItem) {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isRemove, setIsRemove] = useState(false);
    const { mutate: removeTodoMutate, isError, error } = useRemoveTodoMutation();

    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isError)
            setIsOpenErrorModal(true);
    }, [isError])

    useEffect(() => {
        if (isRemove === true)
        {
            setIsRemove(false);
            removeTodoMutate(todo.id);
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
            { isOpenRemoveModal && <CheckModal setIsAgree={setIsRemove} setIsOpenModal={setIsOpenRemoveModal} message={"정말 제거하시겠습니까?"}/> }
            { isOpenErrorModal && error instanceof Error ? <ErrorModal error={error} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
        </li>
    );
}

export default TodoListItem;
