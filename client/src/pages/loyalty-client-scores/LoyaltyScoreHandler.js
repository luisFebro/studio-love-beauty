import React, { Fragment, useState } from 'react';
import ModalStaticBtn from './modal-form/ModalStaticBtn';
import { useStoreState } from 'easy-peasy';
import PurchaseValue from './PurchaseValue';
import StaffConfirmation from './StaffConfirmation';
import ClientScoresPanel from './ClientScoresPanel';
import ImageLogo from '../../components/ImageLogo';
import HomeButton from '../../components/buttons/HomeButton';

export default function LoyaltyScoreHandler() {
    const [valuePaid, setValuePaid]  = useState("0");
    const [verification, setVerification]  = useState(false);

    const {
        showPurchaseValue,
        showStaffConfirmation,
        showClientScoresPanel
    } = useStoreState(state => ({
        showPurchaseValue: state.componentReducer.cases.showPurchaseValue,
        showStaffConfirmation: state.componentReducer.cases.showStaffConfirmation,
        showClientScoresPanel: state.componentReducer.cases.showClientScoresPanel,
    }))

    return (
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            <PurchaseValue
                success={showPurchaseValue}
                setValuePaid={setValuePaid}
            />
            <StaffConfirmation
                success={showStaffConfirmation}
                setVerification={setVerification}
            />
            <ClientScoresPanel
                success={showClientScoresPanel}
                valuePaid={valuePaid}
                verification={verification}
            />
            <div className="container-center-col">
                <ImageLogo />
                {showClientScoresPanel &&
                <div>
                    <ModalStaticBtn
                        button={{
                            title: "Finalizar",
                            backgroundColor: 'var(--mainPink)',
                            backColorOnHover: "pink",
                        }}
                        modal={{
                            title:"Registro Financeiro",
                            txtBtn: "Registrar e Voltar",
                            iconBtn: "fas fa-save",
                            modalData: {
                                valuePaid,
                            }
                        }}
                    />
                </div>}
            </div>
            <Fragment>
               {
                    !showPurchaseValue &&
                    !showStaffConfirmation &&
                    !showClientScoresPanel &&
                    <HomeButton />
               }
            </Fragment>
        </div>
    );
}
