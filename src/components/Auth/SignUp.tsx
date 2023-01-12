import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEXP } from '../../constants';
import { useSignUpMutation } from '../../hooks/mutation/auth';
import { ISignUpForm, ISignUpParams } from '../../types/auth';

function SignUp() {
    const { 
        register, 
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm<ISignUpForm>({ 
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { mutate: signUpMutate } = useSignUpMutation();
    const signUpSubmit = ({email, password}: ISignUpParams) => {
        signUpMutate({email, password});
    }
    
    return (
        <form onSubmit={handleSubmit(signUpSubmit)}>
            <div>회원가입</div>
            이메일<br />
            <input {...register("email", {
                required: "이메일이 비어있습니다.",
                pattern: {
                    value: EMAIL_REGEXP,
                    message: "이메일 형식에 맞게 입력해야합니다."
                }
            })} className="todo" type="text" placeholder='email' />
            <p>{errors.email?.message}</p>
            패스워드<br />
            <input {...register("password", {
                required: "비밀번호가 비어있습니다.",
                minLength: {
                    value: 8,
                    message: "비밀번호는 8자이상 이어야합니다."
                }
            })} className="todo" type="password" placeholder='password'/>
            <p>{errors.password?.message}</p>
            패스워드확인<br />
            <input {...register("confirmPassword", {
                validate: {
                    value: (value) => watch("password") === value || "비밀번호가 일치하지 않습니다."
                }
            })} className="todo" type="password" />
            <p>{errors.confirmPassword?.message}</p>
            <input disabled={!isValid} type="submit" value="가입" />
            <button type="button" onClick={() => navigate("/auth/login")}>취소</button>
        </form>
    );
}

export default SignUp;
