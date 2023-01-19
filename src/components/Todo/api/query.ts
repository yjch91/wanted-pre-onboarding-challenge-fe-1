import { useQuery } from "react-query";
import { AUTHORIZATION_HEADER, CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../../constants";
import { ITodo } from "../type";
import { ITodoById, ITodos } from "./type";

const getTodos = () => {
    const res = fetch("http://localhost:8080/todos", {
        method: "GET",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE,
            [AUTHORIZATION_HEADER]: localStorage.getItem(LOGIN_TOKEN) || ''
        },
    }).then((res) => {
        if (!res.ok)
            throw new Error("Todos를 가져오는데 실패하였습니다.")
        return res.json();
    })
    return res;
}

export const useGetTodosQuery = (): { data: ITodos, isError: boolean, error: unknown } => {
    const { data, isError, error } = useQuery('todos', getTodos);

    return { data, isError, error };
}

const getTodoById = (todoId: string | undefined) => {
    if (todoId === undefined)
        todoId = "";
    
    const res = fetch("http://localhost:8080/todos/" + todoId, {
        method : "GET",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE,
            [AUTHORIZATION_HEADER]: localStorage.getItem(LOGIN_TOKEN) || ''
        },
    }).then((res) => {
        if (!res.ok)
            throw new Error("TodoById를 가져오는데 실패하였습니다.")
        return res.json();
    })
    return res;    
}

export const useGetTodoByIdQuery = (id: string | undefined): { data: ITodoById, isError: boolean, error: unknown }  => {
    const { data, isError, error } = useQuery(["todosId", id], ({queryKey}) => getTodoById(queryKey[1]));
    return { data, isError, error };
}