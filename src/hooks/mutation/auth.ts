import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER, LOGIN_TOKEN } from "../../constants/token";
import { IUserInfo } from "../../types/auth";

const createUser = async ({email, password}: IUserInfo) => {
    const res = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    return await res.json();
}

export const useSignUpMutation = () => {
    
    const navigate = useNavigate();

    return useMutation(createUser, {
        onSuccess: (res) => {
            if (res?.details)
                alert(res.details);
            else {
                navigate("/auth/login");
            }
        },
        onError: (error) => {
            alert(error);
        }
})};

const loginUser = async ({email, password}: IUserInfo) => {
    const res = await fetch("http://localhost:8080/users/login", {
        method : "POST",
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    return await res.json();
}

export const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation(loginUser, {
        onSuccess: (res) => {
            if (res?.details)
                alert(res.details);
            else {
                localStorage.setItem(LOGIN_TOKEN, res.token);
                navigate("/");
            }
        },
        onError: (error) => {
            alert(error);
        }
    });
};