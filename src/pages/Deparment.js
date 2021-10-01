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
import ListItemDeps from '../components/ListItemDeps'
import DepartmentDialog from '../components/DepartmentDialog'

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

export default function Deparments() {

  const [deps, setDeps] = useState([])

  useEffect(() => {
    if (deps.length === 0) {
      axios.get(`http://192.168.1.100:8080/departamentos/get`)
      .then(res => {
        console.log('Departamentos:', res.data)
        setDeps(res.data)
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
            Lista de Departamentos
          </Typography>
        </Grid>

        <Grid container spacing={1} justifyContent='center'>

          <Grid item xs={10} md={10} align='center'>
            <Typography variant='caption' component='p' className={classes.title} align='justify'>
              A continuación, se listarán todos los departamentos.
              Por favor, seleccione el que desee revisar.
            </Typography>
          </Grid>

          <Grid item xs={1} md={1} align='right'>
            <Tooltip title='Agregar Departamento' placement='right-start'>
              <Fab size='small' color='secondary' aria-label='add' component={Button} onClick={handleOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <DepartmentDialog
              dialogType='add'
              nameFunction='Agregar Departamento'
              contentFunction='Ingrese la información del departamento a agregar. 
                    El botón de Agregar no se habilitará hasta que ingrese la información requerida.'
              buttonFunctionName='Agregar'
              handleOpen={handleOpen}
              open={open}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={11} align='center'>
          <ListItemDeps item={deps} />
        </Grid>

      </Grid>
      <Footer />
    </div>
  )
}
