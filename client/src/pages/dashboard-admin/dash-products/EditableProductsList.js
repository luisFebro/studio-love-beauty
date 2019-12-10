import React, { Fragment } from 'react';
import EditableProduct from './EditableProduct';

// Redux
import { useStoreState } from 'easy-peasy';
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots.js';
import PropTypes from 'prop-types';

ProductList.propTypes = {
    getAllProducts: PropTypes.func,
    isLoading: PropTypes.bool,
    allProductsList: PropTypes.object
};

export default function ProductList() {
    // Redux
    const { isLoading, allProductsList } = useStoreState(state => ({
        isLoading: state.globalReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList
    }));
    // End Redux

    return (
        <Fragment>
            <br />
            <br />
            <br />
            <h2 className="text-sub-title text-left pl-5">
                Total de Produtos: <strong>{allProductsList.length}</strong>
            </h2>
            <div className="py-5">
                <div className="container">
                    <div className="row text-center">
                        {isLoading ? (
                            <LoadingThreeDots />
                        ) : (
                            allProductsList.map(product => <EditableProduct key={product._id} product={product} />)
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
