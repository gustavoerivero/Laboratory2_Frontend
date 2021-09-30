import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  useMediaQuery,
  TextField,
} from '@material-ui/core';
import CustomizedSnackbar from './Snackbar'
import { useTheme } from '@material-ui/core/styles';

import RegExp from '../static/RegExp';

export default function ProgramDialog({ id, open, handleOpen, type, title }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

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
    if (update && type === 'add') {
      axios.post(`http://192.168.1.100:8080/programa/add`, {
        codigo: code,
        nombre: name
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
    } else if (update && type === 'update' && id !== null) {
      axios.put(`http://192.168.1.100:8080/programa/update/id/${Number(id)}`, {
        codigo: code,
        nombre: name,
        status: 'A'
      })
        .then(res => {
          setResponse(true)
          console.log(res)
          handleUpdate()
          handleOpen()
          window.location.href = window.location.href
        })
        .catch(error => {
          setResponse(false)
          console.log(error)
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
            {title}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <DialogContentText>
                  Ingrese la información del programa
                </DialogContentText>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='program-code'
                  variant='filled'
                  label='Código del programa'
                  required
                  fullWidth
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  error={
                    code.length !== 0 && code.length < 4 ? true : false
                  }
                  helperText={
                    code.length !== 0 && code.length < 4 ? 'Debe ingresar un código válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='program-name'
                  variant='filled'
                  label='Nombre del programa'
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={
                      (name.length !== 0 && name.length < 4) ? true : false
                  }
                  helperText={
                      (name.length !== 0 && name.length < 4) ? 'Debe ingresar un nombre válido' : ''
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
                !RegExp.regLetters.test(code) && 
                !RegExp.regLetters.test(name) && 
                code.length < 4 && name.length < 4
              }
            >
              Guardar
            </Button>
            {
              response !== null ?
                <CustomizedSnackbar
                  type={response ? 'success' : !response ? 'error' : 'warning'}
                  message={response ? 'El programa se ha guardado con éxito' : !response ? 'No se ha podido guardar el programa' : 'Cargando...'}
                  open={response}
                  handleClose={handleClose}
                />
                : ''
            }
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}