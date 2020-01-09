import React, { useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../../../redux/actions/modalActions';
import { updateBooking, getStaffBookingList } from '../../../../redux/actions/staffBookingActions';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import handleChange from '../../../../utils/form/use-state/handleChange';
import parse from 'html-react-parser';
// Material UI
import ButtonMulti from '../../../../components/buttons/material-ui/ButtonMulti';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { modalDefaultType } from '../../../../types';

ModalSelect_staffEdit.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    modal: PropTypes.shape(modalDefaultType),
};
// End Material UI

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    media: {
        height: 50,
        width: '50%',
        margin: 'auto'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

export default function ModalSelect_staffEdit({ open, onClose, modal }) {
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        selected: "selecione novo status:",
    });
    const { selected } = data;

    const { title, txtBtn, iconBtn, modalData } = modal;

    const clearForm = () => {
        setData({
            selected: "selecione novo status:",
        })
    }

    let itemsSelection;
    switch(modalData.status) {
        case "1feito":
            itemsSelection = ["cancelado"];
            break;
        case "2cancelado":
            itemsSelection = ["feito"];
            break;
        default:
            itemsSelection = ["feito", "cancelado"];
    }

    const { _idStaff } = useStoreState(state => ({
        _idStaff: state.userReducer.cases.currentUser._id,
    }))
    const dispatch = useStoreDispatch();

    const styles = {
        actionButtons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '28px'
        }
    }


    const handleSubmit = () => {
        if(selected.includes("selecione")) {
            showSnackbar(dispatch, "Selecione um novo status", "error");
            setError(true);
            return;
        }

        let classifiedSelected;
        switch(selected) {
            case 'feito':
                classifiedSelected = "1feito";
                break;
            case 'cancelado':
                classifiedSelected = "2cancelado";
                break;
            default:
                classifiedSelected = selected;
        }
        const objToSend = {
            status: classifiedSelected,
        }
        onClose();
        showSnackbar(dispatch, "Alterando...", "warning", 3000);
        updateBooking(dispatch, objToSend, modalData._id)
        .then(res => {
            clearForm();
            showSnackbar(dispatch, `${modalData.staffName}, o status de ${modalData.clientName.cap()} foi alterado para ${selected.toUpperCase()}!`, 'success');
            getStaffBookingList(dispatch, _idStaff);
        })
    }

    const classes = useStyles();

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
            />
        </section>
    );

    const showSelect = () => (
        <form
            style={{ margin: 'auto', width: '90%' }}
            onBlur={() => setError(false)}
        >
            <Select
              style={{ margin: '9px 0' }}
              labelId="selected"
              onChange={handleChange(setData, data)}
              name="selected"
              error={error ? true : false}
              value={selected}
              fullWidth
            >
              <MenuItem value={selected}>
                selecione novo status:
              </MenuItem>
              {itemsSelection.map((item, ind) => (
                  <MenuItem key={ind} value={item}>{item}</MenuItem>
               ))}
            </Select>
        </form>
    );
    return (
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title"
        >
            <div className="container-center flex-column px-5 pb-2">
                <DialogTitle id="form-dialog-title">
                    {parse(title)}
                </DialogTitle>
                <p className="text-left">
                    Cliente: <strong>{modalData.clientName.cap()}</strong>
                    <br />
                    Status atual: <strong>{modalData.status.substring(1)}</strong>
                </p>
            </div>
            {showSelect()}
            {showActionButtons()}
        </Dialog>
    );
}