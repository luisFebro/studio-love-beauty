import React, { Fragment } from 'react';
import Register from '../components/auth/Register';
import ImageLogo from "../components/ImageLogo";
import { Link } from 'react-router-dom';

export default function Home() {
    const showMainContent = () => (
        <div className="ml-md-4">
            <span className="text-right for-version-test">{"t30"}</span>
            <div className="my-4 text-container text-center">Amigo cliente, faça já o seu cadastro <br /> e <br />participe de nosso plano de fidelidade</div>
            <div className="center-small">
                <Register />
            </div>
            <div className="mt-3 text-container text-center">Acumule pontos e ganhe produtos e serviços</div>
            <Link to="/regulamento">
                <div
                    className="my-5 text-container font-weight-italic text-center"
                    style={{color: "var(--mainPink)", cursor: "pointer"}}
                >
                    Consulte<br />as Regras Aqui
                </div>
            </Link>
        </div>
    );
    return(
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            {showMainContent()}
            <ImageLogo />
        </div>
    );
};
