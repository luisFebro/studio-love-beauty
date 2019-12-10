import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';
import ExpansiblePanel from '../../../components/expansion-panels/ExpansiblePanel';
import ExpansiblePanelContent from '../ExpansiblePanelContent';

// Expansion Panel Content
const done = [];
const inProgress = [
    { task: 'Opção para Alterar Dados da Loja:' },
    { task: 'Horário de Funcionamento' },
    { task: 'Email' },
    { task: 'Contato' },
    { task: 'Endereço' },
    { task: 'Redes Sociais' }
];

const expansiblePanelActions = [
    {
        id: 1,
        mainHeading: 'Funcionalidades desta seção',
        secondaryHeading: 'Veja aqui o que já está funcionando e em Andamento',
        hiddenContent: <ExpansiblePanelContent doneTasks={done} inProgressTasks={inProgress} />
    }
];
// End Expansion Panel Content

export default function DashStore() {
    return (
        <Fragment>
            <DashSectionTitle title="Informações sobre a Loja" />
            <ExpansiblePanel actions={expansiblePanelActions} />
        </Fragment>
    );
}
