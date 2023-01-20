import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetTodosQuery } from '../../Todo/api/query';
import { Button } from '../../Styled';
import TodoDetail from '../../Todo/TodoDetail';
import TodoList from '../../Todo/TodoList';
import ErrorModal from '../../Modal/ErrorModal';
import { ITodos } from '../../Todo/api/type';
import CheckModal from '../../Modal/CheckModal';

function HomePage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const todos: ITodos = useGetTodosQuery();

    let isIdValid = false;

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
            <CheckModal />
            <ErrorModal />
        </>
    );
}

export default HomePage;