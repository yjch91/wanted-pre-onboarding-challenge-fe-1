import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../hooks/mutation/auth';
import { ISignForm, ISignUpParams } from '../../types/auth';
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
    const { mutate: signUpMutate } = useSignUpMutation();
    const signUpSubmit = ({email, password}: ISignUpParams) => {
        signUpMutate({email, password});
    }
    
    return (
        <div className="signFormContainer">
            <form className="signForm p-16" onSubmit={handleSubmit(signUpSubmit)}>
                <div className="fontSize-2 textCenter">회원가입</div>
                <EmailInput register={register} errors={errors} />
                <PasswordInput register={register} errors={errors} />
                <ConfirmPasswordInput register={register} watch={watch} errors={errors} />
                <div className="textCenter">
                    <Button disabled={!isValid} type="submit">가입</Button>
                    <Button type="button" onClick={() => navigate("/auth/login")}>취소</Button>
                </div>
            </form>
        </div>

    );
}

export default SignUp;
