import React, { useState } from 'react';
import { CssBaseline, Fab, Grid, Paper, Tooltip, Typography } from '@material-ui/core';
import NavBar from '../components/NavBar';
import ColorCard from '../components/ColorCard';
import ProgramProfile from '../components/ProgramProfile';
import Footer from '../components/Footer';

import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

import '../assets/css/index.css';
import '@fontsource/roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '.75em',
    marginTop: 75,
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
  }
}))

export default function Home() {

  const data = [
    {
      id: '0',
      title: 'Ing. en Informática',
      desc: 'Carrera de Ing. Inf',
    },
    {
      id: '1',
      title: 'Ing. en Producción',
      desc: 'Carrera de Ing. Prod',
    },
    {
      id: '2',
      title: 'Lic. en Física',
      desc: 'Carrera de Lic. Física',
    },
    {
      id: '3',
      title: 'Lic. en Matemática',
      desc: 'Carrera de Lic. Matemática'
    },
    {
      id: '4',
      title: 'Ing. en Telemática',
      desc: 'Carrera de Ing. Telem.',
    },
  ];

  const classes = useStyles();

  const [auth, setAuth] = useState(true);
  const [admin, setAdmin] = useState(true);

  const [programSelect, setProgramSelect] = useState(null);

  return (
    <div>
      <CssBaseline />
      <NavBar auth={auth} setAuth={setAuth} admin={admin} setAdmin={setAdmin} />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item xs={12}>
                <Typography variant='h4' component='h2' className={classes.title} align='left'>
                  Programas académicos
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant='caption' component='p' className={classes.title} align='justify'>
                  A continuación, se listarán todos los programas.
                  Por favor, seleccione el que desee revisar.
                </Typography>
              </Grid>
              <Grid item xs={2} align='right'>
                <Tooltip title='Agregar programa' placement='right-start'>
                  <Fab size='small' color='secondary' aria-label='add'>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </Grid>
              {data.length > 0 ? data.map((element) => (
                <Grid item>
                  <ColorCard
                    id={element.id}
                    title={element.title}
                    content={element.desc}
                    haveColor={true}
                    color={Math.floor(Math.random() * 5)}
                    handleView={setProgramSelect}
                  />
                </Grid>
              )) :
                <Grid item>
                  <Typography variant='body2' component='p' className={classes.aggMessage}>
                    No se han ingresado programas aún. Para agregar un programa,
                    haga click en el botón de agregar.
                  </Typography>
                </Grid>
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item xs={12}>
                <Typography variant='h4' component='h3' className={classes.title}>
                  Programa seleccionado
                </Typography>
                <Typography variant='caption' component='p' className={classes.title} align='justify'>
                  En esta sección, se mostrará el programa seleccionado.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {programSelect === null ?
                  <Typography variant='body2' component='p' className={classes.aggMessage}>
                    No se ha seleccionado ningún programa aún.
                  </Typography>
                  :
                  <ProgramProfile 
                    id={programSelect}
                  />
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}
