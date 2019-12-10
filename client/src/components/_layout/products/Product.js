import React, { useState, Fragment, useRef } from 'react';
import FavBtn from '../../buttons/product/FavBtn';
import Skeleton from '@material-ui/lab/Skeleton';
import ShowImgOrSkeleton from '../../ShowImgOrSkeleton';
// Redux
import { productType } from '../../../types';

// End Redux
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// helpers
import truncateWords from '../../../utils/string/truncateWords';
import PropTypes from 'prop-types';

Product.propTypes = {
    product: productType,
    setRun: PropTypes.func,
    isFavBtnOn: PropTypes.bool,
    isFromFavPage: PropTypes.bool,
}

function Product({
    product,
    setRun,
    isFavBtnOn,
    isFromFavPage }) {
    const animateRef = useRef(null);
    const [showSkeleton, setShowSkeleton] = useState(true);

    const { _id, title, price, link  } = product;
    // need to include inCart here added from client
    const inCart = false;

    const showImage = () => (
        <Link to={`/produto/${link}`}>
            <ShowImgOrSkeleton
                id={_id}
                url="product"
                setStatus={setShowSkeleton}
                status={showSkeleton}
                skeletonOpt={{
                    variant: 'rect',
                    width: 191,
                    height: 191,
                }}
                imgOpt={{
                    className: "card-img-top",
                    alt: title
                }}
            />
        </Link>
    );

    const handleCartButton = () => (
        <button
            style={{ display: showSkeleton ? 'none' : 'block'}}
            className="cart-btn"
            disabled={inCart ? true : false}
            onClick={() => {
                // value.addToCart(_id);
                // value.openModal(_id);
            }}
        >
            {inCart ? (
                <p className="text-capitalize mb-0" disabled>
                    {' '}
                    No carrinho
                </p>
            ) : (
                <i className="fas fa-cart-plus"></i>
            )}
        </button>

    );

    // Footer
    const showTitle = () => (
        <div style={{ height: '4em', overflow: 'hidden' }}>
            {showSkeleton
            ? (
                <Fragment>
                    <Skeleton variant="text" style={{marginTop: '5px'}}/>
                    <Skeleton variant="text" style={{marginLeft: '130px'}} />
                </Fragment>
            )
            : (
                <p className="mb-0 text-default">
                    {truncateWords(title.cap(), 40)}
                </p>
            )}
        </div>
    );

    const showPrice = () => (
        <h5 className="mt-2 text-right mb-2 mr-2">
            <span
                style={{display: showSkeleton ? 'none' : 'block'}}
            >
                R$ {price}
            </span>
        </h5>
    );

    return (
        <ProductWrapper ref={animateRef} className="animated jackInTheBox slow col-6 col-md-4 col-lg-3 mx-auto my-2">
            <div className="card">
                <div
                    className="img-container p-1 p-sm-3"
                >
                    {showImage()}
                    <FavBtn
                        showSkeleton={showSkeleton}
                        productId={_id}
                        animationRef={animateRef.current}
                        isFavBtnOn={isFavBtnOn}
                        isFromFavPage={isFromFavPage}
                        setRun={setRun}
                    />
                    {handleCartButton()}
                </div>
                <div className="text-product-title p-1 card-footer d-flex flex-column text-center justify-content-between">
                    {showTitle()}
                    {showPrice()}
                </div>
            </div>
        </ProductWrapper>
    );
}

export default React.memo(Product);

const ProductWrapper = styled.div`
    .card {
        box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card{
            box-shadow: 0 19px 38px rgba(0,0,0,0.40), 0 15px 12px rgba(250,0,0,0.32)
            border: .04rem solid rgba(0, 0, 0, .2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }

    .img-container {
        position: relative;
        overflow: hidden; //This is essencial for handle bigger pics
    }

    .card-img-top {
        transition: all .6s linear;
    }

    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: .2rem .4rem;
        background: var(--mainYellow);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: .5rem 0 0 0;
        transform: translate(0, 0); /*translate(100%, 100%)*/
        transition: all 1s linear;
    }

    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }

    .cart-btn:focus, .cart-fav:focus {
        outline: none;
    }

    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
`;
