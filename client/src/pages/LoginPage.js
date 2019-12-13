import React from 'react';
import Login from '../components/auth/Login';
import ImageLogo from '../components/ImageLogo';
export default function LoginPage({ location }) {
    const showMainContent = () => (
        <div className="mr-md-5">
            <div className="animated slideInLeft ml-3 text-container text-center">Faça seu acesso para ver seus pontos de fidelidade ou acesso coloborador</div>
            <Login />
        </div>
    );

    return (
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            {showMainContent()}
            <ImageLogo />
        </div>
    );
}