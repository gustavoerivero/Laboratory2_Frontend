import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  Button,
  CssBaseline,
  Fab,
  Grid,
  Paper,
  Tooltip,
  Typography
} from '@material-ui/core'
import NavBar from '../components/NavBar'
import ColorCard from '../components/ColorCard'
import ProgramProfile from '../components/ProgramProfile'
import ProgramDialog from '../components/ProgramDialog'
import Footer from '../components/Footer'

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

export default function Home() {

  const { username, rol } = useParams()

  const [programs, setPrograms] = useState([])
  const [program, setProgram] = useState({
    id: 0,
    codigo: '',
    nombre: '',
    status: ''
  })
  const [user, setUser] = useState({
    id: 0,
    programa: {
      id: 0,
      codigo: '',
      nombre: '',
      status: ''
    }
  })

  useEffect(() => {
    if (rol === '0' && programs.length === 0) {
      axios.get(`http://192.168.1.100:8080/programa/get`)
        .then(result => {
          setPrograms(result.data)
        })
        .catch(error => console.log(error))
    } else if (rol === '1' && program.id === 0) {
      axios.get(`http://192.168.1.100:8080/usuario/get/username/${username}`)
        .then(result => {
          setUser(result.data)
        })
        .catch(error => console.log(error))
      axios.get(`http://192.168.1.100:8080/programa/get/codigo/${user.programa.codigo}`)
        .then(result => {
          setProgram(result.data)
        })
        .catch(error => console.log(error))
    }
  })

  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [programSelect, setProgramSelect] = useState(null)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <CssBaseline />
      <NavBar auth={true} admin={rol === '0' ? true : false} />
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
                {
                  rol === '0' ?
                    <>
                      <Tooltip title='Agregar programa' placement='right-start'>
                        <Fab size='small' color='secondary' aria-label='add' component={Button} onClick={handleOpen}>
                          <AddIcon />
                        </Fab>
                      </Tooltip>
                      <ProgramDialog
                        id={null}
                        type='add'
                        title='Agregar programa'
                        handleOpen={handleOpen}
                        open={open}
                      />
                    </>
                    : ''
                }
              </Grid>
              {rol === '0' && programs.length > 0 ? programs.map((element, i) => {
                console.log(element)
                return (
                  <Grid item key={i}>
                    <ColorCard
                      id={element.id}
                      title={element.codigo}
                      content={element.nombre}
                      haveColor={true}
                      color={1}
                      rol={rol}
                      handleView={setProgramSelect}
                    />
                  </Grid>
                )
              }) : rol === '1' && program.id !== 0 ?
                <Grid item>
                  <ColorCard
                    id={program.id}
                    title={program.codigo}
                    content={program.nombre}
                    haveColor={true}
                    color={1}
                    handleView={setProgramSelect}
                  />
                </Grid>
                :
                <Grid item>
                  <Typography variant='body2' component='p' className={classes.aggMessage}>
                    {
                      rol === '0' ?
                        "No se han ingresado programas aún. Para agregar un programa, haga click en el botón de agregar."
                        : "No se han ingresado programas aún."
                    }
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
