import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTodoMutation } from '../../hooks/mutation/todo';
import { useGetTodosByIdQuery } from '../../hooks/query/todo';
import { ITodo, ITodoForm  } from '../../types/todo';
import { Button } from '../Auth/styled';
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
        <div className="flexBasis50">
            <form onSubmit={handleSubmit(updateTodoSubmit)}>
                <p className="todoDetailTitle">
                    <span>- TODO DETAIL -</span>
                    <Button type="submit">수정</Button>
                    <Button type="button" onClick={() => {navigate("/");}}>닫기</Button>
                </p>
                <div className="todoDetail left m-4">
                    <TitleInput register={register} watch={watch} errors={errors} />
                    <ContentInput register={register} watch={watch}/>
                </div>
                { isOpenUpdateModal && <TodoCheckModal setIsAgree={setIsUpdate} setIsOpenModal={setIsOpenUpdateModal}/> }
            </form>
        </div>
    );
}

export default TodoDetail;
