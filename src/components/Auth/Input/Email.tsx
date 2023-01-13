import React from 'react';
import { EMAIL_REGEXP } from '../../../constants';
import { IEmailInputProps } from '../../../types/auth';

function EmailInput({register, errors}: IEmailInputProps) {
    return (
        <>
            이메일<br />
            <input {...register("email", {
                required: "이메일이 비어있습니다.",
                pattern: {
                    value: EMAIL_REGEXP,
                    message: "이메일 형식에 맞게 입력해야합니다."
                }
            })} className="todo" type="text" placeholder='email'
            />
            <p>{errors.email?.message}</p>
        </>
    );
}

export default EmailInput;
