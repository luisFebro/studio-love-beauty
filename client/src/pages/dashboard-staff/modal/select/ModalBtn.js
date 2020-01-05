import React, { useState } from 'react';
import ButtonFab from '../../../../components/buttons/material-ui/ButtonFab';
import PropTypes from 'prop-types';
import ModalSelect_staffEdit from './ModalSelect_staffEdit';
import { buttonFabType } from '../../../../types';
import handleChange from '../../../../utils/form/use-state/handleChange';

ModalBtn.propTypes = {
    modal: PropTypes.object.isRequired,
    button: PropTypes.shape(buttonFabType),
    setSelectedValue: PropTypes.func,
}

export default function ModalBtn({ modal, button, setSelectedValue }) {
    const [open, setOpen] = useState(false);

    const {
        title,
        iconFontAwesome,
        top,
        left,
        style,
        iconMarginLeft,
        backgroundColor } = button;

    const onOpen = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
      // setSelectedValue(value); using redux update instead
    };

    return (
        <div>
            <ButtonFab
                title={title}
                iconFontAwesome={iconFontAwesome}
                top={top}
                left={left}
                iconMarginLeft={iconMarginLeft}
                backgroundColor={backgroundColor}
                onClick={onOpen}
            />
            <ModalSelect_staffEdit
                open={open}
                onClose={onClose}
                modal={modal}
            />
        </div>
    );
}