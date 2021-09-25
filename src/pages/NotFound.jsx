import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import man_lift from '../assets/img/man_lift.png';

import '../assets/css/error404.css';
import '@fontsource/roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    alignContent: 'center',
    padding: '50px 50px 0px 0px',
    margin: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    minHeight: '100vh',
    minWidth: '100vw',
  },
  body: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/img/city.jpg"})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '0px',
    margin: '0',
    minHeight: '100vh',
    minWidth: '100vw',
  },
  img: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
  text: {
    fontFamily: 'Nunito',
  },
}));

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Grid
        container spacing={2}
        justifyContent='center'
        className={classes.root}
      >
        <Grid item xs={12} sm={12} md={3} lg={6} xl={6}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
              <Typography align='center'>
                <img src={man_lift} alt='' className={classes.img} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography variant='h2' color='primary' align='center' className={classes.text}>
            ¡Lo sentimos!
          </Typography>
          <Typography variant='h5' color='primary' align='center'>
            No pudimos encontrar la página que estás buscando.
          </Typography>
          <Typography variant='body1' color='primary' align='center'>
            Deberías intentar volver al inicio a ver si encuentras aquello que deseas.
          </Typography>
          <Typography align='center'>
            <Tooltip title='Inicio' aria-label='Inicio' placement='right'>
              <IconButton component={Link} to='/' color='primary'>
                <HomeOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant='h6' align='center' color='primary'>
            <b>Error: 404.</b> Page Not Found
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}