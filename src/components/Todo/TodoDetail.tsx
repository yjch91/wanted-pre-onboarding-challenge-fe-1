import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTodoMutation } from './api/mutation';
import { useGetTodoByIdQuery } from './api/query';
import { ITodoForm  } from './type';
import { Button } from '../Styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import CheckModal from '../Modal/CheckModal';
import ErrorModal from '../Modal/ErrorModal';

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
    const { data: todoById, isError: isGetTodoByIdError, error: getTodoByIdError } = useGetTodoByIdQuery(id);

    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    
    const updateTodoSubmit = () => setIsOpenUpdateModal(true);
    const { mutate: updateTodoMutate, isError: isUpdataTodoError, error: updateTodoError } = useUpdateTodoMutation();

    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isGetTodoByIdError || isUpdataTodoError)
            setIsOpenErrorModal(true);
    }, [isGetTodoByIdError, isUpdataTodoError])

    useEffect(() => {
        if (todoById)
        {
            setValue("title", todoById.data.title);
            setValue("content", todoById.data.content);
        }
    }, [todoById])

    useEffect(() => {
        if (isUpdate === true)
        {
            setIsUpdate(false);
            updateTodoMutate({title: watch("title"), content: watch("content"), id: todoById.data.id});
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
                { isOpenUpdateModal && <CheckModal setIsAgree={setIsUpdate} setIsOpenModal={setIsOpenUpdateModal} message={"정말 수정하시겠습니까?"}/> }
                { isOpenErrorModal && getTodoByIdError instanceof Error ? <ErrorModal error={getTodoByIdError} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
                { isOpenErrorModal && updateTodoError instanceof Error ? <ErrorModal error={updateTodoError} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
            </form>
        </div>
    );
}

export default TodoDetail;
