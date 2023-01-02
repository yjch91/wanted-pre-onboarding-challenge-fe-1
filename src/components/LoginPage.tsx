import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [userEmail, setUserID] = useState("");
    const [userPwd, setUserPWD] = useState("");
    const [validCheck, setValidCheck] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('loginToken'))
            navigate("/");
        const regexp: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z]+$/;
        if (regexp.test(userEmail) && userPwd.length >= 8)
            setValidCheck(true);
        else
            setValidCheck(false);
    }, [navigate, userEmail, userPwd])

    const address: string = "http://localhost:8080/users/";
    function loginUser() {
        fetch(address + "login", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": userEmail,
                "password": userPwd
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('loginToken', data.token);
                navigate("/");
            }
            else
                alert(data.details);
        });
    }

    function createUser() {
        fetch(address + "create", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": userEmail,
                "password": userPwd
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.token) {
                alert(data.message);
                setIsLogin(!isLogin);
            }
            else
                alert(data.details);
        });
    }

    return (
        <div>
            { isLogin && <>
                <div>Login</div>
                <div>
                    이메일&nbsp;&nbsp;&nbsp; <input className="todo" type="text" name="email" onChange={(e) => setUserID(e.target.value)}></input>
                </div>
                <div>
                    패스워드 <input className="todo" type="password" name="pwd" onChange={(e) => setUserPWD(e.target.value)}></input>
                </div>
                <button disabled={!validCheck} onClick={loginUser}>로그인</button>
                <button onClick={() => {setIsLogin(!isLogin)}}>회원가입</button>
            </> }

            { isLogin === false && <>
                <div>회원가입</div>
                <div>
                    이메일&nbsp;&nbsp;&nbsp; <input className="todo" type="text" name="create_mail" onChange={(e) => setUserID(e.target.value)}></input>
                </div>
                <div>
                    패스워드 <input className="todo" type="password" name="create_pwd" onChange={(e) => setUserPWD(e.target.value)}></input>
                </div>
                <button disabled={!validCheck} onClick={createUser}>가입</button>
                <button onClick={() => {setIsLogin(!isLogin)}}>로그인</button>
            </> }
        </div>
    )
}

export default LoginPage;