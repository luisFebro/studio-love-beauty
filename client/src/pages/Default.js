import React from 'react';
// import RedirectPage from '../components/RedirectPage';
import Illustration from '../components/Illustration';
import { CLIENT_URL } from '../config/clientUrl';

export default function Default() {
    return(
        <div className="text-white container-center">
            <Illustration
                title='Oops! Essa página não foi encontrada.'
                img={`${CLIENT_URL}/img/illustrations/page-not-found.svg`}
                alt="Página não encontrada."
            />
            <p className="text-default text-center mt-4">A página não foi encontrada!</p>
        </div>
    );
}

