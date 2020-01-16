import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import ButtonMulti from '../../../components/buttons/material-ui/ButtonMulti';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import handleChange from '../../../utils/form/use-state/handleChange';

// OPTIONALS
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
// END OPTIONALS

// CUSTOMIZED DATA
import { modalTextFieldDashboardType } from '../../../types';
import { updateUser } from '../../../redux/actions/userActions';
import { createBooking, getStaffBookingList } from '../../../redux/actions/staffBookingActions';
import { getAllStaffNames, createFinance } from '../../../redux/actions/financeActions';
import { hideComponent, showComponent } from "../../../redux/actions/componentActions";
import { logout } from "../../../redux/actions/authActions";
import { readServicesList } from '../../../redux/actions/adminActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { convertCommaToDot } from '../../../utils/numbers/convertDotComma';
// END CUSTOMIZED DATA

ModalFormLoyaltyPanel.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    modal: modalTextFieldDashboardType,
};

function ModalFormLoyaltyPanel({
    open, onClose, modal, history }) {
    //test
    const [staffNames, setStaffNames] = useState([])
    const [preventDefault, setPreventDefault] = useState(false)
    const [gotError, setGotError] = useState(null);

    const {
        title,
        txtBtn,
        iconBtn,
        modalData } = modal;

    const [data, setData] = useState({
        agentName: 'selecione nome:',
        agentRole: 'colaborador',
        service: 'selecione tipo:',
        description: '',
        cashInValue: parseFloat(convertCommaToDot(modalData.valuePaid)),
        formattedDate: moment(new Date()).format("LLL"),
    });

    const { services } = useStoreState(state => ({
        services: state.adminReducer.cases.services,
    }));
    const dispatch = useStoreDispatch();

    const {
        agentId,
        agentName,
        service,
        description,
        formattedDate,
    } = data;




    useEffect(() => {
        readServicesList(dispatch)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            getAllStaffNames(dispatch)
            .then(res => {
                if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
                setStaffNames(res.data)
            })
        })
    }, [])

    const styles = {
        dialog: {
            margin: 'auto',
            width: '90%',
            minWidth: '400px',
        },
        form: {
            margin: 'auto',
            width: '80%'
        },
        fieldForm: {
            margin: '9px 0',
            zIndex: 2000
        },
        actionButtons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '28px'
        }
    }

    const clearForm = () => {
        setData({
            agentId: '',
            agentName: 'selecione nome:',
            agentRole: 'colaborador',
            service: 'selecione tipo:',
            description: '',
            cashInValue: parseFloat(convertCommaToDot(modalData.valuePaid)),
            formattedDate: moment(new Date()).format("LLL"),
        })
        setGotError(false);
    }

    const handleSubmit = () => {
        setPreventDefault(true);
        if(agentName === "selecione nome:") {
            showSnackbar(dispatch, "Selecione um nome.", 'error')
            setGotError("agentName");
            return;
        }
        if(service === "selecione tipo:") {
            showSnackbar(dispatch, "Selecione um serviço.", 'error')
            setGotError("service");
            return;
        }

        let dataInformed;
        if(description === "") {
            dataInformed = {...data, description: "não informado."}
        } else {
            dataInformed = {...data}
        }
        const objToSend = dataInformed;

        showSnackbar(dispatch, "Processando...", 'warning', 5000)
        createFinance(dispatch, objToSend)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            showSnackbar(dispatch, `Registro Financeiro Realizado!`, 'success', 5000)
            clearForm();
            onClose();
            setTimeout(() => {
                hideComponent(dispatch, "clientScoresPanel")
                showComponent(dispatch, "login")
                logout(dispatch);
                history.push("/acesso/verificacao")
            }, 2500)
        })
    };

    const showTitle = () => (
        <div className="text-center container-center">
            <DialogTitle id="form-dialog-title">
                <span
                    className="text-main-container text-center font-weight-bold"
                >
                    {parse(title)}
                </span>
            </DialogTitle>
        </div>
    );

    const showForm = () => (
        <form style={styles.form} onBlur={() => setGotError(null)}>
            <span className="text-default text-em-1 font-weight-bold">
                COLABORADOR*
                <Select
                  style={styles.fieldForm}
                  labelId="staff"
                  fullWidth
                  variant="outlined"
                  name="agentName"
                  value={agentName}
                  onChange={handleChange(setData, data)}
                  error={gotError === "agentName" ? true : false}
                >
                    <MenuItem value={agentName}>
                      selecione nome:
                    </MenuItem>
                    {staffNames && staffNames.map((name, ind) => (
                        <MenuItem key={ind} value={name}>
                            {name.cap()}
                        </MenuItem>
                    ))}
                </Select>
            </span>
            <br />
            <span className="text-default text-em-1 font-weight-bold">
                SERVIÇO*
                <Select
                  style={styles.fieldForm}
                  labelId="service"
                  variant="outlined"
                  name="service"
                  value={service}
                  onChange={handleChange(setData, data)}
                  fullWidth
                  error={gotError === "service" ? true : false}
                >
                    <MenuItem value={service}>
                      selecione tipo:
                    </MenuItem>
                    {services && services.map(service => (
                        <MenuItem key={service._id} value={service.name}>
                            {service.name.cap()}
                        </MenuItem>
                    ))}
                </Select>
            </span>
            <br />
            <span className="text-default text-em-1 font-weight-bold">
                DESCRIÇÃO
                <TextField
                    multiline
                    rows={2}
                    name="description"
                    value={description}
                    onChange={handleChange(setData, data)}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                />
            </span>
            <br />
            <br />
            <span className="text-default text-em-1 font-weight-bold">
                VALOR
                <TextField
                    value={`R$ ${modalData && modalData.valuePaid}`}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    disabled
                />
            </span>
            <br />
            <br />
            <span className="text-default text-em-1 font-weight-bold">
                DATA/HORA DE REGISTRO
                <TextField
                    value={formattedDate}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    disabled
                />
            </span>
        </form>
    );

    const showActionButtons = () => (
        <section style={styles.actionButtons}>
            <ButtonMulti
                title={txtBtn}
                onClick={handleSubmit}
                iconFontAwesome={iconBtn}
                disabled={preventDefault ? true : false}
            />
        </section>
    );

    return (
        <div>
            <Dialog
                style={styles.dialog}
                open={open}
                aria-labelledby="form-dialog-title">
                {showTitle()}
                {showForm()}
                {showActionButtons()}
            </Dialog>
        </div>
    );
}

export default withRouter(ModalFormLoyaltyPanel);