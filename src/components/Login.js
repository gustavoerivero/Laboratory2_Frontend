import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import { login } from '../api/modules'
import CustomizedSnackbar from './Snackbar'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import UCLA from '../assets/img/UCLA.png'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    height: '60vh',
    width: '80%',
    margin: '0 auto',
  },
  button: {
    marginTop: '.5em',
  },
  title: {
    fontFamily: 'Nunito'
  },
  img: {
    width: '20%',
  },
}))

const Login = () => {

  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [res, setRes] = useState({
    OK: '',
    message: ''
  })

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleOpen()
  }

  const [user, setUser] = useState({
    id: 0,
    programa: null,
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    correo: '',
    rol: '',
    status: ''
  })

  useEffect(() => {
    if (username !== '' && password !== '' && open) {
      login(username, password)
        .then((response) => {
          setUser(response.data)
          if (user.status === 'A')
            res.OK = '1'
          else
            res.OK = '0'
        })
        .catch((error) => {
          console.log('Error: ', error)
          res.OK = '0'
        })
    }
    if (res.OK === '1') {
      if (user.rol === '0')
        window.location.href = `/Home/${user.username}/0`
      if (user.rol === '1')
        window.location.href = `/Home/${user.username}/1`
    }
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form autoComplete='off'>
      <Paper variant='outlined' className={classes.root} elevation={5}>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item align='center'>
            <img src={UCLA} alt='' className={classes.img} />
          </Grid>
          <Grid item align='center'>
            <Typography component='h2' variant='h4' className={classes.title}>
              ¡Bienvenido!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Usuario'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={showPassword ? "text" : "password"}
              variant='outlined'
              label='Contraseña'
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                password !== '' && password.length < 8 ? true : false
              }
              helperText={
                password !== '' && password.length < 8 ? 'Debe ingresar una contraseña válida' : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} align='center'>
            <Button
              variant='contained'
              color='primary'
              disabled={username.length > 0 && password.length >= 8 ? false : true}
              className={classes.button}
              onClick={handleOpen}
            >
              Iniciar sesión
            </Button>
            <CustomizedSnackbar
              type={res.OK === '1' ?
                'success' :
                res.OK === '' && username !== '' && password !== '' ? 'warning' : 'error'
              }
              message={res.OK === '1' ? '¡Bienvenido!' :
                res.OK === '' && username !== '' && password !== '' ? 'Cargando...' : 'El inicio de sesión no ha sido posible.'
              }
              open={open}
              handleClose={handleClose}
            />
          </Grid>
        </Grid>

      </Paper>
    </form>
  )
}

export default Login