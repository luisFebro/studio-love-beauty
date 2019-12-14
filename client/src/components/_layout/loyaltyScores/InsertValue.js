import React, { useState } from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { useStoreDispatch } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoneyIcon from '@material-ui/icons/Money';
import Card from '@material-ui/core/Card';
import { showComponent, hideComponent } from '../../../redux/actions/componentActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import ButtonMulti from '../../buttons/material-ui/ButtonMulti';
import handleChange from '../../../utils/form/use-state/handleChange';
import cpfMaskBr from '../../../utils/validation/masks/cpfMaskBr';
import detectErrorField from '../../../utils/validation/detectErrorField';
import clearForm from '../../../utils/form/use-state/clearForm';
import PropTypes from 'prop-types';

InsertValue.propTypes = {
    success: PropTypes.bool,
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  }
}));

export default function InsertValue({ success }) {
    const [data, setData] = useState({
        cpf: '',
    })

    const { cpf } = data;
    const [fieldError, setFieldError] = useState(null);
    const errorCpf = fieldError && fieldError.cpf;

    const classes = useStyles();
    const dispatch = useStoreDispatch();

    const clearData = () => {
        clearForm(setData, data);
        setFieldError(null);
    }

    const handleSwitch = () => {
        if(success) {
            hideComponent(dispatch, 'purchaseValue')
            showComponent(dispatch, 'staffConfirmation')
        }
    };

    const showTitle = () => (
        <div className="text-center text-main-container mb-4 p-3" style={{color: 'white', backgroundColor: "var(--mainDark)", width: '100%'}}>
            ACESSAR CONTA
            <br />
            <span className="text-default">
                Digite apenas números
            </span>
        </div>
    );

    const showForm = () => (
        <form style={{margin: 'auto', width: '80%'}}>
            <TextField
                required
                margin="dense"
                onChange={handleChange(setData, data)}
                error={errorCpf ? true : false}
                name="cpf"
                type="text"
                label="Insira seu CPF"
                autoComplete="cpf"
                onBlur={() => setData({ ...data, cpf: cpfMaskBr(cpf)})}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                }}
            />
        </form>
    );

    const showButtonActions = () => (
        <div className="container-center">
            <ButtonMulti
                onClick={handleSwitch}
                color="var(--mainWhite)"
                backgroundColor="var(--mainPink)"
                backColorOnHover="var(--mainPink)"
                iconFontAwesome="fas fa-paper-plane"
                textTransform='uppercase'
            >
                Entrar
            </ButtonMulti>
        </div>
    );

    return (
        <div
            className='animated zoomIn fast'
        >
            <Card className={classes.card}>
                {showTitle()}
                {showForm()}
                {showButtonActions()}
            </Card>
        </div>
    );
}