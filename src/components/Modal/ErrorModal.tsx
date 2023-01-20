import React from 'react';
import { Button } from '../Styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { setError } from '../../redux/reducer/error';

function ErrorModal() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.todoErrorReducer);

    if (!state.error_state)
        return <></>;

    return (
        <div className="modalBackGround" onClick={(e) => {
            if (e.target === e.currentTarget)
                dispatch(setError("", false));
        }}>
            <div className="modal">
                <span>{state.error_message}</span>
                <span>
                    <Button type="button" onClick={() => dispatch(setError("", false))}>닫기</Button>
                </span>
            </div>
        </div>
    );
}

export default ErrorModal;
