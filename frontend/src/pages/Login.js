import React from 'react';

const Login = () => {
    const handleLogin = () => {
        // Logic for Google SSO login will go here
        window.open('http://localhost:5000/auth/google', '_self');
    };

    return (
        <div className="login-container">
            <h1>Welcome to {process.env.REACT_APP_NAME || 'the App'}!</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;