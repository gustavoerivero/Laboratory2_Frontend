import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Grid,
  useMediaQuery,
  TextField,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import CustomizedSnackbar from './Snackbar'

import RegExp from '../static/RegExp'

export default function DepartamentDialog({ dialogType, nameFunction, contentFunction, open, handleOpen, code, name, desc }) {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [update, setUpdate] = useState(false)

  const [response, setResponse] = useState(null)

  const handleUpdate = () => {
    setUpdate(!update)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleOpen()
  }

  useEffect(() => {
    if (update && dialogType === 'add') {
      axios.post(`http://192.168.1.100:8080/departamentos/add`, {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion
      })
        .then(res => {
          console.log(res)
          setResponse(true)
          handleUpdate()
          handleOpen()
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
          handleUpdate()
          handleOpen()
        })
    } else if (update && dialogType === 'update') {
      axios.put(`http://192.168.1.100:8080/departamentos/update/${code}`, {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion
      })
        .then(res => {
          console.log(res)
          setResponse(true)
          handleUpdate()
          handleOpen()
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
          handleUpdate()
          handleOpen()
        })
    } 
  })

  return (
    <div>
      <form autoComplete='off'>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleOpen}
          aria-labelledby='add-program'
        >
          <DialogTitle id='responsive-title'>
            {nameFunction}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <DialogContentText>
                  {contentFunction}
                </DialogContentText>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-name'
                  variant='filled'
                  label='Código'
                  defaultValue={code}
                  required
                  fullWidth
                  onChange={(e) => setCodigo(e.target.value)}
                  error={
                    codigo.length !== 0 && codigo.length < 4 ? true : false
                  }
                  helperText={
                    codigo.length !== 0 && codigo.length < 4 ? 'Debe ingresar un código válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-lastname'
                  variant='filled'
                  label='Nombre'
                  defaultValue={name}
                  required
                  fullWidth
                  onChange={(e) => setNombre(e.target.value)}
                  error={
                    nombre.length !== 0 && nombre.length < 4 ? true : false
                  }
                  helperText={
                    nombre.length !== 0 && nombre.length < 4 ? 'Debe ingresar un nombre válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-email'
                  variant='filled'
                  label='Descripción'
                  defaultValue={desc}
                  required
                  fullWidth
                  onChange={(e) => setDescripcion(e.target.value)}
                  error={
                      (descripcion.length !== 0 && descripcion.length < 4) ? true : false
                  }
                  helperText={
                      (descripcion.length !== 0 && descripcion.length < 4) ? 'Debe ingresar una descripción válida' : ''
                  }c
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-username'
                  variant='filled'
                  label='Usuario'
                  defaultValue={user}
                  required
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                  error={
                    username.length !== 0 && username.length < 4 ? true : false
                  }
                  helperText={
                    username.length !== 0 && username.length < 4 ? 'Debe ingresar un Nombre de Usuario válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-password'
                  variant='filled'
                  label='Contraseña'
                  defaultValue={pass}
                  required
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  error={
                    (password.length !== 0 && password.length < 8) ? true : false
                  }
                  helperText={
                    (password.length !== 0 && password.length < 8) ? 'Debe ingresar una contraseña válida' : ''
                  }
                />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleOpen} variant='text' color='secondary'>
              Cancelar
            </Button>
            <Button
              onClick={handleUpdate}
              variant='contained'
              color='primary'
              autoFocus
              disabled={
                name.length < 4 || lastname.length < 4 || type === '' ||
                (type === '1' && codeProgram === '') || email.length < 4 || RegExp.regLetters.test(email)
                || username.length < 4 || password.length < 8
              }
            >
              {type === 'add' ? 'Registrar' : 'Guardar'}
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
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}