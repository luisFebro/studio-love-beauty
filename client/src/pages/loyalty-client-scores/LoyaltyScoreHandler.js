import React, { Fragment, useState } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import PurchaseValue from './PurchaseValue';
import StaffConfirmation from './StaffConfirmation';
import ClientScoresPanel from './ClientScoresPanel';
import ImageLogo from '../../components/ImageLogo';
import HomeButton from '../../components/buttons/HomeButton';
import { hideComponent, showComponent } from "../../redux/actions/componentActions";
import { logout } from "../../redux/actions/authActions";
import { Link } from 'react-router-dom';

export default function LoyaltyScoreHandler() {
    const [valuePaid, setValuePaid]  = useState("0");
    const [verification, setVerification]  = useState(false);

    const dispatch = useStoreDispatch();

    const {
        showPurchaseValue,
        showStaffConfirmation,
        showClientScoresPanel
    } = useStoreState(state => ({
        showPurchaseValue: state.componentReducer.cases.showPurchaseValue,
        showStaffConfirmation: state.componentReducer.cases.showStaffConfirmation,
        showClientScoresPanel: state.componentReducer.cases.showClientScoresPanel,
    }))

    const styles = {
        finishButton: {
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.5em',
            padding: '25px 35px',
            borderRadius: '20px',
            backgroundColor: 'var(--mainPink)',
            color: 'var(--mainWhite)',
            outline: 'none',
        }
    }

    const showHomeBtn = () => {
        const title = "Voltar";
        const backColorOnHover = "pink";
        const backgroundColor = "var(--mainPink)";
        return(
            <Link to="/acesso/verificacao" style={{textDecoration: "none"}}>
                <button
                    className="text-shadow mt-5 pressed-to-left"
                    style={styles.finishButton}
                    onClick={() => {
                        hideComponent(dispatch, "clientScoresPanel")
                        showComponent(dispatch, "login")
                        logout(dispatch);
                    }}
                    onMouseOver={e => e.target.style.backgroundColor=backColorOnHover}
                    onMouseOut={e => e.target.style.backgroundColor=backgroundColor}
                >
                    {title}
                </button>
            </Link>
        );
    };

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
                {showClientScoresPanel && showHomeBtn()}
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
