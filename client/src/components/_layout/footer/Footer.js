import React from 'react';
import SocialNetworks from './SocialNetworks';

const Footer = () => {
    return (
        <footer className="container-fluid mt-5">
            <p className="text-main-container text-center py-4">Siga a Gente nas Redes Sociais</p>
            <div className="pb-1">
                <SocialNetworks />
            </div>
            <div className="row">
                <div className="col-10 mx-auto text-center p-1 pt-3">
                    <strong>
                        Babadoo
                        <br />
                        Lingerie e produtos eróticos
                        <br />
                        {new Date().getFullYear()}
                        <br />
                    </strong>
                    Manaus - Amazonas
                </div>
            </div>
        </footer>
    );
};

export default Footer;
