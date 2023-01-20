import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveTodoMutation } from './api/mutation';
import { ITodoListItem } from './type';
import { Button } from '../Styled';
import CheckModal from '../Modal/CheckModal';
import { useDispatch } from 'react-redux';
import { setTodoConfirm, setTodoRemoveData } from '../../redux/reducer/todoConfirm';

function TodoListItem({todo}: ITodoListItem) {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const removeTodoSubmit = () => {
        dispatch(setTodoRemoveData(todo.id));
        dispatch(setTodoConfirm("removeTodo" + todo.id, "정말 삭제하시겠습니까?", true));
    }

    return (
        <li>
            <div className="todo cursorPointer m-4">
                <p className="todoTitle left" onClick={(e) => {
                    if (e.target === e.currentTarget){
                        queryClient.invalidateQueries("todosId");
                        if (id !== todo.id)
                            navigate(`/${todo.id}`);
                    }
                }}>{todo.title}</p>
                <Button onClick={removeTodoSubmit}>x</Button>
            </div>
            <CheckModal command={"removeTodo" + todo.id} />
        </li>
    );
}

export default TodoListItem;
