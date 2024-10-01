import React from 'react';
import { handleGoogleLogin } from './async_funcs';
import './css_files/Login.css'

function Login() {
    return(
        <>
            <button className="login-button" onClick={handleGoogleLogin}>Login with Google</button>
        </>
    );
}

export default Login