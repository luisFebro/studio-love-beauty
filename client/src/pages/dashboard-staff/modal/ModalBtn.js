import React, { useState } from 'react';
import ButtonMulti from '../../../components/buttons/material-ui/ButtonMulti';
import PropTypes from 'prop-types';
import ModalForm from './ModalForm';
import { buttonMultiType } from '../../../types';
import handleChange from '../../../utils/form/use-state/handleChange';

ModalBtn.propTypes = {
    modal: PropTypes.object.isRequired,
    button: PropTypes.shape(buttonMultiType),
    setSelectedValue: PropTypes.func,
}

export default function ModalBtn({ modal, button, setSelectedValue }) {
    const [open, setOpen] = useState(false);

    const {
        title,
        iconFontAwesome,
        variant,
        size,
        backgroundColor,
        backColorOnHover } = button;

    const onOpen = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
      // setSelectedValue(value); using redux update instead
    };

    return (
        <div>
            <ButtonMulti
                title={title}
                iconFontAwesome={iconFontAwesome}
                variant={variant}
                backgroundColor={backgroundColor}
                backColorOnHover={backColorOnHover}
                onClick={onOpen}
            />
            <ModalForm
                open={open}
                onClose={onClose}
                modal={modal}
            />
        </div>
    );
}