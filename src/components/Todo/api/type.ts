import { ITodo } from "../type";

export interface ICreateTodoParams {
    title: string,
	content: string,
}

export interface IUpdateTodoParams {
    title: string,
	content: string,
	id: string,
}

export interface ITodos {
    data: ITodo[],
}

export interface ITodoById {
    data: ITodo,
}
