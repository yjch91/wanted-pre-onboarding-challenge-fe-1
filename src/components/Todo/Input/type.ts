import { FieldErrorsImpl, UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ITodoForm } from "../type";

export interface ITitleInput {
    register: UseFormRegister<ITodoForm>;
    getValues: UseFormGetValues<ITodoForm>;
    errors: Partial<FieldErrorsImpl<{
        title: string;
        content: string;
    }>>;
}

export interface IContentInput {
    register: UseFormRegister<ITodoForm>;
    getValues: UseFormGetValues<ITodoForm>;
}
