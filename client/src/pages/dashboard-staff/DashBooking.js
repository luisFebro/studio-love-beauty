import React from 'react';
import DashSectionTitle from '../DashSectionTitle';
import ModalBtn from './modal';
import BookedClients from './BookedClients';
import { useStoreState } from 'easy-peasy';

export default function DashBooking() {
    const { data } = useStoreState(state => ({
        data: state.userReducer.cases.currentUser,
    }));

    const styles = {
        modalBtn: {
            height: '7rem',
            width: '100%',
            background: 'linear-gradient(to bottom, #42275a, #734b6d)',
            zIndex: 1000,
        }
    }

    const showNewBookingBtn = () => (
        <div
            style={styles.modalBtn}
            className="container-center">
            <ModalBtn
                modal={{
                    title: `Agendamento<br />de<br />cliente`,
                    txtBtn: "Agendar",
                    iconBtn: "fas fa-address-book",
                    modalData: data,
                }}
                button={{
                    title: "Marcar Novo Agendamento",
                    iconFontAwesome: "fas fa-user-plus",
                    backgroundColor: "var(--mainPink)",
                    backColorOnHover: "var(--mainPink)",
                }}
            />
        </div>
    );

    return (
        <div>
            <DashSectionTitle title="Seus Agendamentos" />
            {showNewBookingBtn()}
            <BookedClients />
        </div>
    );
}