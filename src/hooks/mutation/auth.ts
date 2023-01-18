import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../constants";
import { ILoginParams, ISignUpParams } from "../../types/auth";

const signUpUser = async ({email, password}: ISignUpParams) => {
    const res = await fetch("http://localhost:8080/users/create", {
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

    return useMutation(signUpUser, {
        onSuccess: () => {
            navigate("/auth/login");
        },
    });
};

const loginUser = async ({email, password}: ILoginParams) => {
    const res = await fetch("http://localhost:8080/users/login", {
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

    return useMutation(loginUser, {
        onSuccess: (res) => {
            localStorage.setItem(LOGIN_TOKEN, res.token);
            navigate("/");
        },
    });
};