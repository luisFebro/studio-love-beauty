import React, { useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';
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
    let { allUsers, userName } = useStoreState(state => ({
        allUsers: state.userReducer.cases.allUsers,
        userName: state.userReducer.cases.currentUser.name
    }));
    const dispatch = useStoreDispatch();
    const { _id, name, email, favoriteList, inCartList, registerDate } = data;
    moment.locale('pt-BR');
    const timeNow = moment(Date.now()).format('Do MMM [às] h:mm, YYYY[.]');

    return (
        <DivWrapper ref={animateRef} className="text-default" style={{ position: 'relative' }}>
            <div>
                <p>Name: {name}</p>
            </div>
            <div>
                <p>Email: {email}</p>
            </div>
            <div>
                <p>Dia do Cadastro: {registerDate}</p>
            </div>
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
            <div>
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
                    </div>
                ) : null}
            </div>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    width: 90%;
    border-radius: 10px;
    padding: 20px 10px;
    margin: 15px auto;
    background-color: #f39c12;
    color: #ecf0f1;
`;
