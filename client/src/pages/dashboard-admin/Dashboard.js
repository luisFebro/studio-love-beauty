import React, { Fragment } from 'react';
import Title from '../../components/Title';
import GroupedDashSessions from './GroupedDashSessions';

export default function Dashboard() {
    return (
        <Fragment>
            <Title title="Painel de Controle Babadoo" />
            <div>
                <h2 className="text-sub-title text-center">
                    Somente a Conta Admin tem acesso a esta página com autentificação válida.
                </h2>
                <br />
                <h2 className="text-sub-title text-center">
                    Todas as modificações aqui são atualizadas tanto no site e banco de dados em tempo real.
                </h2>
            </div>
            <br />
            <GroupedDashSessions />
        </Fragment>
    );
}
