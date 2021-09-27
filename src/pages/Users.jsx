import React, { useState } from 'react';
import {
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
import Tabla from '../components/Tabla';

import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

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

export default function Users() {
     
      const rows = [
        {
            name: 'Luis',
            lastname: 'Valladares',
            username: 'luisvalla',
            email: 'luisprueba@gmail.com',
            rol: 'ADMIN',
            status: 'A'
          },
          {
            name: 'Gustavo',
            lastname: 'Rivero',
            username: 'gusrive',
            email: 'gustprueba@gmail.com',
            rol: 'ADMIN',
            status: 'I'
          },
          {
            name: 'Maria',
            lastname: 'Paredes',
            username: 'mapar',
            email: 'mariaprueba@gmail.com',
            rol: 'ADMIN',
            status: 'A'
          },
      ];

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
          <Paper className={classes.paper}>
            <Grid container spacing={1} justifyContent='center'>

              <Grid item xs={12}>
                <Typography variant='h4' component='h2' className={classes.title} align='left'>
                  Lista de Usuarios
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography variant='caption' component='p' className={classes.title} align='justify'>
                  A continuación, se listarán todos los Usuarios.
                  Por favor, seleccione el que desee revisar.
                </Typography>
              </Grid>

              <Grid item xs={4} align='right'>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={1} align='right'>
                        <SearchIcon/>
                    </Grid>
                    <Grid item xs={3} align='right'>
                        <TextField id="input" label="Filtrar..." />
                    </Grid>
                </Grid>
              </Grid>

              <Grid item xs={11}>
                <Tabla
                rows={rows}/>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}
