import React, { useState } from 'react';
import {
    CssBaseline,
    Grid,
    Paper
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfilePersonalCard';
import ProfileTop from '../components/ProfileTop';
import AccountCard from '../components/ProfileAccountCard';
import ChangePasswordCard from '../components/ProfileChangePasswordCard';

import { makeStyles } from '@material-ui/core/styles';

import '../assets/css/index.css';
import '@fontsource/roboto';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '.75em',
        marginTop: 75,
    },
    paper1: {
        margin: 10,
        padding: 15,
    },
    paper: {
        margin: 10,
        padding: 15,
        minHeight: '80vh',
    },
    title: {
        margin: 5,
    },
    aggMessage: {
        margin: 25,
    },
    img: {
        [theme.breakpoints.up('sm')]: {
            width: '70%',
        },
        [theme.breakpoints.down('md')]: {
            width: '40%',
        },
    },
}))

export default function Users() {

    const classes = useStyles();

    const [auth, setAuth] = useState(true);
    const [admin, setAdmin] = useState(true);

    return (
        <div>
            <CssBaseline />
            <NavBar auth={auth} setAuth={setAuth} admin={admin} setAdmin={setAdmin} />
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.paper} elevation={0}>

                        <ProfileTop />

                        <Grid container spacing={1} justifyContent='center'>
                            <Grid item xs={12} md={4}>
                                <ProfileCard />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <AccountCard />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ChangePasswordCard />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
