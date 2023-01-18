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
    }).then((res) => {
        //if (!res.ok)
        //    throw new Error("Todo 추가에 실패하였습니다.");
        return res.json();
    })
    return res;
}

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(createTodo, {
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            if (error instanceof Error)
                alert(error.message);
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
    }).then((res) => {
        if (!res.ok)
            throw new Error("Todo 삭제에 실패하였습니다.");
        return res.json();
    })
    return res;
}

export const useRemoveTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(removeTodo,{
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            if (error instanceof Error)
                alert(error.message);
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
    }).then((res) => {
        if (!res.ok)
            throw new Error("Todo 업데이트에 실패하였습니다.");
        return res.json();
    })
    return res;
}

export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(updateTodo, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            if (error instanceof Error)
                alert(error.message);
        }
    });
} 
    

