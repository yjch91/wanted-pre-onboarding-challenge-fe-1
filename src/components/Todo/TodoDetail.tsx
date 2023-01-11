import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosByIdQuery } from '../../hooks/query/todo';
import { ITodo  } from '../../types/todo';
import TodoCheckModal from './TodoCheckModal';

function TodoDetail() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const todoById: ITodo = useGetTodosByIdQuery(id)?.data;
    const { mutate: updateTodoMutate } = useUpdateTodoMutation();

    useEffect(() => {
        if (todoById)
        {
            setTitle(todoById.title);
            setContent(todoById.content);
        }
    }, [todoById])

    useEffect(() => {
        if (isUpdate === true)
        {
            setIsUpdate(false);
            updateTodoMutate({title, content, id: todoById.id});
        }
    // eslint-disable-next-line
    }, [isUpdate])

    return (
        <div className="right">
            <div>Detail</div>
            <div>
                <input className="todo" type="text" name="title" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
                <input className="todo" type="text" name="content" value={content} placeholder="content" onChange={(e) => setContent(e.target.value)}></input>
            </div>
            <button onClick={() => setIsOpenUpdateModal(true)}>수정</button>
            <button onClick={() => {navigate("/");}}>닫기</button>
            <button onClick={() => {navigate(-1)}}>뒤로가기</button>
            { isOpenUpdateModal && <TodoCheckModal setIsAgree={setIsUpdate} setIsOpenModal={setIsOpenUpdateModal}/> }
        </div>
    )
}

export default TodoDetail;
