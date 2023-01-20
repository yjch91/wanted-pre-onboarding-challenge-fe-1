import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodoMutation } from './api/mutation';
import { ICreateTodo, ITodoForm } from './type';
import { Button } from '../Styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import CheckModal from '../Modal/CheckModal';
import { useDispatch } from 'react-redux';
import { setTodoConfirm, setTodoCreateData } from '../../redux/reducer/todoConfirm';

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
    
    const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useDispatch();
    const createTodoSubmit = () => {
        dispatch(setTodoCreateData(watch("title"), watch("content")));
        dispatch(setTodoConfirm("createTodo", "정말 추가하시겠습니까?", true));
    }

    useEffect(() => {
        if (isSuccess){
            setIsSuccess(false);
            resetField("title");
            resetField("content");
            setOpenCreateTodo(false);
        }
    // eslint-disable-next-line
    }, [isSuccess])

    return (
        <div className="modalBackGround">
            <form className="createTodo" onSubmit={handleSubmit(createTodoSubmit)}>
                <div>- CREATE TODO -</div>
                <TitleInput register={register} watch={watch} errors={errors} />
                <ContentInput register={register} watch={watch}/>
                <Button type="submit">추가</Button>
                <Button type="button" onClick={() => setOpenCreateTodo(false)}>취소</Button>
            </form>
            <CheckModal command="createTodo" setIsSuccess={setIsSuccess} />
        </div>
    );
}

export default CreateTodo;