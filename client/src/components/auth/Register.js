import React, { useRef } from 'react';
import { DatePicker } from "@material-ui/pickers";
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoneyIcon from '@material-ui/icons/Money';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import CakeIcon from '@material-ui/icons/Cake';
import Card from '@material-ui/core/Card';
import ButtonMulti from '../buttons/material-ui/ButtonMulti';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  }
}));

export default function Register({ setIsLoginOpen, isLoginOpen }) {
    const refRegister = useRef(null);
    const classes = useStyles();

    const changeToLogin = () => {
        const div = refRegister.current;
        div.style.className = "animated zoomOut"
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
                autoFocus
                onChange={null} // handleChange(setData, data)
                error={null} //errorName ? true : false
                margin="dense"
                id="name"
                name="name"
                type="name"
                label="Qual o seu nome?"
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
                margin="dense"
                onChange={null} // handleChange(setData, data)
                error={null} // errorEmail ? true : false
                name="email"
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
                margin="dense"
                onChange={null} // handleChange(setData, data)
                error={null} // errorEmail ? true : false
                name="phone"
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
            <TextField
                margin="dense"
                onChange={null} // handleChange(setData, data)
                error={null} // errorEmail ? true : false
                name="maritalStatus"
                type="text"
                label="Estado Civil"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleOutlineIcon />
                    </InputAdornment>
                  ),
                }}
            />
            <TextField
                margin="dense"
                onChange={null} // handleChange(setData, data)
                error={null} // errorEmail ? true : false
                name="birthday"
                type="date"
                label="Data de Nascimento"
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
                onChange={null} // handleChange(setData, data)
                error={null} // errorEmail ? true : false
                name="cpf"
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
        </form>
    );

    const showButtonActions = () => (
        <div className="container-center">
            <ButtonMulti
                onClick={null}
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
            ref={refRegister}
            style={{ display: !isLoginOpen ? "block" : "none" }}
        >
            <Card className={classes.card}>
                {showTitle()}
                {showForm()}
                {showButtonActions()}
            </Card>
        </div>
    );
}