import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../hooks/mutation/auth';
import { ISignForm, ISignUpParams } from '../../types/auth';
import ErrorModal from '../Common/ErrorModal';
import ConfirmPasswordInput from './Input/ConfirmPassword';
import EmailInput from './Input/Email';
import PasswordInput from './Input/Password';
import { Button } from './styled';

function SignUp() {
    const { 
        register, 
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm<ISignForm>({ 
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { mutate: signUpMutate, isError, error } = useSignUpMutation();
    const signUpSubmit = ({email, password}: ISignUpParams) => {
        signUpMutate({email, password});
    }
    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isError)
            setIsOpenErrorModal(isError);
    }, [isError])

    return (
        <div className="signFormContainer">
            <form className="signForm p-16" onSubmit={handleSubmit(signUpSubmit)}>
                <div className="fontSize-2 textCenter mb-4">회원가입</div>
                <EmailInput register={register} errors={errors} />
                <PasswordInput register={register} errors={errors} />
                <ConfirmPasswordInput register={register} watch={watch} errors={errors} />
                <div className="textCenter">
                    <Button disabled={!isValid} type="submit">가입</Button>
                    <Button type="button" onClick={() => navigate("/auth/login")}>취소</Button>
                </div>
            </form>
            { isOpenErrorModal && error instanceof Error ? <ErrorModal error={error} setIsOpenErrorModal={setIsOpenErrorModal} /> : <></> }
        </div>

    );
}

export default SignUp;
