import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoneyIcon from '@material-ui/icons/Money';
import Card from '@material-ui/core/Card';
import ButtonMulti from '../buttons/material-ui/ButtonMulti';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  }
}));

export default function Login({ setIsLoginOpen, isLoginOpen }) {
    const classes = useStyles();

    const changeToRegister = () => {
        setIsLoginOpen(!isLoginOpen);
    }

    const showTitle = () => (
        <div className="text-center text-main-container mb-4 p-3" style={{color: 'white', backgroundColor: "var(--mainDark)", width: '100%'}}>
            ACESSAR CONTA
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
                    onClick={changeToRegister}
                >
                    Cadastro
                </button>
            </span>
        </div>
    );

    const showForm = () => (
        <form style={{margin: 'auto', width: '80%'}}>
            <TextField
                required
                margin="dense"
                onChange={null} // handleChange(setData, data)
                error={null} // errorEmail ? true : false
                name="cpf"
                type="text"
                label="Insira seu CPF"
                autoComplete="cpf"
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
                iconFontAwesome="fas fa-paper-plane"
                textTransform='uppercase'
            >
                Entrar
            </ButtonMulti>
        </div>
    );

    return (
        <div
            className='animated slideInRight fast'
            style={{    display: isLoginOpen ? "block" : "none"}}
        >
            <Card className={classes.card}>
                {showTitle()}
                {showForm()}
                {showButtonActions()}
            </Card>
        </div>
    );
}