import React, { useState } from 'react';
import TitleComponent from '../../components/TitleComponent';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreDispatch } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoneyIcon from '@material-ui/icons/Money';
import Card from '@material-ui/core/Card';
import SafeEnvironmentMsg from '../SafeEnvironmentMsg';
import { showComponent, hideComponent } from '../../redux/actions/componentActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import { loginEmail } from '../../redux/actions/authActions';
import ButtonMulti from '../buttons/material-ui/ButtonMulti';
import handleChange from '../../utils/form/use-state/handleChange';
import cpfMaskBr from '../../utils/validation/masks/cpfMaskBr';
import detectErrorField from '../../utils/validation/detectErrorField';
import clearForm from '../../utils/form/use-state/clearForm';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  }
}));

function Login({ history }) {
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

    const signInThisUser = e => {
        const userData = {
            cpf
        };

        loginEmail(dispatch, userData)
        .then(res => {
            if(res.status !== 200) {
                showSnackbar(dispatch, res.data.msg, 'error');
                // detect field errors
                const objFields = Object.keys(data);
                const foundObjError = detectErrorField(res.data.msg, objFields);
                setFieldError(foundObjError);
                return;
            }
            const { msg, role } = res.data;
            clearData();
            showSnackbar(dispatch, "Analisando Crendenciais...", 'warning', 3000);
            if(role === "admin") {
                setTimeout(() => showSnackbar(dispatch, "Redirecionando...", 'warning', 4000), 2900);
                setTimeout(() => history.push("/admin/painel-de-controle"), 5000);
                setTimeout(() => showSnackbar(dispatch, msg, 'success', 9000), 7000);
            }
            if(role === "colaborador") {
                setTimeout(() => showSnackbar(dispatch, "Redirecionando...", 'warning', 4000), 2900);
                setTimeout(() => history.push("/colaborador/quadro-administrativo"), 5000);
                setTimeout(() => showSnackbar(dispatch, msg, 'success', 9000), 7000);
            }
            if(role === "cliente") {
                setTimeout(() => showSnackbar(dispatch, msg, 'success', 9000), 3000);
                hideComponent(dispatch, "login");
                showComponent(dispatch, "purchaseValue");
                history.push("/cliente/pontos-fidelidade");
            }
        })
    };

    const showTitle = () => (
        <TitleComponent
            subtitle="Digite apenas números"
        >
            ACESSAR CONTA
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
                error={errorCpf ? true : false}
                name="cpf"
                value={cpf}
                type="text"
                label="Insira seu CPF"
                autoComplete="off" // n1
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
            <SafeEnvironmentMsg />
        </form>
    );

    const showButtonActions = () => (
        <div className="container-center">
            <ButtonMulti
                onClick={signInThisUser}
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

export default withRouter(Login);


/* COMMENTS
n1: LESSON: autoComplete is "off" to not allow the browser to autocomplete with suggestions of other searches.other
Disablign this, can enhances security since it does not read past delicate infos.
*/