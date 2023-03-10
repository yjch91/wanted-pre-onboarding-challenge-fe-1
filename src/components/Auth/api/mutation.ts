import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../../constants";
import { setError } from "../../../redux/reducer/error";
import { ILoginParams, ISignUpParams } from "./type";

const signUpUser = ({email, password}: ISignUpParams) => {
    const res = fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => {
        if (!res.ok)
            throw new Error("이미 존재하는 유저입니다.");
        return res.json();
    })
    return res;
}

export const useSignUpMutation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return useMutation(signUpUser, {
        onSuccess: () => {
            navigate("/auth/login");
        },
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        },
    });
};

const loginUser = ({email, password}: ILoginParams) => {
    const res = fetch("http://localhost:8080/users/login", {
        method : "POST",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => {
        if (!res.ok)
            throw new Error("로그인에 실패하였습니다.");
        return res.json();
    })
    return res;
}

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return useMutation(loginUser, {
        onSuccess: (res) => {
            localStorage.setItem(LOGIN_TOKEN, res.token);
            navigate("/");
        },
        onError: (error) => {
            if (error instanceof Error)
                dispatch(setError(error.message, true));
        },
    });
};