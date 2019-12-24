import React, { useState } from 'react';
import ButtonFab from '../../../../components/buttons/material-ui/ButtonFab';
import PropTypes from 'prop-types';
import ModalTextField from './ModalTextField';
import { buttonFabType } from '../../../../types';

ModalBtn.propTypes = {
    modal: PropTypes.object.isRequired,
    button: buttonFabType,
    setSelectedValue: PropTypes.func.isRequired,
}

export default function ModalBtn({ modal, button, setSelectedValue }) {
    const [open, setOpen] = useState(false);
    const {
        title,
        iconFontAwesome,
        variant,
        top,
        left,
        backgroundColor } = button;

    const onOpen = () => {
      setOpen(true);
    };

    const onClose = value => {
      setOpen(false);
      setSelectedValue(value);
    };

    const styles = {
        fab: {
            transform: 'translate(-50%, -50%)'
        },
    }


    return (
        <div>
            <ButtonFab
                title={title}
                iconFontAwesome={iconFontAwesome}
                variant={variant}
                top={top}
                left={left}
                style={styles.fab}
                backgroundColor={backgroundColor}
                onClick={onOpen}
            />
            <ModalTextField
                open={open}
                onClose={onClose}
                modal={modal}
            />
        </div>
    );
}