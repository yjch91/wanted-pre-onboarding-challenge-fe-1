import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosByIdQuery } from '../../hooks/query/todo';
import { ITodo, IUpdateTodoParams  } from '../../types/todo';
import TodoCheckModal from './TodoCheckModal';

function TodoDetail() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors}
    } = useForm<IUpdateTodoParams>({
        defaultValues: {
            title: "",
            content: "",
        }
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const todoById: ITodo = useGetTodosByIdQuery(id)?.data;

    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    
    const updateTodoSubmit = () => setIsOpenUpdateModal(true);
    const { mutate: updateTodoMutate } = useUpdateTodoMutation();

    useEffect(() => {
        if (todoById)
        {
            setValue("title", todoById.title);
            setValue("content", todoById.content);
        }
    }, [todoById])

    useEffect(() => {
        if (isUpdate === true)
        {
            setIsUpdate(false);
            updateTodoMutate({title: watch("title"), content: watch("content"), id: todoById.id});
        }
    // eslint-disable-next-line
    }, [isUpdate])

    return (
        <form onSubmit={handleSubmit(updateTodoSubmit)}>
            <div>TodoDetail</div>
            <br />
            <input {...register("title",  {
                required: "제목이 비어있습니다."
            })} className="todo" type="text" placeholder="title" />
            <p>{errors.title?.message}</p>
            <input {...register("content")} className="todo" type="text" placeholder="content" />
            <br />
            <input type="submit" value="수정" />
            <button type="button" onClick={() => {navigate("/");}}>닫기</button>
            <button type="button" onClick={() => {navigate(-1)}}>뒤로가기</button>
            { isOpenUpdateModal && <TodoCheckModal setIsAgree={setIsUpdate} setIsOpenModal={setIsOpenUpdateModal}/> }
        </form>
    );
}

export default TodoDetail;
