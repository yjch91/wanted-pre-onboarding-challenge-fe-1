import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodoMutation } from '../../hooks/mutation/todo';
import { ITodoForm, ICreateTodoParams } from '../../types/todo';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';

function CreateTodo() {
    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors}
    } = useForm<ITodoForm>({
        defaultValues: {
            title: "",
            content: "",
        },
    });
  
    const { mutate: createTodoMutate } = useCreateTodoMutation();

    const createTodoSubmit = ({title, content}: ICreateTodoParams) => {
        createTodoMutate({title, content});
        resetField("title");
        resetField("content");
    }

    return (
        <form onSubmit={handleSubmit(createTodoSubmit)}>
            <div>CreateTodo</div>
            <TitleInput register={register} errors={errors} />
            <ContentInput register={register} />
            <br />
            <input type="submit" value="추가" />
        </form>
    );
}

export default CreateTodo;