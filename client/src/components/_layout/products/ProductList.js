import React from 'react';
// Redux
import { useStoreState } from 'easy-peasy';
// import { getAllProducts } from '../../../redux/actions/productActions';
// import { checkForServerError } from '../../redux/actions/errorActions';
// End Redux
import Product from './Product';

export default function ProductList() {
    // Redux
    const { allProductsList } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
    }));

    const list = allProductsList.map(product => {
        return <Product key={product._id} product={product} />;
    })

    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    {list}
                </div>
            </div>
        </div>
    );
}
