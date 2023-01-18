import React from 'react';
import { IPasswordInputProps } from '../../../types/auth';

function ConfirmPasswordInput({register, watch, errors}: IPasswordInputProps) {
    if (watch === undefined)
        return <></>;
    return (
        <>
            <input {...register("confirmPassword", {
                validate: {
                    value: (value) => watch("password") === value || "비밀번호가 일치하지 않습니다."
                }
            })} className="inputSize fontSize-1_25 p-8 mb-4" type="password" placeholder='비밀번호 확인'/>
            <p className="m-4 red">{errors.confirmPassword?.message}</p>
        </>
    );
}

export default ConfirmPasswordInput;
