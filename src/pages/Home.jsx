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
  img: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
}))

export default function Home() {

  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
          <Grid container justifyContent='center'>
            <Typography align='center'>
              <img src={man_office} alt='' className={classes.img} />
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={6}>
          <Login />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

