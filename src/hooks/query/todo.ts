import { useQuery } from "react-query";
import { AUTHORIZATION_HEADER, CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../constants";

const getTodos = async () => {
    const res = await fetch("http://localhost:8080/todos", {
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
    const { data } = useQuery('todos', getTodos,{
        onError: (error) => {
            if (error instanceof Error)
                alert(error.message);
        }
    });

    return data;
}


const getTodoById = async (todoId: string | undefined) => {
    if (todoId === undefined)
        todoId = "";
    
    const res = await fetch("http://localhost:8080/todos/" + todoId, {
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

export const useGetTodosByIdQuery = (id: string | undefined) => {
    const { data } = useQuery(["todosId", id], ({queryKey}) => getTodoById(queryKey[1]), {
        onError: (error) => {
            if (error instanceof Error)
                alert(error.message);
        }
    });
    
    return data;
}