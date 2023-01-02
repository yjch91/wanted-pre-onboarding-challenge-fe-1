import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface todoType {
    title: string,
    content: string,
    id: string,
    creatdAt: string,
    updatedAt: string,
}

interface TodoDetailType {
    data: todoType,
    setOnDetail: Function,
    setTodoData: Function,
    setTodos: Function,
}

function TodoDetail(props: TodoDetailType) {
    const [title, setTitle] = useState(props.data.title);
    const [content, setContent] = useState(props.data.content);
    const address: string = "http://localhost:8080/todos/";
    const navigate = useNavigate();
    const { id } = useParams();

    if (id && id !== props.data.id)
    {
        fetch(address + id, {
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('loginToken') || ''
            },
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            props.setTodoData(data.data);
        })
    }
    else if (!id)
        props.setOnDetail(false);

    useEffect(() => {
        setTitle(props.data.title);
        setContent(props.data.content);
    }, [props.data])

    function updateTodo() {
        fetch(address + props.data.id, {
            method : "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('loginToken') || ''
            },
            body: JSON.stringify({
                "title": title,
                "content": content
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.details)
                alert(data.details);
            else
            {
                fetch(address, {
                    method : "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('loginToken') || ''
                    },
                })
                .then(res => {  
                    return res.json();
                })
                .then(data => {
                    props.setTodos(data);
                })
            }
        })
    }

    function goBack() {
        navigate(-1);
    }

    return (
        <div className="right">
            <div>Detail</div>
            <div>
                <input className="todo" type="text" name="title" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
                <input className="todo" type="text" name="content" value={content} placeholder="content" onChange={(e) => setContent(e.target.value)}></input>
            </div>
            <button onClick={updateTodo}>수정</button>
            <button onClick={() => {props.setOnDetail(false); navigate("/");}}>닫기</button>
            <button onClick={goBack}>뒤로가기</button>
        </div>
    )
}

export default TodoDetail;