import React, { useState, useEffect } from 'react';
import { useStoreDispatch } from 'easy-peasy';
import ButtonMulti from '../../../components/buttons/material-ui/ButtonMulti';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';
import { CLIENT_URL } from '../../../config/clientUrl';
import PropTypes from 'prop-types';
import handleChange from '../../../utils/form/use-state/handleChange';

// OPTIONALS
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//datePicker
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import AlarmIcon from '@material-ui/icons/Alarm';
import InputAdornment from '@material-ui/core/InputAdornment';
// END OPTIONALS

// CUSTOMIZED DATA
import { modalTextFieldDashboardType } from '../../../types';
import { updateUser } from '../../../redux/actions/userActions';
import { createBooking, getStaffBookingList } from '../../../redux/actions/staffBookingActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
// END CUSTOMIZED DATA

ModalForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    modal: modalTextFieldDashboardType,
};

export default function ModalForm({
    open, onClose, modal }) {
    const [data, setData] = useState({
        status: "3pendente",
        staffName: '',
        clientName: '',
        service: "selecione tipo de serviço",
        notes: '',
        bookingDate: '',
    });
    const {
        clientName,
        service,
        notes,
        bookingDate,
    } = data;

    const {
        title,
        txtBtn,
        iconBtn,
        modalData } = modal;

    const [gotError, setGotError] = useState(false);

    const [selectedDate, handleDateChange] = useState(new Date());

    const dispatch = useStoreDispatch();

    useEffect(() => {
        setData({ ...data, staffName: modalData.name })
    }, [modalData])

    useEffect(() => {
        setData({ ...data, bookingDate: selectedDate })
    }, [selectedDate])

    const styles = {
        dialog: {
            margin: 'auto',
            width: '90%'
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

    const handleSubmit = () => {
        if(service === "selecione tipo de serviço") return showSnackbar(dispatch, "Selecione um serviço.", 'error')

        createBooking(dispatch, data, modalData._id)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            onClose();
            getStaffBookingList(dispatch, modalData._id)
            showSnackbar(dispatch, `O agendamento do seu cliente foi realizado!`, 'success', 8000)
        })
    };

    const showTitle = () => (
        <div className="text-center container-center">
            <DialogTitle id="form-dialog-title">
                {parse(title)}
            </DialogTitle>
            <div>
                <img
                    width={135}
                    height={135}
                    src={`${CLIENT_URL}/img/illustrations/client-booking.svg`}
                    alt="agendamento cliente"/>
            </div>
        </div>
    );

    const showForm = () => (
        <form style={styles.form} onBlur={() => setGotError(false)}>
            <TextField
                label="NOME COLABORADOR:"
                value={modalData && modalData.name}
                variant="standard"
                fullWidth
                margin="dense"
                disabled
            />
            <TextField
                label="NOME CLIENTE:"
                name="clientName"
                onChange={handleChange(setData, data)}
                variant="standard"
                type="text"
                fullWidth
                margin="dense"
            />
            <Select
              style={styles.fieldForm} // ADD HOUR CAN NOT EQUAL IN THE SAME DAY
              labelId="service"
              onChange={handleChange(setData, data)}
              name="service"
              value={service}
              error={false}
            >
                <MenuItem value={service}>
                  selecione tipo de serviço:
                </MenuItem>
                <MenuItem value={"Corte de Cabelo Teste"}>Corte de Cabelo Teste</MenuItem>
                <MenuItem value={"Manicure Teste"}>Manicure Teste</MenuItem>
                <MenuItem value={"Pedicure Teste"}>Pedicure Teste</MenuItem>
                <MenuItem value={"Outros Teste"}>Outros Teste</MenuItem>
            </Select>
            <br />
            <MuiPickersUtilsProvider utils={MomentUtils} locale={"pt-br"}>
                <DateTimePicker
                    required
                    disablePast
                    variant="outlined"
                    margin="dense"
                    error={false}
                    ampm={false}
                    placeholder="Data Agendamento"
                    label={`Qual DIA e HORÁRIO?`}
                    name="serviceDate"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlarmIcon />
                        </InputAdornment>
                      ),
                    }}
                />
            </MuiPickersUtilsProvider>
            <TextField
                label="OBSERVAÇÕES:"
                multiline
                rows={4}
                name="notes"
                value={notes}
                onChange={handleChange(setData, data)}
                variant="outlined"
                placeholder="Escreva detalhes adicionais do agendamento"
                fullWidth
                margin="dense"
            />
        </form>
    );

    const showActionButtons = () => (
        <section style={styles.actionButtons}>
            <ButtonMulti
                title="Voltar"
                onClick={onClose}
                variant="link"
            />
            <ButtonMulti
                title={txtBtn}
                onClick={handleSubmit}
                iconFontAwesome={iconBtn}
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
