import React from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Github from '../assets/icons/github.png';

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: 'Roboto',
  },
  appbarTitle: {
    flexGrow: '1',
    fontFamily: 'Nunito',
    color: 'white',
  },
  colorText: {
    color: 'rgba(255, 255, 255, .75)',
    opacity: 1,
  },
  team: {
    color: theme.palette.text.primary,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  slogan: {
    color: theme.palette.text.primary,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  firstLink: {
    color: theme.palette.text.primary,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '1rem',
    "&:hover": {
      color: '#FFFFFF',
    },
    paddingRight: '1em',
  },
  lastLink: {
    color: theme.palette.text.primary,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '1rem',
    "&:hover": {
      color: '#FFFFFF',
    },
  }
}));

export default function Footer() {

  const classes = useStyles();

  return (
    <footer>
      <Box
        px={{ xs: 1, sm: 3 }}
        py={{ xs: 1, sm: 1.5 }}
        bgcolor='secondary.main'
        color='text.primary'
        className={classes.container}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={.5} >
            <Grid item xs={10} sm={10} md={11} >
              <h1 className={classes.appbarTitle} >
                UCL<span className={classes.colorText}>App</span>
              </h1>
            </Grid>
            <Grid item xs={2} sm={2} md={1}>
              <IconButton href='https://github.com/gustavoerivero/Laboratory2_Frontend'>
                <img src={Github} alt='' />
              </IconButton>
            </Grid>
            <Grid item xs={12} >
              <Link
                href='/'
                className={classes.firstLink}
                underline='none'
              >
                Inicio
              </Link>
              <Link
                href='/'
                color='inherit'
                className={classes.lastLink}
                underline='none'
              >
                Créditos
              </Link>
            </Grid>
            <Grid item xs={6} sm={7} md={9}>
              <p>
                <b>&#169; 2021 | Equipo </b><span className={classes.team}>Dinamita</span>.
              </p>
            </Grid>
            <Grid item xs={6} sm={5} md={3} >
              <Typography
                variant='body2'
                className={classes.slogan}
                align='right'
              >
                Abriendo caminos hacia el futuro.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}