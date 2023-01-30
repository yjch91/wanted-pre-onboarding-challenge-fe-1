import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../Auth/api/mutation';
import { ISignForm } from './type';
import ErrorModal from '../../Modal/ErrorModal';
import EmailInput from '../../Auth/Input/Email';
import PasswordInput from '../../Auth/Input/Password';
import { Button } from '../../Styled';

function Login() {
    const { 
        register, 
        handleSubmit,
        getValues,
        formState: { errors, isValid } 
    } = useForm<ISignForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { mutate: loginMutate, isLoading } = useLoginMutation();
    const loginSubmit = () => {
        loginMutate({email: getValues("email"), password: getValues("password")});
    };

    return (
        isLoading ? <div>Login...</div> :
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
            <ErrorModal />
        </div>
    );
}

export default Login;
