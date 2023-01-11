import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TOKEN } from '../../constants/token';


function AuthCheckHoc(AuthComponent: ComponentType) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(LOGIN_TOKEN) === null)
            navigate("/auth/login");
    }, [navigate])

    return () => {
        if (localStorage.getItem(LOGIN_TOKEN) === null)
            return <></>;
        
        return <AuthComponent />;
    }
}

export default AuthCheckHoc;