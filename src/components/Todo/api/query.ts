import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { AUTHORIZATION_HEADER, CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../../constants";
import { setError } from "../../../redux/reducer/error";

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

export const useGetTodosQuery = () => {
    const dispatch = useDispatch();

    const { data } = useQuery('todos', getTodos, {
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        },
    });

    return data;
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

export const useGetTodoByIdQuery = (id: string | undefined) => {
    const dispatch = useDispatch();
    
    const { data } = useQuery(["todosId", id], ({queryKey}) => getTodoById(queryKey[1]), {
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        }
    });

    return data;
}