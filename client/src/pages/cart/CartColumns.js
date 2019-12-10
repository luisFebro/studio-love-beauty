import React from 'react';

export default function CartColumns() {
    return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">produtos</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">descrição</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">preço</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">quantidade</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">remover</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">total</p>
                </div>
            </div>
        </div>
    );
}
