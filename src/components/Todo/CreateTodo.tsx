import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodoMutation } from '../../hooks/mutation/todo';
import { ICreateTodoForm, ICreateTodoParams } from '../../types/todo';

function CreateTodo() {
    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors}
    } = useForm<ICreateTodoForm>({
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
            <input {...register("title",  {
                required: "제목이 비어있습니다."
            })} className="todo" type="text" placeholder="title" />
            <p>{errors.title?.message}</p>
            <input {...register("content")} className="todo" type="text" placeholder="content" />
            <br />
            <input type="submit" value="추가" />
        </form>
    );
}

export default CreateTodo;