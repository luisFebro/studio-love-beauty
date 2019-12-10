import React, { Fragment } from 'react';
import RedirectPage from '../components/RedirectPage';
import Illustration from '../components/Illustration';
import { CLIENT_URL } from '../config/clientUrl';

export default function Default({ location }) {
    return(
        <Fragment>
            <Illustration
                title='Oops! Essa página não foi encontrada.'
                img='img/illustrations/page-not-found.svg'
                alt="Página não encontrada."
            />
            <RedirectPage activated={true} waitSec={10} />
            <p className="text-default text-center mt-4">A página <span className="text-red">{CLIENT_URL}{location.pathname}</span> não foi encontrada!</p>
        </Fragment>
    );
}

