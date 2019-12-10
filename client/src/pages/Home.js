import React, { Component, Fragment } from 'react';
import ButtonCart from '../components/buttons/ButtonCart';
import Title from '../components/Title';
import ProductList from '../components/_layout/products/ProductList';
import ShareSocialMediaButtons from '../components/buttons/ShareSocialMediaButtons';
// import ServiceList from './biz-services/ServiceList';

const pageData = {
    titleShare: 'Compartilhe a Vitrine Babadoo',
    pageURL: 'https://babadoo.herokuapp.com',
    pageImg: 'https://i.imgur.com/9GjtAiW',
    pageTitle: 'Babadoo SexShop - Nossa Vitrine',
    pageDescription: ''
};
pageData.pageDescription = `Conheça nossa vitrine em ${pageData.pageURL}`;

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                {/*<ServiceList />*/}
                <Title title="Nossa Vitrine" />
                <ProductList />
                {/*Testing updates only*/}
                <h1 style={{ display: 'inline-block', background: '#000', color: '#fff' }}>{null}</h1>
                {/*End Testing updates only*/}
                <ShareSocialMediaButtons data={pageData} />
                <ButtonCart />
            </Fragment>
        );
    }
}
