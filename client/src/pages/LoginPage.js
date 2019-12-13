import React from 'react';
import Login from '../components/auth/Login';
import ImageLogo from '../components/ImageLogo';
export default function LoginPage({ location }) {
    const showMainContent = () => (
        <div className="mr-md-5 ml-md-4">
            <div
                className="my-4 animated slideInLeft ml-3 text-container text-center"
            >
                Identifique-se para ver seus pontos de fidelidade
                <br />
                ou
                <br />
                acesso à gerência</div>
            <div className="ml-5">
                <Login />
            </div>
        </div>
    );

    return (
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            {showMainContent()}
            <ImageLogo />
        </div>
    );
}