import React from 'react';
import { IPasswordInputProps } from '../../../types/auth';

function PasswordInput({register, errors}: IPasswordInputProps) {
    return (
        <>
            <div className="fontSize-1_5 mb4">패스워드</div>
            <input {...register("password", {
                required: "비밀번호가 비어있습니다.",
                minLength: {
                    value: 8,
                    message: "비밀번호는 8자이상 이어야합니다."
                },
                maxLength: {
                    value: 16,
                    message: "비밀번호는 16자이하 여야합니다."
                }
            })} className="inputSize fontSize-1_5 p-8" type="password" placeholder='password'/>
            <p>{errors.password?.message}</p>
        </>
    );
}

export default PasswordInput;
