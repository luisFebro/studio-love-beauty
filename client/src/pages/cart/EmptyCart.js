import React from 'react';
import { useStoreState } from 'easy-peasy';
import { ButtonContainerPressedEffectDark as Dark } from '../../components/buttons/Default';
import Title from '../../components/Title';
import parse from 'html-react-parser';
import Illustration from '../../components/Illustration';
import { HashLink } from 'react-router-hash-link';

export default function EmptyCart() {
    const name = useStoreState(state => state.userReducer.cases.currentUser.name);

    return (
        <div className="text-center">
            <Title title={name !== null ? `Nada aqui, ${name}` : `Nada aqui, visitante!`} />
            <Illustration title={'Seu carrinho está vazio...'} img={'img/illustrations/empty-cart.svg'} />
            <h4 className="text-sub-title mt-5">
                {parse(`Assim que tiver pelo menos um item adicionado, pode voltar novamente!<br/>
                        Clique no ícone do carrinho para adicionar um item`)}
            </h4>
            <HashLink smooth to="/#inicio">
                <Dark className="text-capitalize mt-5">explorar produtos</Dark>
            </HashLink>
        </div>
    );
}
