import React from 'react';
import { IPasswordInput } from './type';

function PasswordInput({register, errors}: IPasswordInput) {
    return (
        <>
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
            })} className="signInputSize fontSize-1_25 p-8 mb-4" type="password" placeholder='비밀번호'/>
            <p className="m-4 red">{errors.password?.message}</p>
        </>
    );
}

export default PasswordInput;
