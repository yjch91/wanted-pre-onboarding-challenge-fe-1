import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEXP } from '../../constants';
import { useLoginMutation } from '../../hooks/mutation/auth';
import { ILoginForm } from '../../types/auth';

function Login() {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isValid } 
    } = useForm<ILoginForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { mutate: loginMutate } = useLoginMutation();
    const loginSubmit = ({email, password}: ILoginForm) => {
        loginMutate({email, password});
    };

    return (
        <form onSubmit={handleSubmit(loginSubmit)}>
            <div>로그인</div>
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
            패스워드<br />
            <input {...register("password", {
                required: "비밀번호가 비어있습니다.",
                minLength: {
                    value: 8,
                    message: "비밀번호는 8자이상 이어야합니다."
                }
            })} className="todo" type="password" placeholder='password'/>
            <p>{errors.password?.message}</p>
            <input type="submit" value="로그인" disabled={!isValid} />
            <button type="button" onClick={() => {
                navigate("/auth/signUp")
            }}>회원가입</button>
        </form>
    );
}

export default Login;
