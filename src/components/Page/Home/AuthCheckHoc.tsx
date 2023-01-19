import React, { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { LOGIN_TOKEN } from '../../../constants';


function AuthCheckHoc(PageComponent: ComponentType) {
    return (() => {
        if (localStorage.getItem(LOGIN_TOKEN) === null)
            return <Navigate to="/auth/login" />;

        return <PageComponent />;
    });
}

export default AuthCheckHoc;