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
        <Fragment>
            <AuthCardHandler />
        </Fragment>
    );
};
