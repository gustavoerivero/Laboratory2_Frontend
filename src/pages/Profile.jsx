import React, { useState } from 'react';
import {
    Box,
    Button,
    CssBaseline,
    Fab,
    Grid,
    Paper,
    Tooltip,
    Typography
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfilePersonalCard';
import AccountCard from '../components/ProfileAccountCard';
import ChangePasswordCard from '../components/ProfileChangePasswordCard';
import profile from '../assets/img/profile.jpg';

import EmailIcon from '@material-ui/icons/Email';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

import '../assets/css/index.css';
import '@fontsource/roboto';
import { blue } from '@material-ui/core/colors';

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

    const [open, setOpen] = useState(false);

    const [programSelect, setProgramSelect] = useState(null);

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div>
            <CssBaseline />
            <NavBar auth={auth} setAuth={setAuth} admin={admin} setAdmin={setAdmin} />
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.paper} elevation={0}>
                        <Grid container spacing={1} justifyContent='center'>
                            <Grid item xs={4}>
                                <Typography align='center'>
                                    <img src={profile} alt='' className={classes.img} />
                                </Typography>
                            </Grid>

                            <Grid item xs={7}>
                                <Grid item xs={12}>
                                    <Typography variant='h4' component='h2' className={classes.title} align='left'>
                                        Hola
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
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
                                        <Grid item><EmailIcon /></Grid>

                                        <Grid item>
                                            <Typography variant='body1' component='p' className={classes.title} align='justify'>
                                                gustavorivero@gmail.com
                                            </Typography>
                                        </Grid>
                                        <Grid item><FingerprintIcon /></Grid>
                                        <Grid item>
                                            <Typography variant='body1' component='p' className={classes.title} align='justify'>
                                                Administrador
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} justifyContent='center'>
                                <Grid item xs={4}>
                                    <ProfileCard/>
                                </Grid>
                                <Grid item xs={4}>
                                    <AccountCard/>
                                </Grid>
                                <Grid item xs={4}>
                                    <ChangePasswordCard/>
                                </Grid>
                            </Grid>

                            {/*<Grid item xs={11}>
                                <Typography style={{ fontWeight: 600 }} variant='h4' component='h2' className={classes.title} align='left'>
                                    Datos personales
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>______________________________________________________________________________________________________________________________________________________________________</Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Typography style={{ fontWeight: 600 }} variant='h6' component='h2' className={classes.title} align='left'>
                                            Nombre:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='h6' component='h2' className={classes.title} align='left'>
                                            Gustavo
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Typography style={{ fontWeight: 600 }} variant='h6' component='h2' className={classes.title} align='left'>
                                            Apellido:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='h6' component='h2' className={classes.title} align='left'>
                                            Rivero
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>*/}

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
