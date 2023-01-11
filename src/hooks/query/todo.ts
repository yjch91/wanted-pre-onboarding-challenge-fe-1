import { useQuery } from "react-query";
import { AUTHORIZATION_HEADER, CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../constants/token";

const getTodos = async () => {
    const res = await fetch("http://localhost:8080/todos", {
        method: "GET",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE,
            [AUTHORIZATION_HEADER]: localStorage.getItem(LOGIN_TOKEN) || ''
        },
    });
    return await res.json();
}
    
export const useGetTodosQuery = () => {
    const { data } = useQuery('todos', getTodos,{
        onError: (error) => {
            alert(error);
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
    })
    
    return await res.json();
}

export const useGetTodosByIdQuery = (id: string | undefined) => {
    const { data } = useQuery(["todosId", id], ({queryKey}) => getTodoById(queryKey[1]), {
        onError: (error) => {
            alert(error);
        }
    });
    
    return data;
}