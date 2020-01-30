import React, { useState } from 'react';
import DashSectionTitle from '../DashSectionTitle';
import ModalStaticBtn from './modal-form/ModalStaticBtn';
// import { useStoreState } from 'easy-peasy';

export default function DashStaffBooking() {
    // const [run, setRun] = useState(false);
    // const { data } = useStoreState(state => ({
    //     data: state.userReducer.cases.currentUser,
    // }));

    const styles = {
        modalBtn: {
            height: '7rem',
            width: '100%',
            // carbon css pattern
            background: 'linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)',
            backgroundColor: '#131313',
            backgroundSize: '20px 20px',
            // end carbon css pattern
            zIndex: 1000,
        }
    }

    const showNewRegisterBtn = () => (
        <div
            style={styles.modalBtn}
            className="container-center"
        >
            <ModalStaticBtn
                button={{
                    title: "Novo Registro",
                    backgroundColor: 'var(--mainPink)',
                    backColorOnHover: "pink",
                }}
                modal={{
                    title:"Registro Financeiro",
                    txtBtn: "Registrar",
                    iconBtn: "fas fa-save",
                    modalData: {
                        "valuePaid", // it does not required anymore
                    }
                }}
            />
        </div>
    );

    return (
        <div>
            <DashSectionTitle title="Registro Financeiro" />
            {showNewRegisterBtn()}
        </div>
    );
}