import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import ButtonMulti from '../../../../components/buttons/material-ui/ButtonMulti';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import handleChange from '../../../../utils/form/use-state/handleChange';

// OPTIONALS
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import isMoneyBrValidAndAlert from '../../../../utils/numbers/isMoneyBrValidAndAlert';
// END OPTIONALS

// CUSTOMIZED DATA
import { modalTextFieldDashboardType } from '../../../../types';
import { updateUser } from '../../../../redux/actions/userActions';
import { createFinance } from '../../../../redux/actions/financeActions';
import { getAllAvailableNames } from '../../../../redux/actions/financeActions';
import { readServicesList } from '../../../../redux/actions/adminActions';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import { convertCommaToDot } from '../../../../utils/numbers/convertDotComma';
import AsyncAutoCompleteSearch from '../../../../components/search/AsyncAutoCompleteSearch';
// END CUSTOMIZED DATA

moment.locale = "pt-br";

ModalFormLoyaltyPanel.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    modal: modalTextFieldDashboardType,
};

export default function ModalFormLoyaltyPanel({
    open, onClose, modal }) {
    const [preventDefault, setPreventDefault] = useState(false)
    const [gotError, setGotError] = useState(null);

    const {
        title,
        txtBtn,
        iconBtn,
        modalData } = modal;

    const { staffName } = modalData;

    const [data, setData] = useState({
        agentName: staffName,
        clientName: '',
        agentRole: 'colaborador',
        service: 'selecione tipo:',
        description: '',
        cashInValue: null,
        formattedDate: moment(new Date()).format("LLL"),
    });

    const {
        agentId,
        clientName,
        service,
        description,
        cashInValue,
        formattedDate,
    } = data;

    const { services } = useStoreState(state => ({
        services: state.adminReducer.cases.services,
    }));
    const dispatch = useStoreDispatch();


    useEffect(() => {
        readServicesList(dispatch)
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
            agentName: staffName,
            clientName: '',
            agentRole: 'colaborador',
            service: 'selecione tipo:',
            description: '',
            cashInValue: null,
            formattedDate: moment(new Date()).format("LLL"),
        })
        setGotError(false);
    }

    const handleSubmit = () => {
        setPreventDefault(true);

        if(service === "selecione tipo:") {
            showSnackbar(dispatch, "Selecione um serviço.", 'error')
            setGotError("service");
            return;
        }

        if(clientName === "") {
            showSnackbar(dispatch, "Selecione um cliente.", 'error')
            // setGotError("clientName");
            return;
        }

        if(!isMoneyBrValidAndAlert(cashInValue, showSnackbar, dispatch)) {
            setGotError("cashInValue");
            return;
        }

        let dataInformed;
        if(description === "") {
            dataInformed = {...data, description: "não informado.", cashInValue: parseFloat(cashInValue)}
        } else {
            dataInformed = {...data, cashInValue: parseFloat(cashInValue)}
        }
        const objToSend = dataInformed;

        showSnackbar(dispatch, "Processando...", 'warning', 5000)
        createFinance(dispatch, objToSend)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            showSnackbar(dispatch, `${staffName && staffName.cap()}, registro financeiro foi Efetuado!`, 'success', 6000)
            clearForm();
            onClose();
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

    //auto complete
    const autoCompleteUrl = `/api/finance/staff/list/names?role=cliente`;
    const onAutoSelectChange = selectedValue => {
        setData({ ...data, clientName: selectedValue })
    }

    const onValueChange = changedValue => {
        setData({ ...data, clientName: changedValue })
    }
    //end auto complete

    const showForm = () => (
        <form style={styles.form} onBlur={() => {setGotError(null); setPreventDefault(false);}}>
            <span className="text-default text-em-1 font-weight-bold">
                COLABORADOR
                <TextField
                    value={staffName && staffName.cap()}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    disabled
                />
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
                VALOR EM R$*
                <TextField
                    required
                    name="cashInValue"
                    value={cashInValue}
                    onChange={handleChange(setData, data)}
                    error={gotError === "cashInValue" ? true : false}
                    helperText={"Insira apenas números e vírgula"}
                    variant="outlined"
                    inputProps={{
                        style: {
                            fontSize: '1.5em'
                        }
                    }}
                    fullWidth
                />
            </span>
            <br />
            <br />
            <span className="text-default text-em-1">
                <span className="font-weight-bold">
                    NOME DO CLIENTE*
                </span>
                <AsyncAutoCompleteSearch
                    url={autoCompleteUrl}
                    formWidth="auto"
                    autoCompleteUrlStr={autoCompleteUrl}
                    circularProgressColor="secondary"
                    freeSolo={true}
                    onAutoSelectChange={onAutoSelectChange}
                    onValueChange={onValueChange}
                    needUserValueFunc={true}
                    noOptionsText={`Nada encontrado...`}
                    backgroundColor='white'
                    disableOpenOnFocus={true}
                    placeholder="Procure ou digite nome..."
                />
            </span>
            <br />
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
                title="Voltar"
                onClick={() => {
                    onClose();
                    clearForm();
                }}
                variant="link"
            />
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