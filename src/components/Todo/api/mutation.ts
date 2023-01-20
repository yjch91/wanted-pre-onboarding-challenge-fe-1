import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { AUTHORIZATION_HEADER, CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../../constants";
import { setError } from "../../../redux/reducer/error";
import { ICreateTodoParams, IUpdateTodoParams } from "./type";

const createTodo = ({title, content}: ICreateTodoParams) => {
    const res = fetch("http://localhost:8080/todos", {
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
        if (!res.ok)
            throw new Error("Todo 추가에 실패하였습니다.");
        return res.json();
    })
    return res;
}

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation(createTodo, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        }
    });
}

const removeTodo = (id: string) => {
    const res = fetch("http://localhost:8080/todos/" + id, {
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
    const dispatch = useDispatch();

    return useMutation(removeTodo,{
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        }
    });
} 

const updateTodo = ({title, content, id}: IUpdateTodoParams) => {
    const res = fetch("http://localhost:8080/todos/" + id, {
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
    const dispatch = useDispatch();

    return useMutation(updateTodo, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        }
    });
}
