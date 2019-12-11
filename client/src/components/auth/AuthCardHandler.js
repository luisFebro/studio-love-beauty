import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

export default function AuthCardHandler() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    return (
        <div className="container-center my-5">
            <Register setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />
            <Login setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />
        </div>
    );
}