import React from 'react';
import Product from '../../components/_layout/products/Product';
import Spinner from '../../components/loadingIndicators/Spinner';
import PropTypes from 'prop-types';

RelatedProducts.propTypes = {
    relatedProds: PropTypes.array.isRequired,
}

export default function RelatedProducts({ relatedProds }) {
    const listWithComponent = relatedProds.map(relatedOne => {
        return <Product
                    key={relatedOne._id}
                    product={relatedOne}
                    isFavBtnOn={false}
                />
    })

    return (
        <div style={{paddingTop: '50px'}}>
            <p className='text-left text-container mb-5'>Você também pode gostar:</p>
            {listWithComponent.length === 0
            ? <Spinner />
            : (
                <div className="container">
                    <div className="row">
                        {listWithComponent}
                    </div>
                </div>
            )}
        </div>
    );
}