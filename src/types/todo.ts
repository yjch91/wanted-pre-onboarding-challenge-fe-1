export interface ITodo {
    title: string,
	content: string,
	readonly id: string,
	readonly creatdAt: string,
	readonly updatedAt: string,
}

export interface ITodos {
    data: ITodo[],
}

export interface ITodoListItemProps {
	todo: ITodo,
}

export interface ICreateTodoParams {
    title: string,
	content: string,
}

export interface IUpdateTodoParams {
    title: string,
	content: string,
	id: string,
}

export interface ITodoCheckModalProps {
    setIsOpenModal: Function;
    setIsAgree: Function;
}