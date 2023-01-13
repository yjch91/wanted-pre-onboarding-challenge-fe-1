import React from 'react';
import { IPasswordInputProps } from '../../../types/auth';

function PasswordInput({register, errors}: IPasswordInputProps) {
    return (
        <>
            패스워드<br />
            <input {...register("password", {
                required: "비밀번호가 비어있습니다.",
                minLength: {
                    value: 8,
                    message: "비밀번호는 8자이상 이어야합니다."
                }
            })} className="todo" type="password" placeholder='password'/>
            <p>{errors.password?.message}</p>
        </>
    );
}

export default PasswordInput;
