import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Auth/styled';
import CreateTodo from './CreateTodo';
import TodoDetail from './TodoDetail';
import TodoList from './TodoList';

function MainPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    
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
                <TodoList />
                {id && <TodoDetail />}
            </div>
        </>
    );
}

export default MainPage;