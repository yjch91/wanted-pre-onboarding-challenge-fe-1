import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetTodosQuery } from '../../Todo/api/query';
import { Button } from '../../Styled';
import TodoDetail from '../../Todo/TodoDetail';
import TodoList from '../../Todo/TodoList';
import ErrorModal from '../../Modal/ErrorModal';

function HomePage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const { data: todos, isError, error } = useGetTodosQuery();
    let isIdValid = false;

    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isError)
            setIsOpenErrorModal(true);
    }, [isError])

    if (id && todos) {
        todos.data.forEach((element) => {
            if (element.id === id)
            {
                isIdValid = true;
                return ;
            }
        });
        if (!isIdValid)
            return <Navigate to="/" />
    }

    const onClickLogOutButton = () => {
        localStorage.removeItem('loginToken');
        navigate("/auth/login");
    }

    return (
        <>
            <div>
                <Button onClick={onClickLogOutButton}>로그아웃</Button>
            </div>
            <div className="flex">
                { todos && <TodoList todos={todos.data} /> }
                { isIdValid && <TodoDetail />}
            </div>
            { isOpenErrorModal && error instanceof Error ? <ErrorModal error={error} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
        </>
    );
}

export default HomePage;