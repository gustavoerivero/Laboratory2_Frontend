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

export default function UserDialog({ dialogType, nameFunction, contentFunction, open, handleOpen, user, mail, pass, names, lastnames, userType, program }) {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [type, setType] = useState('')
  const [codeProgram, setCodeProgram] = useState('')

  const [programs, setPrograms] = useState([])

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
    if (programs.length === 0) {
      axios.get(`http://192.168.1.100:8080/programa/get/codes`)
        .then(res => {
          console.log(res.data)
          setPrograms(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    if (update && dialogType === 'add' && type === '0') {
      axios.post(`http://192.168.1.100:8080/usuario/add`, {
        username: username,
        password: password,
        nombre: name,
        apellido: lastname,
        correo: email,
        rol: type
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
    } else if (update && dialogType === 'add' && type === '1') {
      axios.post(`http://192.168.1.100:8080/usuario/add/${codeProgram}`, {
        username: username,
        password: password,
        nombre: name,
        apellido: lastname,
        correo: email,
        rol: type
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
    } else if (update && dialogType === 'update' && type === '0') {
      axios.put(`http://192.168.1.100:8080/usuario/update/${username}`, {
        username: username,
        password: password,
        nombre: name,
        apellido: lastname,
        correo: email,
        rol: type
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
    } else if (update && dialogType === 'update' && type === '1') {
      axios.put(`http://192.168.1.100:8080/usuario/update/${username}/${codeProgram}`, {
        username: username,
        password: password,
        nombre: name,
        apellido: lastname,
        correo: email,
        rol: type
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
                  label='Nombre'
                  defaultValue={names}
                  required
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  error={
                    name.length !== 0 && name.length < 4 ? true : false
                  }
                  helperText={
                    name.length !== 0 && name.length < 4 ? 'Debe ingresar un nombre válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-lastname'
                  variant='filled'
                  label='Apellido'
                  defaultValue={lastnames}
                  required
                  fullWidth
                  onChange={(e) => setLastname(e.target.value)}
                  error={
                    lastname.length !== 0 && lastname.length < 4 ? true : false
                  }
                  helperText={
                    lastname.length !== 0 && lastname.length < 4 ? 'Debe ingresar un apellido válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl required variant='filled' fullWidth>
                  <InputLabel>Tipo de usuario</InputLabel>
                  <Select
                    native
                    value={type}
                    defaultValue={userType}
                    onChange={(e) => setType(e.target.value)}
                    label='Tipo de usuario'
                    inputProps={{
                      name: 'userType',
                      id: 'user-type'
                    }}
                  >
                    <option aria-label="none" value="" />
                    <option value={'0'}>Administrador</option>
                    <option value={'1'}>Usuario</option>
                  </Select>
                </FormControl>
              </Grid>

              {
                type !== '0' ?
                  <Grid item xs={12}>
                    <FormControl required variant='filled' fullWidth>
                      <InputLabel>Programa asociado</InputLabel>
                      <Select
                        native
                        value={codeProgram}
                        defaulValue={program}
                        onChange={(e) => setCodeProgram(e.target.value)}
                        label='Programa asociado'
                        inputProps={{
                          name: 'program',
                          id: 'program'
                        }}
                      >
                        <option aria-label="none" value="" />
                        {programs.length > 0 && programs.map((element, i) => (
                          <option key={i} value={element}>{element}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  : ''
              }

              <Grid item xs={12}>
                <TextField
                  id='user-email'
                  variant='filled'
                  label='Correo electrónico'
                  defaultValue={mail}
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  error={
                    !RegExp.regLetters.test(email) &&
                      (email.length !== 0 && email.length < 4) ? true : false
                  }
                  helperText={
                    !RegExp.regLetters.test(email) &&
                      (email.length !== 0 && email.length < 4) ? 'Debe ingresar un correo electrónico válido' : ''
                  }
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