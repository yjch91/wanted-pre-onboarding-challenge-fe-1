import { UseFormRegister, FieldErrorsImpl, UseFormGetValues } from "react-hook-form";
import { ISignForm } from "../../Page/Auth/type";

export interface IEmailInput {
    register: UseFormRegister<ISignForm>;
    errors: Partial<FieldErrorsImpl<{
        email: string;
        password: string;
    }>>;
}

export interface IPasswordInput {
    register: UseFormRegister<ISignForm>;
    errors: Partial<FieldErrorsImpl<{
        email: string;
        password: string;
        confirmPassword: string;
    }>>
    getValues?: UseFormGetValues<ISignForm>;
}
