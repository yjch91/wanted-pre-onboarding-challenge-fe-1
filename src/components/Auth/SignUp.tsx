import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../hooks/mutation/auth';

const emailRegExp: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z]+$/;

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const { mutate: signUpMutate } = useSignUpMutation();
    
    useEffect(() => {
        if (emailRegExp.test(email) && password.length >= 8)
            setIsValid(true);
        else
            setIsValid(false);
    }, [navigate, email, password])

    return (
        <div>
            <div>회원가입</div>
            <div>
                이메일&nbsp;&nbsp;&nbsp; <input className="todo" type="text" name="signup_mail" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                패스워드 <input className="todo" type="password" name="signup_password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button disabled={!isValid} onClick={() => signUpMutate({email, password})}>가입</button>
            <button onClick={() => navigate("/auth/login")}>로그인 화면</button>
        </div>
    );
}

export default SignUp;
