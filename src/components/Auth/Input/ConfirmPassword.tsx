import React from 'react';
import { IPasswordInputProps } from '../../../types/auth';

function ConfirmPasswordInput({register, watch, errors}: IPasswordInputProps) {
    if (watch === undefined)
        return <></>;
    return (
        <>
            패스워드확인<br />
            <input {...register("confirmPassword", {
                validate: {
                    value: (value) => watch("password") === value || "비밀번호가 일치하지 않습니다."
                }
            })} className="todo" type="password" />
            <p>{errors.confirmPassword?.message}</p>
        </>
    );
}

export default ConfirmPasswordInput;
