import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoDetail from './TodoDetail';

interface todosType {
    data: todoType[],
}

interface todoType {
    title: string,
	content: string,
	id: string,
	creatdAt: string,
	updatedAt: string,
}

const todoTypeData: todoType = {
    title: "",
    content: "",
    id: "",
    creatdAt: "",
    updatedAt: "",
}

function MainPage() {
    const [logBtnText, setLogBtnText] = useState(localStorage.getItem('loginToken') ? "로그아웃" : "로그인");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState<todosType>();
    const [onDetail, setOnDetail] = useState(false);
    const [todoData, setTodoData] = useState<todoType>(todoTypeData);

    const navigate = useNavigate();
    const address: string = "http://localhost:8080/todos";

    useEffect(() => {
        if (localStorage.getItem('loginToken') === null)
            navigate("/auth");
    }, [navigate, logBtnText]);

    useEffect(() => {
        getTodos();
    }, [])

    function getTodos() {
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
            setTodos(data);
        })
    }

    const onClickLogBtn = () => {
        if (logBtnText === "로그인")
            navigate("/auth");
        else{
            localStorage.removeItem('loginToken');
            setLogBtnText("로그인");
        }
    }

    function createTodo() {
        setTitle("");
        setContent("");
        fetch(address, {
            method : "POST",
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
            getTodos();
        })
    }

    function removeTodo(id: string) {
        fetch(address + "/" + id, {
            method : "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('loginToken') || ''
            },
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.details)
                alert(data.details);
            getTodos();
        })
    }

    const todoList = todos && todos.data.map((element: todoType, idx: number) => {
        return (
            <div key={idx}>
                <div className="todo cursorPointer" onClick={() => {
                    setOnDetail(true);
                    setTodoData(element);
                    navigate(`/${element.id}`);
                }}>
                    <span>{element.title}</span>
                </div>
                <button className="removeBtn" onClick={() => {removeTodo(element.id)}}> X </button>
            </div>
        )
    });

    return (
        <div>
            <button onClick={onClickLogBtn}>{logBtnText}</button>
            <div>Create</div>
            <div>
                <input className="todo" type="text" name="title" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
                <input className="todo" type="text" name="content" value={content} placeholder="content" onChange={(e) => setContent(e.target.value)}></input>
            </div>
            <div>
                <button onClick={createTodo}>추가</button>
            </div>
            <div className="flex">
                <div className="size">
                    <div>Title</div>
                    <div className="flex-col">
                        { todoList }
                    </div>
                </div>
                { onDetail && <TodoDetail data={todoData} setOnDetail={setOnDetail} setTodoData={setTodoData} setTodos={setTodos}/> }
            </div>
        </div>
    )
}

export default MainPage;