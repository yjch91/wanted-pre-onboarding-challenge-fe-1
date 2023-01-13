import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/mutation/auth';
import { ILoginParams, ISignForm } from '../../types/auth';
import EmailInput from './Input/Email';
import PasswordInput from './Input/Password';

function Login() {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isValid } 
    } = useForm<ISignForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { mutate: loginMutate } = useLoginMutation();
    const loginSubmit = ({email, password}: ILoginParams) => {
        loginMutate({email, password});
    };

    return (
        <form onSubmit={handleSubmit(loginSubmit)}>
            <div>로그인</div>
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <input type="submit" value="로그인" disabled={!isValid} />
            <button type="button" onClick={() => {
                navigate("/auth/signUp")
            }}>회원가입</button>
        </form>
    );
}

export default Login;
