import React from 'react';
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoneyIcon from '@material-ui/icons/Money';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import CakeIcon from '@material-ui/icons/Cake';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  }
}));


export default function Register() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
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
                    textHelper="dia e mês"
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
        </Card>
    );
}