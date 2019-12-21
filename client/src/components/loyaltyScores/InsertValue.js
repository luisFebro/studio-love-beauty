import React, { useState } from 'react';
import TitleComponent from '../../components/TitleComponent';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreDispatch } from 'easy-peasy';
import Card from '@material-ui/core/Card';
import { showComponent, hideComponent } from '../../redux/actions/componentActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import PropTypes from 'prop-types';
import KeypadButton from '../modals/keypad';

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
    const [valuePaid, setData] = useState("0,0");

    const classes = useStyles();
    const dispatch = useStoreDispatch();

    const handleSwitch = valuePaid => {
        console.log(valuePaid)
        const endValue = valuePaid.slice(-1);
        const commaQuantity = valuePaid.match(new RegExp(",",'g'))
        const commaLength = commaQuantity && commaQuantity.length;
        if(commaLength > 1) return showSnackbar(dispatch, "Insira apenas uma vírgula por valor", 'error')
        if(endValue === ",") return showSnackbar(dispatch, "Você digitou um número com vírgula sem decimal. Retire a vírgula ou acrescente valor decimal", "error", 8000)
        if(valuePaid === "0") return showSnackbar(dispatch, "Você precisa digitar um valor.", "error")
        if(valuePaid === "0,0") return showSnackbar(dispatch, "O valor não pode ser zero", "error")
        // if(valuePaid.includes("-")) return showSnackbar(dispatch, "O valor não pode ser negativo", "error")
        if(success) {
            setValuePaid(valuePaid);
            hideComponent(dispatch, 'purchaseValue')
            showComponent(dispatch, 'staffConfirmation')
        }
    };

    const showTitle = () => (
        <TitleComponent>
            INSIRA O VALOR GASTO
        </TitleComponent>
    );

    const showKeypadButton = () => (
        <div className="animated jackInTheBox slow delay-2s d-flex justify-content-center my-4">
            <KeypadButton
                title="Insira o valor gasto"
                titleIcon="far fa-money-bill-alt"
                setSelectedValue={setData}
                confirmFunction={handleSwitch}
            />
        </div>
    );

    return (
        <div
            className='animated zoomIn fast'
        >
            <Card className={classes.card}>
                {showTitle()}
                {showKeypadButton()}
            </Card>
        </div>
    );
}