import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';
import ExpansiblePanel from '../../../components/expansion-panels/ExpansiblePanel';
import ExpansiblePanelContent from '../ExpansiblePanelContent';
import FirstBuyDiscount from './FirstBuyDiscount';
// Expansion Panel Content
const done = [{ task: 'Desconto primeira compra' }];
const inProgress = [
    { task: 'Desconto por quantidade' },
    { task: 'Desconto por Fidelidade' },
    { task: 'Desconto Frete' }
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

export default function DashPromotions() {
    return (
        <Fragment>
            <DashSectionTitle title="Modificar Promoções da Loja" />
            <ExpansiblePanel actions={expansiblePanelActions} />
            <FirstBuyDiscount />
        </Fragment>
    );
}
