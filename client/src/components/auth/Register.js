import React, { useEffect, useState } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import TitleComponent from '../TitleComponent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import phoneMaskBr from '../../utils/validation/masks/phoneMaskBr';
import cpfMaskBr from '../../utils/validation/masks/cpfMaskBr';
import getDayMonthBr from '../../utils/dates/getDayMonthBr';
import SafeEnvironmentMsg from '../SafeEnvironmentMsg';
// import ReCaptchaCheckbox from "../ReCaptcha";
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import { registerEmail } from '../../redux/actions/authActions';
// Helpers
import detectErrorField from '../../utils/validation/detectErrorField';
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

// moment.locale = "pt-br";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    }
}));

export default function Register() {
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

    useEffect(() => {
        setData({ ...data, birthday: getDayMonthBr(selectedDate) })
    }, [selectedDate])

    const clearData = () => {
        setData({
            ...data,
            name: '',
            email: '',
            phone: '',
            birthday: '',
            cpf: '',
        })
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
                clearData();
                showSnackbar(dispatch, res.data.msg, 'success', 9000);
                //sendEmail(res.data.authUserId);

            })

    };

    const showTitle = () => (
        <TitleComponent
            subtitle="É rápido e fácil"
        >
            CADASTRE-SE
        </TitleComponent>
    );

    const showForm = () => (
        <form
            style={{margin: 'auto', width: '80%'}}
            onBlur={() => setFieldError(null)}
        >
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
                helperText="Digite apenas números."
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
            <MuiPickersUtilsProvider utils={MomentUtils} locale={"pt-br"}>
                <DatePicker
                    required
                    variant="inline"
                    margin="dense"
                    error={errorBirthday ? true : false}
                    openTo="month"
                    autoOk={true}
                    disableToolbar={true}
                    placeholder="Dia e Mês"
                    views={["month", "date"]}
                    label="Quando é o seu aniversário?"
                    name="birthday"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CakeIcon />
                        </InputAdornment>
                      ),
                    }}
                />
            </MuiPickersUtilsProvider>
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
            <SafeEnvironmentMsg />
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
            className="animated zoomIn fast"
        >
            <Card className={classes.card}>
                {showTitle()}
                {showForm()}
                {showButtonActions()}
            </Card>
        </div>
    );
}

/*
<div style={{whiteSpace: 'wrap'}}>
    {JSON.stringify(data)}
</div>
 */

/*
MODEL BTN PINK CIRCULAR
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
</button>
 */