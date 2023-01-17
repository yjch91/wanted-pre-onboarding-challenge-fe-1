import React from 'react';
import { IPasswordInputProps } from '../../../types/auth';

function ConfirmPasswordInput({register, watch, errors}: IPasswordInputProps) {
    if (watch === undefined)
        return <></>;
    return (
        <>
            <div className="fontSize-1_5 mb4">패스워드확인</div>
            <input {...register("confirmPassword", {
                validate: {
                    value: (value) => watch("password") === value || "비밀번호가 일치하지 않습니다."
                }
            })} className="inputSize fontSize-1_5 p-8" type="password" placeholder='password'/>
            <p>{errors.confirmPassword?.message}</p>
        </>
    );
}

export default ConfirmPasswordInput;
