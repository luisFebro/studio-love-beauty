import React from 'react';
import RegisteredUsersList from './RegisteredUsersList';
import DashSectionTitle from '../DashSectionTitle';

export default function DashUsers() {
    return (
        <div>
            <DashSectionTitle title="Dados dos Usuários Cadastrados" />
            <RegisteredUsersList />
        </div>
    );
}
