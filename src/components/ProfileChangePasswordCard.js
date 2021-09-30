import React, { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import CustomizedSnackbar from './Snackbar'

const useStyles = makeStyles({
  root: {
    maxHeight: 350,
    padding: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function ChangePasswordCard({ user }) {

  const classes = useStyles()

  const [values1, setValues1] = useState({
    showPassword: false,
  })
  const [values2, setValues2] = useState({
    showPassword: false,
  })
  const [values3, setValues3] = useState({
    showPassword: false,
  })

  const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value })
  }
  const handleChange2 = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value })
  }
  const handleChange3 = (prop) => (event) => {
    setValues3({ ...values3, [prop]: event.target.value })
  }

  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showPassword: !values1.showPassword })
  }
  const handleClickShowPassword2 = () => {
    setValues2({ ...values2, showPassword: !values2.showPassword })
  }
  const handleClickShowPassword3 = () => {
    setValues3({ ...values3, showPassword: !values3.showPassword })
  }

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault()
  }
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault()
  }
  const handleMouseDownPassword3 = (event) => {
    event.preventDefault()
  }

  
  const [update, setUpdate] = useState(false)

  const handleUpdate = () => {
    setUpdate(!update)
  }

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

  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (update && response) {
      axios.put(`http://192.168.1.100:8080/usuario/update/${user.username}` +
        (user.rol === '0' ? '' : `/${user.programa.codigo}`), {
        username: user.username,
        password: values3.password,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
        status: 'A'
      })
        .then(res => {
          console.log(res.data)
          handleUpdate()
          setResponse(true)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    }
  })


  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Cambio de contraseña
        </Typography>

        <TextField
          required
          id="password"
          label="Contraseña anterior"
          fullWidth
          margin="normal"
          type="password"
          type={values1.showPassword ? 'text' : 'password'}
          value={values1.password}
          onChange={handleChange1('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                >
                  {values1.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />

        <TextField
          required
          id="password"
          label="Nueva Contraseña"
          fullWidth
          margin="normal"
          type="password"
          type={values2.showPassword ? 'text' : 'password'}
          value={values2.password}
          onChange={handleChange2('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                >
                  {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />

        <TextField
          required
          id="password"
          label="Repetir Nueva Contraseña"
          fullWidth
          margin="normal"
          type="password"
          type={values3.showPassword ? 'text' : 'password'}
          value={values3.password}
          onChange={handleChange3('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword3}
                  onMouseDown={handleMouseDownPassword3}
                >
                  {values3.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />

      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          variant="contained" 
          startIcon={<SaveIcon />}
          onClick={handleOpen}
          disabled={
            user.password !== values1.password ||
            values2.password !== values3.password ||
            user.password === values2.password ||
            user.password.length === 0 ||
            values1.password.length === 0 ||
            values2.password.length === 0 ||
            values3.password.length === 0
          }
        >
          Cambiar
        </Button>
        {
          response !== null ?
            <CustomizedSnackbar
              type={response ? 'success' : !response ? 'error' : 'warning'}
              message={response ? 'El usuario se ha registrado con éxito' : !response ? 'No se ha podido modificar el usuario' : 'Cargando...'}
              open={response}
              handleClose={handleClose}
            />
            : ''
        }
      </CardActions>
    </Card>
  )
}