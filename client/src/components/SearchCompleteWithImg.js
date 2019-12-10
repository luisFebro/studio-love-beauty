import _ from 'lodash';
import { storeProducts } from '../data/dataStoreProducts';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import styled from 'styled-components';
import { ProductConsumer } from '../data/contexts/mainContext';
import { Link } from 'react-router-dom';

class SearchCompleteWithImg extends Component {
    constructor() {
        super();
        this.state = {
            source: storeProducts
        };
    }
    componentWillMount() {
        this.resetComponent();
    }

    getDataWithRef() {
        return (
            <ProductConsumer>
                {value => {
                    this.setState({ source: value.products });
                    console.log(this.state.source);
                }}
            </ProductConsumer>
        );
    }

    goToDetailsPageDiv(e, result) {
        return (
            <Link to="/produto/:dashed-name">
                <ui>
                    <li>result.title</li>
                    <li>result.description</li>
                    <li>result.image</li>
                </ui>
            </Link>
        );
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => this.goToDetailsPageDiv(e, result);

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);
            this.setState({
                isLoading: false,
                results: _.filter(this.state.source, isMatch)
            });
        }, 300);
    };

    render() {
        const { isLoading, value, results } = this.state;
        this.getDataWithRef();
        return (
            <Search
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                })}
                loading={isLoading}
                results={results}
                value={value}
                //
                input={{ placeholder: 'Procure um item...' }}
                noResultsMessage={''}
                noResultsDescription={'Oops! Nenhum item babadoo encontrado...'}
                {...this.props}
            />
        );
    }
}

export default () => (
    <DivContainer>
        <SearchCompleteWithImg className="animated zoomIn slow" />
    </DivContainer>
);

const DivContainer = styled.div`
    position: fixed;
    top: 5rem;
    right: 10%;
    filter: drop-shadow(0.001em 0.1em 0.1em var(--mainYellow));
    z-index: 1500;

    & p {
        position: relative;
        z-index: 100;
        right: 3em;
        top: -10px;
        color: grey;
    }
    input {
        max-width: 5rem;
        -webkit-box-flex: 1;
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        outline: 0;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        text-align: left;
        line-height: 1.21428571em;
        font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        padding: 0.67857143em 1em;
        background: #fff;
        border: 1px solid rgba(34, 36, 38, 0.15);
        color: rgba(0, 0, 0, 0.87);
        border-radius: 0.28571429rem;
        -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
        transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
        transition: box-shadow 0.1s ease, border-color 0.1s ease;
        transition: box-shadow 0.1s ease, border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    results .result:last-child {
        border-bottom: none !important;
    }

    results {
        overflow: scroll;
    }

    .ui.search > .results .result {
        cursor: pointer;
        display: block;
        overflow: hidden;
        font-size: 1em;
        padding: 0.85714286em 1.14285714em;
        color: rgba(0, 0, 0, 0.87);
        line-height: 1.33;
        border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    }

    .image {
        float: right;
        overflow: hidden;
        background: 0 0;
        width: 7em;
        height: 5em;
        border-radius: 0.25em;
    }

    .ui.search > .results .result .image + .content {
        margin: 0 6em 0 0;
    }

    .ui.search > .results .result .price {
        float: right;
        font-size: 1.4rem;
        font-weight: bold;
        color: #21ba45;
    }
    .price::before {
        font-size: 1.4rem;
        content: 'R$ ';
    }
`;

// HTML
/*<div class="ui grid">
    <div class="six wide column">
        <div class="ui search backGroundTemp" style="right: 0px; top: 15px; position: fixed; display: block;">
            <div class="ui icon input"><input type="text" tabindex="0" class="prompt" autocomplete="off" value="Kit Com 2 Algemas Velc"><i aria-hidden="true" class="search icon"></i></div>
            <div class="results transition">
                <div class="result">
                    <div class="image"><img src="https://imgur.com/QrOtS1h.png"></div>
                    <div class="content">
                        <div class="price">R$40,0</div>
                        <div class="title">Kit Com 2 Algemas Velcro</div>
                        <div class="description">sadomasoquismo</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>*/
