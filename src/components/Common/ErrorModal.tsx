import React from 'react';
import { ErrorModalProps } from '../../types/modal';
import { Button } from '../Auth/styled';

function ErrorModal({ error, setIsOpenErrorModal }: ErrorModalProps) {
    
    return (
        <div className="modalBackGround" onClick={(e) => {
            if (e.target === e.currentTarget)
                setIsOpenErrorModal(false)
        }}>
            <div className="modal">
                <span>{error.message}</span>
                <span>
                    <Button type="button" onClick={() => setIsOpenErrorModal(false)}>닫기</Button>
                </span>
            </div>
        </div>
    );
}

export default ErrorModal;
