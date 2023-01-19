import React from 'react';
import { ICheckModalProps } from './type';

function CheckModal({setIsAgree, setIsOpenModal, message}: ICheckModalProps) {
    
    function agreeClick() {
        setIsOpenModal(false);
        setIsAgree(true);
    }

    return (
        <div className="modalBackGround">
            <div className="modal">
                <span>{message}</span>
                <span>
                    <button onClick={agreeClick}>확인</button>
                    <button onClick={() => setIsOpenModal(false)}>취소</button>
                </span>
            </div>
        </div>
    );
}

export default CheckModal;
