import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
        <div>
            <button onClick={onClickLogOutButton}>로그아웃</button>
            <CreateTodo />
            <br />
            <div className="flex">
                <TodoList />
                {id && <TodoDetail />}
            </div>
        </div>
    );
}

export default MainPage;