import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TOKEN } from '../../constants/token';
import { useLoginMutation } from '../../hooks/mutation/auth';

const emailRegExp: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z]+$/;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const { mutate: loginMutate } = useLoginMutation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem(LOGIN_TOKEN))
            navigate("/");
        if (emailRegExp.test(email) && password.length >= 8)
            setIsValid(true);
        else
            setIsValid(false);
    }, [navigate, email, password])

    return (
        <div>
            <div>로그인</div>
            <div>
                이메일&nbsp;&nbsp;&nbsp; <input className="todo" type="text" name="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                패스워드 <input className="todo" type="password" name="pwd" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button disabled={!isValid} onClick={() => loginMutate({email, password})}>로그인</button>
            <button onClick={() => {navigate("/auth/signUp");}}>회원가입 화면</button>
        </div>
    )
}

export default Login;