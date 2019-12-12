import React, { Fragment, useState } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import phoneMaskBr from '../../utils/validation/masks/phoneMaskBr';
import cpfMaskBr from '../../utils/validation/masks/cpfMaskBr';
// import ReCaptchaCheckbox from "../ReCaptcha";
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import { registerEmail } from '../../redux/actions/authActions';
// Helpers
import detectErrorField from '../../utils/validation/detectErrorField';
import clearForm from '../../utils/form/use-state/clearForm';
import handleChange from '../../utils/form/use-state/handleChange';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoneyIcon from '@material-ui/icons/Money';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import CakeIcon from '@material-ui/icons/Cake';
import Card from '@material-ui/core/Card';
import ButtonMulti from '../buttons/material-ui/ButtonMulti';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    }
}));

export default function Register({ setIsLoginOpen, isLoginOpen }) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        birthday: '',
        cpf: '',
        maritalStatus: 'selecione estado civil',
    });
    const { name, email, maritalStatus, birthday, cpf, phone } = data;
    // detecting field errors
    const [fieldError, setFieldError] = useState(null);
    const errorName = fieldError && fieldError.name;
    const errorEmail = fieldError && fieldError.email;
    const errorMaritalStatus = fieldError && fieldError.maritalStatus;
    const errorBirthday = fieldError && fieldError.birthday;
    const errorCpf = fieldError && fieldError.cpf;
    const errorPhone = fieldError && fieldError.phone;
    // end detecting field errors

    const dispatch = useStoreDispatch();

    const classes = useStyles();

    const clearData = () => {
        clearForm(setData, data);
        setFieldError(null);
    }

    const registerThisUser = e => {
        const newUser = {
            name,
            email,
            maritalStatus,
            birthday,
            cpf,
            phone
        };

        registerEmail(dispatch, newUser)
            .then(res => {
                if(res.status !== 200) {
                    showSnackbar(dispatch, res.data.msg, 'error', 6000);
                    // detect field errors
                    const thisModalFields = Object.keys(data);
                    const foundObjError = detectErrorField(res.data.msg, thisModalFields);
                    setFieldError(foundObjError);
                    return;
                }

                showSnackbar(dispatch, res.data.msg, 'success', 4000);
                //sendEmail(res.data.authUserId);
                clearData();

            })

    };

    const changeToLogin = () => {
        setIsLoginOpen(!isLoginOpen);
    }

    const showTitle = () => (
        <div className="text-center text-main-container mb-4 p-3" style={{color: 'white', backgroundColor: "var(--mainDark)", width: '100%'}}>
            CADASTRO CLIENTE
            <br />
            <span className="text-default">
                ou faça{' '}
                <button
                    style={{
                        color: "white",
                        padding: '2px 5px',
                        borderRadius: '20px',
                        backgroundColor: 'var(--mainPink)',
                        outline: "none"
                    }}
                    onClick={changeToLogin}
                >
                    Seu Login
                </button>
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
                onBlur={() => setData({ ...data, cpf: cpfMaskBr(cpf)})}
                value={cpf}
                type="text"
                label="Insira seu CPF"
                autoComplete="cpf"
                helperText="Você acessa sua conta pelo seu CPF."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                }}
            />
            <TextField
                required
                onChange={handleChange(setData, data)}
                error={errorName ? true : false}
                margin="dense"
                id="name"
                name="name"
                value={name}
                type="name"
                label="Qual é o seu nome?"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
            />
            <TextField
                required
                margin="dense"
                onChange={handleChange(setData, data)}
                error={errorBirthday ? true : false}
                name="birthday"
                value={birthday}
                type="date"
                label="Quando é seu aniversário?"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon />
                    </InputAdornment>
                  ),
                }}
            />
            <TextField
                required
                margin="dense"
                onChange={handleChange(setData, data)}
                error={errorEmail ? true : false}
                name="email"
                value={email}
                type="email"
                label="Email"
                autoComplete="email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
            />
            <TextField
                required
                margin="dense"
                onChange={handleChange(setData, data)}
                error={errorPhone ? true : false}
                onBlur={() => setData({ ...data, phone: phoneMaskBr(phone)})}
                name="phone"
                helperText={"Digite apenas números com DDD"}
                value={phone}
                type="tel"
                label="Contato"
                autoComplete="phone"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneIcon />
                    </InputAdornment>
                  ),
                }}
            />
            <Select
              style={{ margin: '9px 0' }}
              labelId="maritalStatus"
              onChange={handleChange(setData, data)}
              name="maritalStatus"
              value={maritalStatus}
              error={errorMaritalStatus ? true : false}
            >
              <MenuItem value={maritalStatus}>
                selecione estado civil:
              </MenuItem>
              <MenuItem value={"Solteiro(a)"}>Solteiro(a)</MenuItem>
              <MenuItem value={"Casado(a)"}>Casado(a)</MenuItem>
              <MenuItem value={"Divorciado(a)"}>Divorciado(a)</MenuItem>
              <MenuItem value={"Viúva(a)"}>Viúva(a)</MenuItem>
            </Select>
            <div className="text-center my-3 font-weight-bold">
                <span style={{color: 'green'}}>
                    <i className="fas fa-lock"></i>
                </span> Ambiente seguro!<br />
                Envio de dados encriptografados<br />
                e mantidos de forma privada.
            </div>
        </form>
    );

    // const showReCaptcha = () => (
    //     <div className="container-center mt-3">
    //         <ReCaptchaCheckbox setToken={setData} data={data} />
    //     </div>
    // );

    const showButtonActions = () => (
        <div className="container-center">
            <ButtonMulti
                onClick={() => {
                    registerThisUser();
                    setTimeout(() => null, 3000); // readUserList(dispatch)
                    showSnackbar(dispatch, 'Registrando...');
                }}
                color="var(--mainWhite)"
                backgroundColor="var(--mainPink)"
                backColorOnHover="var(--mainPink)"
                iconFontAwesome="fas fa-save"
                textTransform='uppercase'
            >
                Registrar
            </ButtonMulti>
        </div>
    );

    return (
        <div
            className="animated slideInLeft fast"
            style={{ display: !isLoginOpen ? "block" : "none" }}
        >
            <Card className={classes.card}>
                {showTitle()}
                {showForm()}
                {showButtonActions()}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Year and Month"
                        helperText="Start from year selection"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
            </Card>
        </div>
    );
}

/*
<div style={{whiteSpace: 'wrap'}}>
    {JSON.stringify(data)}
</div>
 */