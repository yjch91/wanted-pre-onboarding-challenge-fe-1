import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ITodoForm } from './type';
import { Button } from '../Styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCreateTodo, setTodoConfirm, setTodoCreateData } from '../../redux/reducer/todoConfirm';
import { RootState } from '../../redux/rootReducer';

function CreateTodo() {
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
    
    const dispatch = useDispatch();
    const createTodoSubmit = () => {
        dispatch(setTodoCreateData(watch("title"), watch("content")));
        dispatch(setTodoConfirm("createTodo", "정말 추가하시겠습니까?", true));
    }
    const state = useSelector((state: RootState) => state.todoConfirmReducer);

    useEffect(() => {
        if (!state.openCreateTodo)
        {
            resetField("title");
            resetField("content");
        }
    }, [state.openCreateTodo])

    if (!state.openCreateTodo)
        return <></>;
  
    return (
        <div className="modalBackGround">
            <form className="createTodo" onSubmit={handleSubmit(createTodoSubmit)}>
                <div>- CREATE TODO -</div>
                <TitleInput register={register} watch={watch} errors={errors} />
                <ContentInput register={register} watch={watch}/>
                <Button type="submit">추가</Button>
                <Button type="button" onClick={() => {dispatch(setOpenCreateTodo(false))}}>취소</Button>
            </form>
        </div>
    );
}

export default CreateTodo;