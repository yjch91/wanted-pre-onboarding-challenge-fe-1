import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTodoByIdQuery } from './api/query';
import { ITodoForm  } from './type';
import { Button } from '../Styled';
import ContentInput from './Input/Content';
import TitleInput from './Input/Title';
import { ITodoById } from './api/type';
import { useDispatch } from 'react-redux';
import { setTodoConfirm, setTodoUpdateData } from '../../redux/reducer/todoConfirm';

function TodoDetail() {
    const {
        register,
        handleSubmit,
        getValues,
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
    const todoById: ITodoById = useGetTodoByIdQuery(id);
    
    const dispatch = useDispatch();
    const updateTodoSubmit = () => {
        dispatch(setTodoUpdateData(getValues("title"), getValues("content"), todoById.data.id));
        dispatch(setTodoConfirm("updateTodo", "정말 수정하시겠습니까?", true));
    }

    useEffect(() => {
        if (todoById)
        {
            setValue("title", todoById.data.title);
            setValue("content", todoById.data.content);
        }
    // eslint-disable-next-line
    }, [todoById])

    return (
        <div className="flexBasis50">
            <form onSubmit={handleSubmit(updateTodoSubmit)}>
                <p className="todoDetailTitle">
                    <span>- TODO DETAIL -</span>
                    <Button type="submit">수정</Button>
                    <Button type="button" onClick={() => {navigate("/");}}>닫기</Button>
                </p>
                <div className="todoDetail left m-4">
                    <TitleInput register={register} getValues={getValues} errors={errors} />
                    <ContentInput register={register} getValues={getValues}/>
                </div>
            </form>
        </div>
    );
}

export default TodoDetail;
