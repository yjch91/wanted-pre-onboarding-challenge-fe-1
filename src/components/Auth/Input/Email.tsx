import React from 'react';
import { EMAIL_REGEXP } from '../../../constants';
import { IEmailInputProps } from '../../../types/auth';

function EmailInput({register, errors}: IEmailInputProps) {
    return (
        <>
            <div className="fontSize-1_5 mb4">이메일</div>
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
            })} className="inputSize fontSize-1_5 p-8" type="text" placeholder='email'
            />
            <p>{errors.email?.message}</p>
        </>
    );
}

export default EmailInput;
