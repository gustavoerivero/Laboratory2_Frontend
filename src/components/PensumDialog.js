import React, { useState, useEffect } from 'react'
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
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import CustomizedSnackbar from './Snackbar'

export default function PensumDialog({ id, programCode, type, open, handleOpen }) {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [pdf, setPdf] = useState(null)

  const uploadFiles = (e) => {
    setPdf(e)
  }

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
      axios.post(`http://192.168.1.100:8080/pensum/add/${programCode}`, {
        codigo: code,
        descripcion: description,
        fecha: new Date()
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
    } else if (update && type === 'update') {
      axios.put(`http://192.168.1.100:8080/pensum/update/id/${Number(id)}/${programCode}`, {
        codigo: code,
        descripcion: description,
        fecha: new Date()
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
          aria-labelledby='pensum-dialog'
        >
          <DialogTitle id='responsive-title'>
            {type === 'add' ? 'Agregar pensum' : 'Modificar pensum'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <DialogContentText>
                  {type === 'add' ? 'Ingrese los datos del nuevo pensum.' : 'Ingrese los datos que desea actualizar.'}
                </DialogContentText>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='pensum-code'
                  variant='filled'
                  label='Código del pensum'
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
                  id='pensum-name'
                  variant='filled'
                  label='Descripción del pensum'
                  required
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={
                      (description.length !== 0 && description.length < 4) ? true : false
                  }
                  helperText={
                      (description.length !== 0 && description.length < 4) ? 'Debe ingresar una descripción válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={9}>
                <input
                  accept="application/pdf"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                />
              </Grid>

              <Grid item xs={3} alignItems='center' justifyContent='center'>
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" size="large">
                    Subir
                  </Button>
                </label>
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
                (code === '' || code.length < 4) ||
                (description === ''  || description.length < 4)
              }
            >
              {type === 'add' ? 'Registrar' : 'Guardar'}
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
  )
}