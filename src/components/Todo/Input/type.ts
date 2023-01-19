import { FieldErrorsImpl, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ITodoForm } from "../type";

export interface ITitleInput {
    register: UseFormRegister<ITodoForm>;
    watch: UseFormWatch<ITodoForm>;
    errors: Partial<FieldErrorsImpl<{
        title: string;
        content: string;
    }>>;
}

export interface IContentInput {
    register: UseFormRegister<ITodoForm>;
    watch: UseFormWatch<ITodoForm>;
}
