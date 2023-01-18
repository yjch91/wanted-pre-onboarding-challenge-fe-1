import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodoMutation } from '../../hooks/mutation/todo';
import { ITodoForm, ICreateTodoParams } from '../../types/todo';
import { Button } from '../Auth/styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import TodoCheckModal from './TodoCheckModal';

interface CreateTodoProps {
    setOpenCreateTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateTodo({setOpenCreateTodo}: CreateTodoProps) {
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

    const { mutate: createTodoMutate } = useCreateTodoMutation();

    const createTodoSubmit = () => setIsOpenCreateModal(true);

    useEffect(() => {
        if (isCreate === true)
        {
            setIsCreate(false);
            createTodoMutate({title: watch("title"), content: watch("content")});
            resetField("title");
            resetField("content");
            setOpenCreateTodo(false);
        }
    // eslint-disable-next-line
    }, [isCreate])

    return (
        <div className="modalBackGround">
            <form className="createTodo" onSubmit={handleSubmit(createTodoSubmit)}>
                <div>- CREATE TODO -</div>
                <TitleInput register={register} watch={watch} errors={errors} />
                <ContentInput register={register} watch={watch}/>
                <Button type="submit">추가</Button>
                <Button type="button" onClick={() => setOpenCreateTodo(false)}>취소</Button>
            </form>
            { isOpenCreateModal && <TodoCheckModal setIsAgree={setIsCreate} setIsOpenModal={setIsOpenCreateModal}/> }
        </div>
    );
}

export default CreateTodo;