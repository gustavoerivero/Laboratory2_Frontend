import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  CssBaseline,
  Fab,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ListItemUser from '../components/ListItemUsers'
import UserDialog from '../components/UserDialog'

import AddIcon from '@material-ui/icons/Add'

import { makeStyles } from '@material-ui/core/styles'

import '../assets/css/index.css'
import '@fontsource/roboto'

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

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (users.length === 0) {
      axios.get(`http://localhost:8080/usuario/get`)
      .then(res => {
        console.log('Usuarios:', res.data)
        setUsers(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    }    
  })

  const classes = useStyles()

  const [auth, setAuth] = useState(true)
  const [admin, setAdmin] = useState(true)

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
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

          <Grid item xs={10} md={10} align='center'>
            <Typography variant='caption' component='p' className={classes.title} align='justify'>
              A continuación, se listarán todos los usuarios.
              Por favor, seleccione el que desee revisar.
            </Typography>
          </Grid>

          <Grid item xs={1} md={1} align='right'>
            <Tooltip title='Agregar Usuario' placement='right-start'>
              <Fab size='small' color='secondary' aria-label='add' component={Button} onClick={handleOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <UserDialog
              dialogType='add'
              nameFunction='Agregar Usuario'
              contentFunction='Ingrese la información del Usuario a agregar. 
                    El botón de Agregar no se habilitará hasta que ingrese la información requerida.'
              buttonFunctionName='Agregar'
              handleOpen={handleOpen}
              open={open}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={11} align='center' style={{ minHeight: "55.2vh" }}>
          <ListItemUser item={users} />
        </Grid>

      </Grid>
      <Footer />
    </div>
  )
}
