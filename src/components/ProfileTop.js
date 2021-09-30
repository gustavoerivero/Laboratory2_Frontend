import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Grid,
  Typography
} from '@material-ui/core'
import profile from '../assets/img/profile.jpg'

import EmailIcon from '@material-ui/icons/Email'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

import { makeStyles } from '@material-ui/core/styles'

import '../assets/css/index.css'
import '@fontsource/roboto'

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 5,
  },
  img: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
}))

export default function ProfileTop({ username, rol, type }) {

  const classes = useStyles()

  const [response, setResponse] = useState(null)

  const [user, setUser] = useState({
    id: 0,
    programa: null,
    username: username,
    password: '',
    nombre: '',
    apellido: '',
    correo: '',
    rol: '',
    status: ''
  })

  useEffect(() => {
    if(response === null) {
      axios.get(`http://192.168.1.100:8080/usuario/get/username/${username}`)
        .then(res => {
          setUser(res.data)
          console.log(res.data)
          setResponse(true)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    }
  })

  return (
    <Grid container spacing={1} justifyContent='center'>
      <Grid item xs={12} md={4}>
        <Typography align='center'>
          <img src={profile} alt='' className={classes.img} />
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid item xs={4} md={12}>
          <Typography variant='h4' component='h2' className={classes.title} align='left'>
            Hola
          </Typography>
        </Grid>
        <Grid item xs={6} md={12}>
          <Typography style={{ fontWeight: 600 }} variant='h3' component='h2' className={classes.title} align='left'>
            {type === 'watch' ? 'soy ' + user.nombre : user.nombre},
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' component='p' className={classes.title} align='justify'>
            {type === 'watch' ? 'en esta ventana podrá ver y/o actualizar mis datos personales.' :
             'en esta ventana podrás ver y/o actualizar tus datos personales.'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} md={6}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1} md={1}><EmailIcon /></Grid>
                <Grid item xs={11} md={4}>
                  {
                    user.correo !== '' &&
                    <Typography variant='body1' component='p' className={classes.title} align='justify'>
                    {user.correo}
                  </Typography>
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1} md={1}><FingerprintIcon /></Grid>
                <Grid item xs={11} md={4}>
                  <Typography variant='body1' component='p' className={classes.title} align='justify'>
                    {type === 'watch' ? 
                      (user.rol === 0 ? 'Administrador' : 'Usuario') 
                      : rol === '0' ? 'Administrador' : 'Usuario'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  )
}
