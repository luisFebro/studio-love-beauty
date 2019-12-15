import React, { Fragment } from 'react';
import Register from '../components/auth/Register';
import ImageLogo from "../components/ImageLogo";
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

    const showMainContent = () => (
        <div className="mr-md-5 ml-md-4">
            <div className="my-4 text-container text-center">Amigo cliente, faça já o seu cadastro e participe de nosso plano de fidelidade</div>
            <div className="ml-md-5">
                <Register />
            </div>
            <div className="mt-3 text-container text-center">Acumule pontos e ganhe produtos e serviços</div>
            <div
                className="my-5 text-container font-weight-italic text-center"
                style={{color: "var(--mainPink)"}}
            >Consulte<br />as Regras</div>
        </div>
    );
    return(
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            {showMainContent()}
            <ImageLogo />
        </div>
    );
};
