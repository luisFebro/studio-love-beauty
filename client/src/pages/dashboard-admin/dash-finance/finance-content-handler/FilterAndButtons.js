import React, { useState } from 'react';
import BigActionButton from '../../../../components/buttons/big-action-button/BigActionButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import { CLIENT_URL } from '../../../../config/clientUrl.js';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

FilterAndButtons.propTypes = {
    setCurrComponent: PropTypes.func,
}

export default function FilterAndButtons({ setCurrComponent }) {
    const [selectedDate, handleDateChange] = useState(new Date());

    const styles = {
        form: {
            background: 'var(--mainDark)',
            borderRadius: '10px',
            padding: '25px'
        },
        fieldForm: {
            textAlign:'center',
            fontSize: '1.5em',
            backgroundColor: "var(--mainWhite)",
            zIndex: 2000
        },
        icon: {
            top: '-25px', left: '-25px', transform: 'rotate(20deg)'
        }
    }

    const showNewIncomeBtn = () => (
        <div>
            <HashLink
                smooth to="/admin/painel-de-controle/#new-income"
                className="text-decoration-none"
            >
                <BigActionButton
                    title="NOVA ENTRADA"
                    fontAwesomeIcon="fas fa-arrow-up"
                    backgroundColor="var(--incomeGreen)"
                    backColorOnHover="var(--mainGreen)"
                    backColorOnKey="var(--mainGreen)"
                    onClick={() => setCurrComponent("NewIncome")}
                />
            </HashLink>
        </div>
    );

    const showNewExpenseBtn = () => (
        <div>
            <HashLink
                smooth to="/admin/painel-de-controle/#new-expense"
                className="text-decoration-none"
            >
                <BigActionButton
                    title="NOVA SAÍDA"
                    fontAwesomeIcon="fas fa-arrow-down"
                    backgroundColor="var(--expenseRed)"
                    backColorOnHover="var(--mainRed)"
                    backColorOnKey="var(--mainRed)"
                    onClick={() => setCurrComponent("NewExpense")}
                />
            </HashLink>
        </div>
    );

    const displayDynamicField = () => (
        <span className="text-white text-default text-em-1 font-weight-bold">
            DIA:
            <br />
            <MuiPickersUtilsProvider utils={MomentUtils} locale={"pt-br"}>
                <DatePicker
                    style={styles.fieldForm}
                    variant="inline"
                    fullWidth
                    margin="dense"
                    openTo="date"
                    autoOk={true}
                    disableToolbar={true}
                    views={["date"]}
                    name="dayMonth"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
        </span>
    );

    const showFilter = () => (
        <form style={styles.form} className="position-relative">
            <div style={styles.icon} className="position-absolute">
                <img src={`${CLIENT_URL}/img/icons/finance-funnel.svg`} width={100} height="auto" alt="funil finanças"/>
            </div>
            <p
                className="mb-2 text-white text-main-container text-center text-em-2 font-weight-bold">
                FILTRO
            </p>
            <span className="text-white text-default text-em-1 font-weight-bold">
                PERÍODO SELECIONADO:
                <Select
                  style={styles.fieldForm}
                  labelId="staff"
                  fullWidth
                  variant="outlined"
                  name="agentName"
                  value={'POR DIA'}
                  onChange={null}
                >
                    <MenuItem value={'POR DIA'}>
                      POR DIA
                    </MenuItem>
                    <MenuItem value={'POR MÊS'}>POR MÊS</MenuItem>
                    <MenuItem value={'TODOS'}>TODOS</MenuItem>
                </Select>
            </span>
            <div className="mt-3">
                {displayDynamicField()}
            </div>
        </form>
    );

    return (
        <div className="row my-3 d-flex justify-content-between">
            <div className="col-12 col-md-4">
                {showFilter()}
            </div>
            <div className="col-6 col-md-4 mt-4">
                {showNewIncomeBtn()}
            </div>
            <div className="col-6 col-md-4 mt-4">
                {showNewExpenseBtn()}
            </div>
        </div>
    );
}