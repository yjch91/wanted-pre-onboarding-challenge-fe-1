import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/mutation/auth';
import { ILoginParams, ISignForm } from '../../types/auth';
import EmailInput from './Input/Email';
import PasswordInput from './Input/Password';
import { Button } from './styled';

// 로그인 페이지 css 스타일 해주기
// 로그인 errors 메시지 한쪽에 몰아주기

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
        <div className="signFormContainer">
            <form className="signForm p-16" onSubmit={handleSubmit(loginSubmit)}>
                <div className="fontSize-2 textCenter mb-4">로그인</div>
                <EmailInput register={register} errors={errors} />
                <PasswordInput register={register} errors={errors} />
                <div className="textCenter">
                    <Button type="submit" disabled={!isValid}>로그인</Button>
                    <Button type="button" onClick={() => {
                        navigate("/auth/signUp")
                    }}>회원가입</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
