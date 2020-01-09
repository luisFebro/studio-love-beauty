import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonMulti from '../../../../components/buttons/material-ui/ButtonMulti';
import ButtonFab from '../../../../components/buttons/material-ui/ButtonFab';
import Drawer from '@material-ui/core/Drawer';

DrawerBtn.propTypes = {
    drawer: PropTypes.object,
    button: PropTypes.object,
}

export default function DrawerBtn({ drawer, button }) {
    const [open, setOpen] = useState(false);

    const styles = {
        sidebar: {
            minWidth: '900px',
            position: 'relative',
        },
        servicesContainer: {
            width: '90%',
            margin: 'auto'
        },
        subServicesContainer: {
            position: 'relative',
        },
        servicesItem: {
            whiteSpace: 'pre-line',
            backgroundColor: 'var(--mainDark)',
            color: 'var(--mainPink)',
            margin: '28px 0',
            padding: "20px 10px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5em"
        }
    }

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
            <Drawer
                style={styles.sidebar}
                open={open}
                onClose={onClose}
                anchor="right"
            >
                <div className="container-center flex-column">
                    <p className="mx-5 my-4 text-default font-weight-bold">
                        {drawer.title}
                    </p>
                    <div className="my-3">
                        <ButtonFab
                            backgroundColor="var(--mainPink)"
                            position="relative"
                            size="large"
                            iconFontAwesome="fas fa-plus"
                            iconMarginLeft="0"
                        />
                    </div>
                    <section style={styles.servicesContainer}>
                        <div style={styles.subServicesContainer}>
                            <div className="text-default" style={styles.servicesItem}>
                                Depilação Teste
                            </div>
                            <ButtonFab
                                iconFontAwesome="fas fa-trash-alt"
                                backgroundColor="purple"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={215}
                            />
                            <ButtonFab
                                iconFontAwesome="fas fa-pencil-alt"
                                backgroundColor="var(--mainPink)"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={260}
                            />
                        </div>
                        <div style={styles.subServicesContainer}>
                            <div className="text-default" style={styles.servicesItem}>
                                Escova com hidratação facial Teste
                            </div>
                            <ButtonFab
                                iconFontAwesome="fas fa-trash-alt"
                                backgroundColor="purple"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={215}
                            />
                            <ButtonFab
                                iconFontAwesome="fas fa-pencil-alt"
                                backgroundColor="var(--mainPink)"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={260}
                            />
                        </div>
                        <div style={styles.subServicesContainer}>
                            <div className="text-default" style={styles.servicesItem}>
                                Manicure Teste
                            </div>
                             <ButtonFab
                                iconFontAwesome="fas fa-trash-alt"
                                backgroundColor="purple"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={215}
                            />
                            <ButtonFab
                                iconFontAwesome="fas fa-pencil-alt"
                                backgroundColor="var(--mainPink)"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={260}
                            />
                        </div>
                        <div style={styles.subServicesContainer}>
                            <div className="text-default" style={styles.servicesItem}>
                                Pedicure Teste
                            </div>
                             <ButtonFab
                                iconFontAwesome="fas fa-trash-alt"
                                backgroundColor="purple"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={215}
                            />
                            <ButtonFab
                                iconFontAwesome="fas fa-pencil-alt"
                                backgroundColor="var(--mainPink)"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={260}
                            />
                        </div>
                    </section>
                </div>
            </Drawer>
        </div>
    );
}