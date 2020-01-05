import React, { useState } from 'react';
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../../../redux/actions/modalActions';
import { updateUser, readUserList } from '../../../../redux/actions/userActions';
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

const arrayUserFunctions = ["feito", "cancelado"];

export default function ModalSelect_staffEdit({ open, onClose, modal }) {
    const [data, setData] = useState({
        selected: "selecione novo status:",
    });
    const { selected } = data;

    const { title, txtBtn, iconBtn } = modal;

    const dispatch = useStoreDispatch();

    const styles = {
        actionButtons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '28px'
        }
    }


    const handleSubmit = () => {
        onClose();
        // if(isUserFunction) {
        //     if(data && data.role === "") return showSnackbar(dispatch, "Selecione uma opção", 'error');
        //     updateUser(dispatch, data, _idTarget)
        //     .then(res => {
        //         showSnackbar(dispatch, "O Tipo de Usuário foi alterado e movido.", 'success');
        //         readUserList(dispatch);
        //     })
        // }
    }

    const classes = useStyles();

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

    const showSelect = () => (
        <form style={{ margin: 'auto', width: '90%' }}>
            <Select
              style={{ margin: '9px 0' }}
              labelId="selected"
              onChange={handleChange(setData, data)}
              name="selected"
              value={selected}
              fullWidth
            >
              <MenuItem value={selected}>
                Selecione novo status:
              </MenuItem>
              {arrayUserFunctions.map((item, ind) => (
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
                    Cliente: <strong>Letícia</strong>
                    <br />
                    Status atual: <strong>Pendente</strong>
                </p>
            </div>
            {showSelect()}
            {showActionButtons()}
        </Dialog>
    );
}