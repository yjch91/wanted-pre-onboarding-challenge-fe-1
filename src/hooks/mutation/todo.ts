import { useMutation, useQueryClient } from "react-query";
import { AUTHORIZATION_HEADER, CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../constants";
import { ICreateTodoParams, IUpdateTodoParams } from "../../types/todo";

const createTodo = async ({title, content}: ICreateTodoParams) => {
    const res = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE,
            [AUTHORIZATION_HEADER]: localStorage.getItem(LOGIN_TOKEN) || ''
        },
        body: JSON.stringify({
            title,
            content
        })
    });
    return await res.json();
}

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            alert(error);
        }
    });
}

const removeTodo = async (id: string) => {
    const res = await fetch("http://localhost:8080/todos/" + id, {
            method : "DELETE",
            headers: {
                [CONTENT_TYPE_HEADER]: CONTENT_TYPE,
                [AUTHORIZATION_HEADER]: localStorage.getItem(LOGIN_TOKEN) || ''
            },
    })
    return await res.json();
}

export const useRemoveTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(removeTodo,{
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            alert(error);
        }
    });
} 

const updateTodo = async ({title, content, id}: IUpdateTodoParams) => {
    const res = await fetch("http://localhost:8080/todos/" + id, {
        method : "PUT",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE,
            [AUTHORIZATION_HEADER]: localStorage.getItem(LOGIN_TOKEN) || ''
        },
        body: JSON.stringify({
            title,
            content
        })
    })
    return await res.json();
}

export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(updateTodo, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            alert(error);
        }
    });
} 
    

