import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';
import EditableProductList from './EditableProductsList';
import ExpansiblePanel from '../../../components/expansion-panels/ExpansiblePanel';
import ExpansiblePanelContent from '../ExpansiblePanelContent';

// Expansion Panel Content
const done = [
    { task: 'Trocar o Título dos Produtos' },
    { task: 'Trocar o Preço dos Produtos' },
    { task: 'Deletar Produtos' }
];
const inProgress = [
    { task: 'Adicionar Fotos' },
    { task: 'Adicionar Produtos' },
    { task: 'Adicionar Etiquetas: Novo, Esgotado, etc' },
    { task: 'Modificar qtde de cada produto' },
    { task: 'Lixeira: Histórico de Produtos Excluido para fácil recuperação' }
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

export default function DashProducts() {
    return (
        <Fragment>
            <DashSectionTitle title="Editar Informações dos Produtos" />
            <ExpansiblePanel actions={expansiblePanelActions} />
            <EditableProductList />
        </Fragment>
    );
}
