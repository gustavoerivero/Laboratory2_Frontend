import React, { useState } from 'react';
import {
    Grid,
    Typography
} from '@material-ui/core';
import profile from '../assets/img/profile.jpg';

import EmailIcon from '@material-ui/icons/Email';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import { makeStyles } from '@material-ui/core/styles';

import '../assets/css/index.css';
import '@fontsource/roboto';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: 5,
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

export default function ProfileTop() {

    const classes = useStyles();

    return (
        <Grid container spacing={1} justifyContent='center'>
            <Grid item xs={12} md={4}>
                <Typography align='center'>
                    <img src={profile} alt='' className={classes.img} />
                </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Grid item xs={4} md={12}>
                    <Typography variant='h4' component='h2' className={classes.title} align='left'>
                        Hola
                    </Typography>
                </Grid>
                <Grid item xs={6} md={12}>
                    <Typography style={{ fontWeight: 600 }} variant='h3' component='h2' className={classes.title} align='left'>
                        Gustavo,
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' component='p' className={classes.title} align='justify'>
                        en esta ventana podrás ver y/o actualizar tus datos personales.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs={1} md={1}><EmailIcon /></Grid>
                                <Grid item xs={11} md={4}>
                                    <Typography variant='body1' component='p' className={classes.title} align='justify'>
                                        luismvalladaresollarves@gmail.com
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item xs={1} md={1}><FingerprintIcon /></Grid>
                                    <Grid item xs={11} md={4}>
                                    <Typography variant='body1' component='p' className={classes.title} align='justify'>
                                        Administrador
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}
