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
import ListItemUser from '../components/ListItemUsers'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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

export default function Testing() {
     
      const data = [
        {   
            id: '0',
            name: 'Luis',
            lastname: 'Valladares',
            username: 'luisvalla',
            email: 'luisprueba@gmail.com',
            rol: 'ADMIN',
            status: 'A'
          },
          {
            id: '1',
            name: 'Gustavo',
            lastname: 'Rivero',
            username: 'gusrive',
            email: 'gustprueba@gmail.com',
            rol: 'ADMIN',
            status: 'I'
          },
          {
            id: '2',
            name: 'Maria',
            lastname: 'Paredes',
            username: 'mapar',
            email: 'mariaprueba@gmail.com',
            rol: 'ADMIN',
            status: 'A'
          },
          {
            id: '3',
            name: 'Jose',
            lastname: 'Medina',
            username: 'medina69',
            email: 'joseprueba@gmail.com',
            rol: 'USER',
            status: 'A'
          },
          {
            id: '4',
            name: 'Luis',
            lastname: 'Campos',
            username: 'camposluis',
            email: 'luiscprueba@gmail.com',
            rol: 'USER',
            status: 'A'
          }
      ];

  const classes = useStyles();

  const [auth, setAuth] = useState(true);
  const [admin, setAdmin] = useState(true);

  const [open, setOpen] = useState(false);

  const [programSelect, setProgramSelect] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  }

  function generate(element) {
    return data.map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

  return (
    <div>
      <CssBaseline />
      <NavBar auth={auth} setAuth={setAuth} admin={admin} setAdmin={setAdmin} />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.paper}>
            <ListItemUser item={data}/>
            </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}
