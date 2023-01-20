import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../Auth/api/mutation';
import ErrorModal from '../../Modal/ErrorModal';
import ConfirmPasswordInput from '../../Auth/Input/ConfirmPassword';
import EmailInput from '../../Auth/Input/Email';
import PasswordInput from '../../Auth/Input/Password';
import { Button } from '../../Styled';
import { ISignForm } from './type';

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
    const { mutate: signUpMutate, isLoading, isError, error } = useSignUpMutation();
    const signUpSubmit = () => {
        signUpMutate({email: watch("email"), password: watch("password")});
    }
    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

    useEffect(() => {
        if (isError)
            setIsOpenErrorModal(true);
    }, [isError])

    return (
        isLoading ? <div>SingUp...</div> :
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
            <ErrorModal />
        </div>

    );
}

export default SignUp;
