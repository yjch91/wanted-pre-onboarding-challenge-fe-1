import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN_TOKEN } from '../../../constants';


function LoginCheckHoc(CheckComponent: ComponentType) {

    return (() => {
        if (!!localStorage.getItem(LOGIN_TOKEN))
            return <Navigate to="/"></Navigate>;

        return <CheckComponent />;
    });
}

export default LoginCheckHoc;