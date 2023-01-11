import React from 'react';
import { ITodoCheckModalProps } from '../../types/todo';

function TodoCheckModal({setIsAgree, setIsOpenModal}: ITodoCheckModalProps) {
    
    function agreeClick() {
        setIsOpenModal(false);
        setIsAgree(true);
    }

    return (
        <div className="modalBackGround">
            <div className="modal">
                <span>정말 실행하시겠습니까?</span>
                <span>
                    <button onClick={agreeClick}>확인</button>
                    <button onClick={() => setIsOpenModal(false)}>취소</button>
                </span>
            </div>
        </div>
    )
}

export default TodoCheckModal;
