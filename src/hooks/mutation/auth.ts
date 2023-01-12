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
    })
    return await res.json();
}

export const useSignUpMutation = () => {
    
    const navigate = useNavigate();

    return useMutation(signUpUser, {
        onSuccess: (res) => {
            if (res?.details)
                alert(res.details);
            else {
                navigate("/auth/login");
                alert("회원가입이 되었습니다.");
            }
        },
        onError: (error) => {
            alert(error);
        }
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