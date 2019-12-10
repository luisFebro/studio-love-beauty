import React from 'react';
import styled from 'styled-components';

export default function CartItem({ item, value }) {
    const { id, title, image, price, total, count } = item;
    const { increment, decrement, removeItem } = value;
    return (
        <div className="row my-4 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <ImgContainer className="img-fluid shadow-elevation" src={image} alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2 mt-4 mt-lg-0">
                <h4>
                    <span className="d-lg-none">produto: </span>
                </h4>
                <p className="text-sub-title">{title}</p>
            </div>
            <div className="col-10 mx-auto col-lg-2 text-yellow">
                <h4>
                    <span className="d-lg-none">preço: </span>
                    R$ {price}
                </h4>
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
                        -
                    </span>
                    <span style={{ cursor: 'default' }} className="btn btn-black mx-1">
                        {count}
                    </span>
                    <span className="btn btn-black mx-1" onClick={() => increment(id)}>
                        +
                    </span>
                </div>
            </div>
            {/* */}
            <div className="col-10 mx-auto col-lg-2 my-3">
                <div className="cart-icon" onClick={() => removeItem(id)}>
                    <i style={{ fontSize: '1.7rem' }} className="fas fa-trash"></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <h5>
                    <strong>total item: R$ {total}</strong>
                </h5>
            </div>
        </div>
    );
}

const ImgContainer = styled.img`
    /*NOT WORKING*/
    /*Tablet RWD*/
    @media only screen and (min-width: 380px) {
        width: 5rem,
        height: 5rem
    }

    /*NoteBook/Desktop RWD*/
    @media only screen and (min-width: 792px) {
        width: 8rem,
        height: 8rem
    }
`;
