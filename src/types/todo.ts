export interface todo {
    title: string,
	content: string,
	readonly id: string,
	readonly creatdAt: string,
	readonly updatedAt: string,
}

export interface todos {
    data: todo[],
}

export interface createTodoParams {
    title: string,
	content: string,
}

export interface updateTodoParams {
    title: string,
	content: string,
	id: string,
}