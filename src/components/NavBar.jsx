import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';

import '../assets/css/index.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        paddingLeft: '2em',
        flexGrow: 1,
        fontFamily: 'Nunito',
        fontWeight: 'bold',
    },
    appTitle: {
        colorText: 'rgba(255, 255, 255, .75)',
    },
}));

export default function NavBar() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        UCL<span className={classes.AppTitle}>App</span>
                    </Typography>                    
                </Toolbar>
            </AppBar>
        </div>
    );
}