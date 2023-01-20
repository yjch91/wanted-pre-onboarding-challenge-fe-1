export interface ITodo {
    title: string,
	content: string,
	readonly id: string,
	readonly creatdAt: string,
	readonly updatedAt: string,
}

export interface ITodoList {
    todos: ITodo[],
}

export interface ITodoListItem {
	todo: ITodo,
}

export interface ITodoForm {
    title: string,
	content: string,
}
