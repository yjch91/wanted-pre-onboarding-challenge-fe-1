import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/mutation/auth';
import { ILoginParams, ISignForm } from '../../types/auth';
import EmailInput from './Input/Email';
import PasswordInput from './Input/Password';
import { Button } from './styled';

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
                <div className="fontSize-2 textCenter">로그인</div>
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
