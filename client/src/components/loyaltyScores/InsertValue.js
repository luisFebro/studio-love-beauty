import React, { useState } from 'react';
import TitleComponent from '../../components/TitleComponent';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreDispatch } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoneyIcon from '@material-ui/icons/Money';
import Card from '@material-ui/core/Card';
import { showComponent, hideComponent } from '../../redux/actions/componentActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import ButtonMulti from '../buttons/material-ui/ButtonMulti';
import handleChange from '../../utils/form/use-state/handleChange';
import detectErrorField from '../../utils/validation/detectErrorField';
import clearForm from '../../utils/form/use-state/clearForm';
import PropTypes from 'prop-types';

InsertValue.propTypes = {
    success: PropTypes.bool,
    setValuePaid: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  }
}));

export default function InsertValue({ success, setValuePaid }) {
    const [data, setData] = useState({
        valuePaid: '',
    })

    const { valuePaid } = data;
    const [fieldError, setFieldError] = useState(null);
    const errorCpf = fieldError && fieldError.cpf;

    const classes = useStyles();
    const dispatch = useStoreDispatch();

    const clearData = () => {
        clearForm(setData, data);
        setFieldError(null);
    }

    const handleSwitch = () => {
        if(valuePaid === "") return showSnackbar(dispatch, "Você precisa digitar um valor.", "error")
        if(valuePaid.includes("-")) return showSnackbar(dispatch, "O valor não pode ser negativo", "error")
        if(valuePaid === "0") return showSnackbar(dispatch, "O valor não pode ser zero", "error")
        if(success) {
            setValuePaid(valuePaid);
            hideComponent(dispatch, 'purchaseValue')
            showComponent(dispatch, 'staffConfirmation')
        }
    };

    const showTitle = () => (
        <TitleComponent
            subtitle="Digite apenas números e vírgula"
        >
            INSIRA O VALOR GASTO
        </TitleComponent>
    );

    const showForm = () => (
        <form
            style={{margin: 'auto', width: '80%'}}
            onBlur={() => setFieldError(null)}
        >
            <TextField
                required
                variant="outlined"
                margin="dense"
                onChange={handleChange(setData, data)}
                error={null}
                name="valuePaid"
                label="Insira seu Valor"
                type="text"
                autoComplete="Valor da Nota Fiscal"
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
                iconFontAwesome="fas fa-check"
                textTransform='uppercase'
            >
                Confirmar
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