import React from 'react';
import { EMAIL_REGEXP } from '../../../constants';
import { IEmailInput } from './type';

function EmailInput({register, errors}: IEmailInput) {
    return (
        <>
            <input {...register("email", {
                required: "이메일이 비어있습니다.",
                pattern: {
                    value: EMAIL_REGEXP,
                    message: "이메일 형식에 맞게 입력해야합니다."
                },
                maxLength: {
                    value: 30,
                    message: "이메일 30자이하 여야합니다."
                }
            })} className="signInputSize fontSize-1_25 p-8 mb-4" type="text" placeholder='이메일'
            />
            <p className="m-4 red">{errors.email?.message}</p>
        </>
    );
}

export default EmailInput;
