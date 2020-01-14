import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Customized Data
import { useStoreDispatch } from 'easy-peasy';
import ModalBtn from './modal/select/ModalBtn';
import {default as ModalBtnEditInfo} from '../dashboard-admin/dash-booking/staff-modal-form/ModalBtn';
import ButtonFab from '../../components/buttons/material-ui/ButtonFab';
import { findAnItem } from '../../redux/actions/globalActions';
import { showModalConfYesNo } from '../../redux/actions/modalActions';
// End Customized Data

ExpansiblePanel.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            mainHeading: PropTypes.string,
            secondaryHeading: PropTypes.string,
            hiddenContent: PropTypes.any
        })
    ).isRequired,
    ToggleButton: PropTypes.element,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    statusAfterClick: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: window.Helper.isSmallScreen() ? '100%' : '80%',
        margin: 'auto',
    },
    heading: {
        fontSize: '1em',
        fontWeight: 'bold',
        flexBasis: '33.33%',
        flexShrink: 0,
        textShadow: '1px 1px 3px black'
    },
    secondaryHeading: {
        paddingLeft: '10px',
        fontSize: theme.typography.pxToRem(15),
        textShadow: '1px 1px 3px black'
    }
}));

const getStatusColor = status => {
    switch(status) {
        case "cancelado":
            return "var(--mainRed)";
        case "pendente":
            return "var(--mainYellow)";
        case "atrasado":
            return "purple";
        case "feito":
            return "var(--mainGreen)";
        default:
            return "grey";
    }
}

export default function ExpansiblePanel({
    actions,
    backgroundColor,
    ToggleButton,
    color,
    allUsers,
    setStaffBookingRun,
    staffBookingRun }) {

    const classes = useStyles();

    const dispatch = useStoreDispatch();
    // const [expanded, setExpanded] = React.useState(false);
    // const handleChange = panel => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const styles = {
        container: {
            position: 'relative',
        },
        expansionPanel: {
            color: color,
            backgroundColor: backgroundColor, // default is paper color
            margin: '35px 0',
        },
        button: {
            transform: 'translate(-50%, -50%)'
        },
        iconContainer: {
            position: 'absolute',
            top: -10,
            left: 10
        },
        mainHeading: {
            display: 'flex',
            alignItems: 'center',
        }

    }

    const showUpperConfigBtns = panel => (
        <div className="animated zoomIn delay-1s">
            <div className="disabledLink">
                <ButtonFab
                    top={-27}
                    left={90}
                    title={panel.staffBooking.status.substring(1)}
                    variant="extended"
                    style={styles.button}
                    color={panel.staffBooking.status === "3pendente" ? "black" : "white"}
                    backgroundColor={getStatusColor(panel.staffBooking.status.substring(1))}
                />
            </div>
            <div className="enabledLink">
                <ModalBtn
                    modal={{
                        title: `Troca de Status<br />Agendamento`,
                        txtBtn: "Trocar",
                        iconBtn: "fas fa-exchange-alt",
                        modalData: panel.staffBooking,
                    }}
                    button={{
                        iconFontAwesome: "fas fa-pencil-alt",
                        backgroundColor: "var(--mainPink)",
                        iconMarginLeft: '0px',
                        top: -30,
                        left: 55
                    }}
                />
            </div>
            <ModalBtnEditInfo
                button={{
                    backgroundColor: "grey",
                    iconMarginLeft:  '0px',
                    variant: "extended",
                    title: "editar info",
                    size: "small",
                    top: -27,
                    left: 200,
                }}
                modal={{
                    title: `Agendamento de Clientes<br />(EDIÇÃO)`,
                    txtBtn: "Atualizar",
                    iconBtn: "fas fa-exchange-alt",
                    modalData: panel,
                }}
                setRun={setStaffBookingRun}
                run={staffBookingRun}
            />
        </div>
    );

    const showPanel = panel => (
        <ExpansionPanelSummary
            expandIcon={
                <div
                    style={styles.iconContainer}
                    className="enabledLink"
                >
                    {ToggleButton
                    ? ToggleButton
                    : <ExpandMoreIcon />
                    }
                </div>
            }
            aria-controls={`panel${panel._id}bh-content`}
            id={`panel${panel._id}bh-header`}
        >
            <Typography
                className={clsx(classes.heading, "text-title")}
                style={styles.mainHeading}
            >
                {panel.mainHeading}
            </Typography>
            <Typography
                className={classes.secondaryHeading}
            >
                {panel.secondaryHeading}
            </Typography>
        </ExpansionPanelSummary>
    );

    const showHiddenPanel = panel => (
        <ExpansionPanelDetails>
            {panel.hiddenContent}
        </ExpansionPanelDetails>
    );

    return (
        <div className={classes.root}>
            {actions.map(panel => (
                <div
                    key={panel._id}
                    style={styles.container}
                >
                    <ExpansionPanel
                        style={styles.expansionPanel}
                        className="disabledLink"
                        disabled={["2cancelado", "1feito"].includes(panel.staffBooking.status) ? true : false}
                    >
                        {showPanel(panel)}
                        {showHiddenPanel(panel)}
                    </ExpansionPanel>
                    {showUpperConfigBtns(panel)}
                </div>
            ))}
        </div>
    );
}
