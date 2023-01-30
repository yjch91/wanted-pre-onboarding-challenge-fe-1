import React from 'react';
import { IPasswordInput } from './type';

function ConfirmPasswordInput({register, getValues, errors}: IPasswordInput) {
    if (getValues === undefined)
        return <></>;
    return (
        <>
            <input {...register("confirmPassword", {
                validate: {
                    value: (value) => getValues("password") === value || "비밀번호가 일치하지 않습니다."
                }
            })} className="signInputSize fontSize-1_25 p-8 mb-4" type="password" placeholder='비밀번호 확인'/>
            <p className="m-4 red">{errors.confirmPassword?.message}</p>
        </>
    );
}

export default ConfirmPasswordInput;
