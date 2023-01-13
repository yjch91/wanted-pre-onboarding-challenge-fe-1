import { UseFormRegister, FieldErrorsImpl, UseFormWatch } from "react-hook-form";

export interface ILoginParams {
    email: string;
    password: string;
}

export interface ISignUpParams {
    email: string;
    password: string;
}

export interface ISignForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IEmailInputProps {
    register: UseFormRegister<ISignForm>;
    errors: Partial<FieldErrorsImpl<{
        email: string;
        password: string;
    }>>;
}

export interface IPasswordInputProps {
    register: UseFormRegister<ISignForm>;
    errors: Partial<FieldErrorsImpl<{
        email: string;
        password: string;
        confirmPassword: string;
    }>>
    watch?: UseFormWatch<ISignForm>;
}
