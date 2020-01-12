import React, { Fragment } from 'react';
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
import ModalBtn from '../../../dashboard-staff/modal/select/ModalBtn';
import ButtonFab from '../../../../components/buttons/material-ui/ButtonFab';
import { showModalConfYesNo } from '../../../../redux/actions/modalActions';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import { removeBooking } from '../../../../redux/actions/staffBookingActions';
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
        width: window.Helper.isSmallScreen() ? '100%' : '95%',
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
    setRun,
    run }) {

    const classes = useStyles();

    const dispatch = useStoreDispatch();
    // const [expanded, setExpanded] = React.useState(false);
    // const handleChange = panel => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const styles = {
        expansionPanel: {
            color: color,
            backgroundColor: backgroundColor, // default is paper color
            margin: '40px 0',
        },
        button: {
            transform: 'translate(-50%, -50%)'
        },
        iconContainer: {
            position: 'absolute',
            top: -10,
            left: 10
        },
        heading: {
            display: 'flex',
            alignItems: 'center',
        }

    }

    const handleRemoval = (staffId, itemId) => {
        showSnackbar(dispatch, "Excluindo...", "warning", 6000);
        removeBooking(dispatch, staffId, itemId)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setRun(!run);
            showSnackbar(dispatch, res.data.msg, 'success');
        })
    }

    const showStatus = panel => (
        <div className="animated zoomIn delay-1s">
            <div className="disabledLink">
                <ButtonFab
                    top={-27}
                    left={70}
                    title={panel.staffBooking.status.substring(1)}
                    variant="extended"
                    style={styles.button}
                    color={panel.staffBooking.status === "3pendente" ? "black" : "white"}
                    backgroundColor={getStatusColor(panel.staffBooking.status.substring(1))}
                />
            </div>
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
                style={styles.heading}
            >
                {panel.mainHeading}
            </Typography>
            <Typography
                style={styles.heading}
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

    const showConfigBtns = panel => (
        <Fragment>
            <ButtonFab
                iconFontAwesome="fas fa-trash-alt"
                backgroundColor="purple"
                iconMarginLeft= '0px'
                size="small"
                top={-33}
                left={185}
                onClick={() => handleRemoval(panel.staffBooking.staffId, panel.staffBooking._id)}
            />
            <ButtonFab
                iconFontAwesome="fas fa-pencil-alt"
                backgroundColor="var(--mainPink)"
                iconMarginLeft= '0px'
                fontSize=".8em"
                size="small"
                top={-33}
                left={230}
                onClick={null}
            />
        </Fragment>
    );

    return (
        <div className={classes.root}>
            {actions.map(panel => (
                <div
                    key={panel._id}
                    className="position-relative"
                >
                    <ExpansionPanel
                        style={styles.expansionPanel}
                        className="disabledLink"
                        disabled={["2cancelado", "1feito"].includes(panel.staffBooking.status) ? true : false}
                    >
                        {showPanel(panel)}
                        {showHiddenPanel(panel)}
                    </ExpansionPanel>
                    {showStatus(panel)}
                    {showConfigBtns(panel)}
                </div>
            ))}
        </div>
    );
}
