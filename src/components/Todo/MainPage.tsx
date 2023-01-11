import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTodoMutation } from '../../hooks/mutation/todo';
import { ICreateTodoParams } from '../../types/todo';
import TodoDetail from './TodoDetail';
import TodoList from './TodoList';

function MainPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");    
    const navigate = useNavigate();
    const {id} = useParams();

    const { mutate: createTodoMutate } = useCreateTodoMutation();

    const onClickLogOutButton = () => {
        localStorage.removeItem('loginToken');
        navigate("/auth/login");
    }

    const onClickCreateTodo = ({title, content}: ICreateTodoParams) => {
        if (title === "")
            alert("title이 비어있습니다.")
        else{
            createTodoMutate({title, content});
            setTitle(""); 
            setContent("");
        }
    }
    
    return (
        <div>
            <button onClick={onClickLogOutButton}>로그아웃</button>
            <div>CreateTodo</div>
            <div>
                <input className="todo" type="text" name="title" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
                <input className="todo" type="text" name="content" value={content} placeholder="content" onChange={(e) => setContent(e.target.value)}></input>
            </div>
            <div>
                <button onClick={() => onClickCreateTodo({title, content})}>추가</button>
            </div>
            <div className="flex">
                <div className="size">
                    <div>TodoList (title)</div>
                    <div className="flex-col">
                        <TodoList />
                    </div>
                </div>
                {id && <TodoDetail />}
            </div>
        </div>
    )
}

export default MainPage;