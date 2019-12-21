import React from 'react';
import RegisteredClientsList from './RegisteredClientsList';
import DashSectionTitle from '../DashSectionTitle';

export default function DashClients() {
    return (
        <div>
            <DashSectionTitle title="Dados dos Clientes Cadastrados" />
            <RegisteredClientsList />
        </div>
    );
}
