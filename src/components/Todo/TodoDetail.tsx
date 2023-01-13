import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosByIdQuery } from '../../hooks/query/todo';
import { ITodo, ITodoForm  } from '../../types/todo';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import TodoCheckModal from './TodoCheckModal';

function TodoDetail() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors}
    } = useForm<ITodoForm>({
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
            <TitleInput register={register} errors={errors} />
            <ContentInput register={register} />
            <br />
            <input type="submit" value="수정" />
            <button type="button" onClick={() => {navigate("/");}}>닫기</button>
            <button type="button" onClick={() => {navigate(-1)}}>뒤로가기</button>
            { isOpenUpdateModal && <TodoCheckModal setIsAgree={setIsUpdate} setIsOpenModal={setIsOpenUpdateModal}/> }
        </form>
    );
}

export default TodoDetail;
