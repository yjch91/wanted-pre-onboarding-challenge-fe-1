import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/mutation/auth';
import { ILoginParams, ISignForm } from '../../types/auth';
import ErrorModal from '../Common/ErrorModal';
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
    const { mutate: loginMutate, isError, error } = useLoginMutation();
    const loginSubmit = ({email, password}: ILoginParams) => {
        loginMutate({email, password});
    };
    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isError)
            setIsOpenErrorModal(isError);
    }, [isError])

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
            { isOpenErrorModal && error instanceof Error ? <ErrorModal error={error} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
        </div>
    );
}

export default Login;
