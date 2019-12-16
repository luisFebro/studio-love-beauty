import React, { useRef, Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { findAnItem } from '../../../redux/actions/globalActions';
import { showModalConfYesNo, showModalTextField } from '../../../redux/actions/modalActions';
import { animateHinge } from '../../../redux/actions/animationActions';
// End Redux
import DeleteButton from '../../../components/buttons/DeleteButton';
import MessageButton from '../../../components/buttons/MessageButton';
import PropTypes from 'prop-types';
// Material UI
// import { makeStyles } from '@material-ui/core/styles';

moment.updateLocale('pt-br');

RegisteredUser.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        favoriteList: PropTypes.arrayOf(PropTypes.object),
        inCartList: PropTypes.arrayOf(PropTypes.object),
        registerDate: PropTypes.string
    }).isRequired
};

// const useStyles = makeStyles(theme => ({
//     button: {
//         margin: theme.spacing(1),
//         color: 'var(--mainWhite)',
//         fontSize: '1.9rem'
//     },
//     input: {
//         display: 'none'
//     }
// }));

export default function RegisteredUser({ data }) {
    const animateRef = useRef(null);
    let { allUsers } = useStoreState(state => ({
        allUsers: state.userReducer.cases.allUsers,
    }));
    const dispatch = useStoreDispatch();
    const {
        _id,
        name,
        cpf,
        loyaltyScores,
        isAdmin,
        isStaff,
        phone,
        maritalStatus,
        birthday,
        email,
        createAt,
        updateAt } = data;

    const whichRole = () => {
        if(isAdmin) return "Administrador";
        if(isStaff) return "Colaborador";
        if(!isStaff && !isAdmin) return "Cliente";
    }

    const displayLoyaltyScores = () => (
        <div style={{backgroundColor: "grey"}}>
            <p>Pontos Fidelidade:</p>
            {["0", undefined].includes(loyaltyScores && loyaltyScores.currentScore)
            ? <p className="text-center">Pontuação não registrada.</p>
            : (
                <Fragment>
                    <div className="text-center font-weight-bold">Acumulado: {loyaltyScores && loyaltyScores.currentScore}</div>
                    <div className="d-flex justify-content-center">
                        <div className="mr-4">Valor Anterior: {loyaltyScores && loyaltyScores.lastScore}</div>
                        <div>Última Pontuação: {loyaltyScores && loyaltyScores.cashCurrentScore}</div>
                    </div>
                </Fragment>
            )}
        </div>
    );

    const displayMoreInfo = () => (
        <Fragment>
            <div>
                <p>ID: {_id}</p>
            </div>
            <div>
                <p>Email: {email}</p>
            </div>
            <div>
                <p>Contato: {phone}</p>
            </div>
            <div>
                <p>Aniversário: {birthday}</p>
            </div>
            <div>
                <p>Estado Civil: {maritalStatus}</p>
            </div>
        </Fragment>
    );

    const showMainBlock = () => (
        <Fragment>
            <div>
                <p>Name: {name}</p>
            </div>
            <div>
                <p>Tipo Usuário: {whichRole()}</p>
            </div>
            <div>
                <p>CPF: {cpf}</p>
            </div>
            <div>
                <p>Dia do Cadastro: {moment(createAt).format('Do MMMM [às] h:mm a, YYYY[.]')}</p>
                <p>Última Atualização: {moment(updateAt).format('Do MMMM [às] h:mm a, YYYY[.]')}</p>
            </div>
            {displayLoyaltyScores()}
            {displayMoreInfo()}
        </Fragment>
    );

    const showDeleteButton = () => (
        <DeleteButton
            top={-20}
            left={245}
            onClick={() => {
                const attachedObj = {
                    action: {
                        noun: 'Exclusão',
                        verb: 'Excluir'
                    },
                    mainSubject: 'Usuário'
                };
                findAnItem(dispatch, allUsers, _id, attachedObj);
                showModalConfYesNo(dispatch);
                setTimeout(() => {
                    const cssText = `
                        width: 90%;
                        border-radius: 10px;
                        padding: 20px 10px;
                        margin: 15px auto;
                        background-color: #f39c12;
                        color: #ecf0f1;`;
                    animateHinge(animateRef, cssText);
                }, 9000);
            }}
        />
    );

    return (
        <DivWrapper ref={animateRef} className="text-default" style={{ position: 'relative' }}>
            {showMainBlock()}
            {showDeleteButton()}
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    width: 90%;
    border-radius: 10px;
    padding: 20px 10px;
    margin: 15px auto;
    background-color: var(--mainDark);
    color: #ecf0f1;
`;


/*
<section>
    <h2 className="text-default text-center">Totais de Itens do Usuário:</h2>
    <div className="container-center" style={{ flexDirection: 'row' }}>
        <div style={{ marginRight: '15px' }}>
            Totais de Favoritos: <strong>{favoriteList.length}</strong>
        </div>
        <div>
            Totais de Items no Carrinho: <strong>{inCartList.length}</strong>
        </div>
    </div>
</section>

MSG BUTTON
{name !== 'admin' ? (
    <div>
        <MessageButton
            top={-20}
            left={190}
            onClick={() => {
                if (userName === 'admin') userName = 'Loja Babadoo';
                const attachedObj = {
                    propTitle: 'Envio de Mensagem Instantânea',
                    propSubTitle: 'Escreva abaixo sua mensagem para usuário',
                    propTxtBtn: 'Enviar',
                    mainSubject: 'Mensagem',
                    mainKey: 'message',
                    objToSend: {
                        messageList: {
                            sender: `${userName}`,
                            id: uuidv1(),
                            time: `envio em: ${timeNow}`,
                            message: '', //this will be the message catch by modal text field
                            isMessageChecked: false,
                            history: {
                                senderMsgs: [],
                                recipientMsgs: []
                            }
                        }
                    }
                };
                findAnItem(dispatch, allUsers, _id, attachedObj);
                showModalTextField(dispatch);
            }}
        />
 */
