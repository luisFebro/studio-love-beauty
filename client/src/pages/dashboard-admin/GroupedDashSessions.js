import React from 'react';
import PropTypes from 'prop-types';
// Dash Sessions
import DashUsers from './dash-users';
import DashProducts from './dash-products';
import DashPromotions from './dash-promotions';
import DashAnalytics from './dash-analytics';
import DashSales from './dash-sales';
import DashStore from './dash-store';
// End Dash Sessions

// Material UI
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
// Icons from Tabs
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StorefrontIcon from '@material-ui/icons/Storefront';
// End Material UI

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        position: 'relative',
        minHeight: 600
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600]
        }
    }
}));

export default function GroupedDashSessions() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    // const transitionDuration = {
    //     enter: theme.transitions.duration.enteringScreen,
    //     exit: theme.transitions.duration.leavingScreen
    // };

    // const fabs = [
    //     {
    //         color: 'primary',
    //         className: classes.fab,
    //         icon: <AddIcon />,
    //         label: 'Add'
    //     },
    //     {
    //         color: 'secondary',
    //         className: classes.fab,
    //         icon: <EditIcon />,
    //         label: 'Edit'
    //     },
    //     {
    //         color: 'inherit',
    //         className: clsx(classes.fab, classes.fabGreen),
    //         icon: <UpIcon />,
    //         label: 'Expand'
    //     }
    // ];

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable" // prior:fullWidth
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force with icon"
                >
                    <Tab label="Usuários" icon={<SupervisedUserCircleIcon />} {...a11yProps(0)} />
                    <Tab label="Produtos" icon={<LocalMallIcon />} {...a11yProps(1)} />
                    <Tab label="Vendas" icon={<MonetizationOnIcon />} {...a11yProps(2)} />
                    <Tab label="Promoções" icon={<LoyaltyIcon />} {...a11yProps(3)} />
                    <Tab label="Análises e Gráficos" icon={<TrendingUpIcon />} {...a11yProps(4)} />
                    <Tab label="Sobre a Loja" icon={<StorefrontIcon />} {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <DashUsers />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <DashProducts />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <DashSales />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <DashPromotions />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <DashAnalytics />
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <DashStore />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
