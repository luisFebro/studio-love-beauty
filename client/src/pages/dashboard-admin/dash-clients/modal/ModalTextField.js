import React, { useState } from 'react';
import { useStoreDispatch } from 'easy-peasy';
import Button from '@material-ui/core/Button';
import ButtonMulti from '../../../../components/buttons/material-ui/ButtonMulti';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { modalTextFieldType } from '../../../../type';

ModalTextField.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    modal: modalTextFieldType,
};

export default function ModalTextField({
    open, onClose, modal }) {
    const {
        mainSubject,
        title,
        subTitle,
        txtBtn,
        iconBtn,
        labelTxtField } = modal;

    const styles = {
        dialog: {
            width: '90%',
            margin: 'auto',
            zIndex: 1500
        },
        form: {
            margin: '15px auto 0',
            width: '80%'
        },
        actionButtons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '28px'
        }
    }

    const setObjToSend = () => {
        let data = 'objToSend';
    };


    const showTitle = () => (
        <div className="text-center">
            <DialogTitle id="form-dialog-title">
                {title}
            </DialogTitle>
            <DialogContentText>
                <span>{subTitle}</span>
            </DialogContentText>
        </div>
    );

    const showForm = () => (
        <form style={styles.form}>
            <TextField
                label={parse(labelTxtField)}
                type="text"
                fullWidth
                name={mainSubject}
                variant="outlined"
            />
        </form>
    );

    const showActionButtons = () => (
        <section style={styles.actionButtons}>
            <ButtonMulti
                onClick={onClose}
                variant="link"
            >
                Voltar
            </ButtonMulti>
            <ButtonMulti
                onClick={() => {
                    setObjToSend();
                    onClose();
                }}
                iconFontAwesome={iconBtn}
            >
                {txtBtn}
            </ButtonMulti>
        </section>
    );

    return (
        <div>
            <Dialog style={styles.dialog} open={open} aria-labelledby="form-dialog-title">
                {showTitle()}
                {showForm()}
                {showActionButtons()}
            </Dialog>
        </div>
    );
}
