import React from 'react';
import RegisteredUsersList from './RegisteredUsersList';
import DashSectionTitle from '../DashSectionTitle';
import ExpansiblePanel from '../../../components/expansion-panels/ExpansiblePanel';
import ExpansiblePanelContent from '../ExpansiblePanelContent';

// Expansion Panel Content
const done = [
    { task: 'Mensagens Instantâneas' },
    { task: 'Excluir Usuários' },
    { task: 'Informações de Cadastro' },
    { task: 'Totais Favoritos, Carrinho' }
];
const inProgress = [{ task: 'Chat em Tempo Real' }, { task: 'Totais de Vendas por Cliente' }];

const expansiblePanelActions = [
    {
        id: 1,
        mainHeading: 'Funcionalidades desta seção',
        secondaryHeading: 'Veja aqui o que já está funcionando e em Andamento',
        hiddenContent: <ExpansiblePanelContent doneTasks={done} inProgressTasks={inProgress} />
    }
];
// End Expansion Panel Content

export default function DashUsers() {
    return (
        <div>
            <DashSectionTitle title="Dados dos Usuários Cadastrados" />
            <ExpansiblePanel actions={expansiblePanelActions} />
            <RegisteredUsersList />
        </div>
    );
}
