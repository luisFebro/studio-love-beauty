import React from 'react';
import SocialNetworks from './SocialNetworks';

const Footer = () => {
    return (
        <footer className="container-fluid mt-5">
            <p className="text-main-container text-center py-4">Siga a gente aqui:</p>
            <div className="pb-1">
                <SocialNetworks />
            </div>
            <div className="row">
                <div className="col-10 mx-auto text-center p-1 pt-3">
                    <strong>
                        Studio Love Beauty
                        <br />
                        {new Date().getFullYear()}
                        <br />
                    </strong>
                    Roraima
                </div>
            </div>
        </footer>
    );
};

export default Footer;