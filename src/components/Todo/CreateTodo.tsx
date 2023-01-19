import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodoMutation } from './api/mutation';
import { ICreateTodo, ITodoForm } from './type';
import { Button } from '../Styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import CheckModal from '../Modal/CheckModal';
import ErrorModal from '../Modal/ErrorModal';

function CreateTodo({setOpenCreateTodo}: ICreateTodo) {
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: {errors}
    } = useForm<ITodoForm>({
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    const { mutate: createTodoMutate, isError, error, isSuccess } = useCreateTodoMutation();

    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isError)
            setIsOpenErrorModal(true);
        else if (isSuccess){
            resetField("title");
            resetField("content");
            setOpenCreateTodo(false);
        }
    }, [isError, isSuccess])

    const createTodoSubmit = () => setIsOpenCreateModal(true);

    useEffect(() => {
        if (isCreate === true)
        {
            setIsCreate(false);
            createTodoMutate({title: watch("title"), content: watch("content")});
        }
        
    // eslint-disable-next-line
    }, [isCreate, isSuccess])

    return (
        <div className="modalBackGround">
            <form className="createTodo" onSubmit={handleSubmit(createTodoSubmit)}>
                <div>- CREATE TODO -</div>
                <TitleInput register={register} watch={watch} errors={errors} />
                <ContentInput register={register} watch={watch}/>
                <Button type="submit">추가</Button>
                <Button type="button" onClick={() => setOpenCreateTodo(false)}>취소</Button>
            </form>
            { isOpenCreateModal && <CheckModal setIsAgree={setIsCreate} setIsOpenModal={setIsOpenCreateModal} message={"정말 추가하시겠습니까?"}/> }
            { isOpenErrorModal && error instanceof Error ? <ErrorModal error={error} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
        </div>
    );
}

export default CreateTodo;