import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoConfirm } from '../../redux/reducer/todoConfirm';
import { RootState } from '../../redux/rootReducer';
import { useCreateTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation } from '../Todo/api/mutation';

interface ICheckModal {
    command: string,
    setIsSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}

function CheckModal({ command, setIsSuccess }: ICheckModal) {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.todoConfirmReducer);
    const { mutate: createTodoMutate, isSuccess } = useCreateTodoMutation();
    const { mutate: removeTodoMutate } = useRemoveTodoMutation();
    const { mutate: updateTodoMutate } = useUpdateTodoMutation();

    useEffect(() => {
        if (state.confirm_command === "createTodo" && isSuccess && setIsSuccess)
            setIsSuccess(true);
    }, [isSuccess])

    if (!state.confirm_state || state.confirm_command !== command)
        return <></>;

    function onClickAgree() {
        if (state.confirm_command === "createTodo"){
            createTodoMutate({title: state.title, content: state.content});
        }
        else if (state.confirm_command.slice(0, 10).includes("removeTodo"))
            removeTodoMutate(state.id);
        else if (state.confirm_command === "updateTodo") {
            updateTodoMutate({title: state.title, content: state.content, id: state.id});
        }
        dispatch(setTodoConfirm("", "", false));
    }

    return (
        <div className="modalBackGround">
            <div className="modal">
                <span>{state.confirm_message}</span>
                <span>
                    <button onClick={onClickAgree}>확인</button>
                    <button onClick={() => dispatch(setTodoConfirm("", "", false))}>취소</button>
                </span>
            </div>
        </div>
    );
}

export default CheckModal;