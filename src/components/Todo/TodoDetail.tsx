import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosByIdQuery } from '../../hooks/query/todo';
import { todo  } from '../../types/todo';

function TodoDetail() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const todoById: todo = useGetTodosByIdQuery(id)?.data;
    const { mutate: updateTodoMutate } = useUpdateTodoMutation();
    
    useEffect(() => {
        if (todoById)
        {
            setTitle(todoById.title);
            setContent(todoById.content);
        }
    }, [todoById])

    return (
        <div className="right">
            <div>Detail</div>
            <div>
                <input className="todo" type="text" name="title" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
                <input className="todo" type="text" name="content" value={content} placeholder="content" onChange={(e) => setContent(e.target.value)}></input>
            </div>
            <button onClick={() => updateTodoMutate({title, content, id: todoById.id})}>수정</button>
            <button onClick={() => {navigate("/");}}>닫기</button>
            <button onClick={() => {navigate(-1)}}>뒤로가기</button>
        </div>
    )
}

export default TodoDetail;
