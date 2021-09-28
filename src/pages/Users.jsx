import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  Fab,
  Grid,
  Paper,
  Tooltip,
  Typography,
  Divider
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Tabla from '../components/Tabla';
import ListItemUser from '../components/ListItemUsers'
import ProgramDialog from '../components/ProgramDialog';

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

  const data = [
    { id: '0', name: 'Luis', lastname: 'Valladares', username: 'luisvalla', email: 'luisprueba@gmail.com', rol: 'ADMIN', status: 'A' },
    { id: '1', name: 'Gustavo', lastname: 'Rivero', username: 'gusrive', email: 'gustprueba@gmail.com', rol: 'ADMIN', status: 'I' },
    { id: '2', name: 'Maria', lastname: 'Paredes', username: 'mapar', email: 'mariaprueba@gmail.com', rol: 'ADMIN', status: 'A' },
    { id: '3', name: 'Jose', lastname: 'Medina', username: 'medina69', email: 'joseprueba@gmail.com', rol: 'USER', status: 'A' },
    { id: '4', name: 'Luis', lastname: 'Campos', username: 'camposluis', email: 'luiscprueba@gmail.com', rol: 'USER', status: 'A' },
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
      <Grid container className={classes.root} justifyContent='center'>

        <Grid item xs={11} md={11}>
          <Typography style={{ fontWeight: 600 }} variant='h4' component='h2' className={classes.title} align='left'>
            Lista de Usuarios
          </Typography>
        </Grid>

        <Grid container spacing={1} justifyContent='center'>

          <Grid item xs={11} md={7} align='center'>
            <Typography variant='caption' component='p' className={classes.title} align='justify'>
              A continuación, se listarán todos los Usuarios.
              Por favor, seleccione el que desee revisar.
            </Typography>
          </Grid>

          <Grid item xs={8} md={3} align='left'>
            <TextField id="user-search" label="Buscar" type="search" fullWidth/>
          </Grid>

          <Grid item xs={1} md={1} align='right'>
            <Tooltip title='Agregar Usuario' placement='right-start'>
              <Fab size='small' color='secondary' aria-label='add' component={Button} onClick={handleOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <ProgramDialog
              nameFunction='Agregar programa'
              contentFunction='Ingrese la información del programa a agregar. 
                    El botón de Agregar no se habilitará hasta que ingrese la información requerida.'
              buttonFunctionName='Agregar'
              handleOpen={handleOpen}
              open={open}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={11} align='center'>
          <ListItemUser item={data} />
        </Grid>

      </Grid>
      <Footer />
    </div>
  )
}
