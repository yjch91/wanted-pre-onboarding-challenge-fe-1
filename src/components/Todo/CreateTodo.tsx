import React from 'react';
import { useForm } from 'react-hook-form';
import { ITodoForm } from './type';
import { Button } from '../Styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import { useDispatch } from 'react-redux';
import { setOpenCreateTodo, setTodoConfirm, setTodoCreateData } from '../../redux/reducer/todoConfirm';

function CreateTodo() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors}
    } = useForm<ITodoForm>({
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const dispatch = useDispatch();

    const createTodoSubmit = () => {
        dispatch(setTodoCreateData(getValues("title"), getValues("content")));
        dispatch(setTodoConfirm("createTodo", "정말 추가하시겠습니까?", true));
    }
    
    return (
        <div className="modalBackGround">
            <form className="createTodo" onSubmit={handleSubmit(createTodoSubmit)}>
                <div>- CREATE TODO -</div>
                <TitleInput register={register} getValues={getValues} errors={errors} />
                <ContentInput register={register} getValues={getValues}/>
                <Button type="submit">추가</Button>
                <Button type="button" onClick={() => {dispatch(setOpenCreateTodo(false))}}>취소</Button>
            </form>
        </div>
    );
}

export default CreateTodo;