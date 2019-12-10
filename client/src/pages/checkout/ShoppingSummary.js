import React from 'react';
import { ProductConsumer } from '../../data/contexts/mainContext';
export default function ShoppingSummary() {
    return (
        <div>
            <h2 style={{ margin: '4rem 0' }} className="brand bt-5 text-center">
                <strong>Quase lá!</strong>
            </h2>
            <ProductConsumer>
                {value => {
                    const { cart } = value;
                    let listTemp = cart.map(item => {
                        return `${item.count} ${item.title} || `;
                    });

                    return (
                        <section
                            style={{
                                padding: '15px',
                                background: 'green',
                                color: 'white',
                                marginBottom: '15px'
                            }}
                        >
                            <h3 className="text-center text-uppercase">Resumo do seu Pedido</h3>
                            <ul>
                                <li id="items">
                                    <h4>
                                        Items:
                                        <br />
                                        {listTemp}
                                    </h4>
                                </li>
                                <br />
                                <li id="total">
                                    <h4>
                                        Valor Total com Frete:
                                        <br />
                                        R$ {value.cartTotal}
                                    </h4>
                                </li>
                            </ul>
                        </section>
                    );
                }}
            </ProductConsumer>
        </div>
    );
}
