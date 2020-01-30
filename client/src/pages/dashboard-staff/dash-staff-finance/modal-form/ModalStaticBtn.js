import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalFormLoyaltyPanel from './ModalFormLoyaltyPanel';
import { buttonMultiType } from '../../../../types';
import handleChange from '../../../../utils/form/use-state/handleChange';

ModalStaticBtn.propTypes = {
    modal: PropTypes.object.isRequired,
    button: PropTypes.object,
    setSelectedValue: PropTypes.func,
}

export default function ModalStaticBtn({ modal, button, setSelectedValue }) {
    const [open, setOpen] = useState(false);

    const {
        title,
        backgroundColor,
        backColorOnHover } = button;

    const styles = {
        finishButton: {
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.5em',
            padding: '25px 35px',
            borderRadius: '20px',
            backgroundColor: 'var(--mainPink)',
            color: 'var(--mainWhite)',
            outline: 'none',
        }
    }

    const onOpen = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
      // setSelectedValue(value); using redux update instead
    };

    return (
        <div>
           <button
               className="text-shadow mt-5 pressed-to-left"
               style={styles.finishButton}
               onClick={onOpen}
               onMouseOver={e => e.target.style.backgroundColor=backColorOnHover}
               onMouseOut={e => e.target.style.backgroundColor=backgroundColor}
           >
               {title}
           </button>
           <ModalFormLoyaltyPanel
               open={open}
               onClose={onClose}
               modal={modal}
           />
        </div>
    );
}
