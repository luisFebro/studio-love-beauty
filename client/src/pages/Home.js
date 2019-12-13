import React, { Fragment } from 'react';
import AuthCardHandler from '../components/auth/AuthCardHandler';

// import ButtonCart from '../components/buttons/ButtonCart';
// import Title from '../components/Title';
// <Title title="Nossa Vitrine" />
// import ServiceList from './biz-services/ServiceList';

// const pageData = {
//     titleShare: 'Compartilhe a Vitrine Babadoo',
//     pageURL: 'https://babadoo.herokuapp.com',
//     pageImg: 'https://i.imgur.com/9GjtAiW',
//     pageTitle: 'Babadoo SexShop - Nossa Vitrine',
//     pageDescription: ''
// };
// pageData.pageDescription = `Conheça nossa vitrine em ${pageData.pageURL}`;

export default function Home() {
    return(
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            <div className="mr-md-5">
                <div className="ml-3 text-container text-center">Amigo cliente, faça já o seu cadastro e participe de nosso plano de fidelidade</div>
                <AuthCardHandler />
                <div className="ml-3 text-container text-center">Acumule pontos e ganhe produtos e serviços</div>
                <div
                    className="my-5 text-container font-weight-italic text-center"
                    style={{color: "var(--mainPink)"}}
                >Consulte<br />as Regras</div>
            </div>
            <div className="mr-md-5 mt-md-5">
                <img className="image" width="500" height="300" src="img/official-logo.jpg" alt="logomarca"/>
            </div>
        </div>
    );
};
