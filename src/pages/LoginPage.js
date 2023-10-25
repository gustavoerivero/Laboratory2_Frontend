import React from 'react';
import { CssBaseline, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Footer from '../components/Footer';

import '../assets/css/index.css';
import '@fontsource/roboto';

import man_office from '../assets/img/man_office.png';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 75,
    marginBottom: 15,
  },
  img: {
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
  footer: {
    marginTop: '50px',
  },
}))

export default function LoginPage() {

  const classes = useStyles();

  return (
    <div style={{ minHeight: "92vh" }}>
      <CssBaseline />
      <NavBar />
      <Grid container justifyContent='center' alignItems='center' className={classes.root}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
          <Grid container justifyContent='center'>
            <Grid item xs={12}>
              <Typography align='center'>
                <img src={man_office} alt='' className={classes.img} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={6}>
          <Login />
        </Grid>
      </Grid>
      <Footer className={classes.footer} />
    </div>
  );
}

