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
  InputLabel,
  Select,
  FormControl
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import CustomizedSnackbar from './Snackbar'

export default function PensumDialog({ id, programCode, type, open, handleOpen, department }) {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [codeDepartment, setCodeDepartment] = useState('')

  const [departments, setDepartments] = useState([])

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
    if (departments.length === 0) {
      axios.get(`http://192.168.1.100:8080/departamentos/get/codes`)
        .then(res => {
          console.log(res.data)
          setDepartments(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    if (update && type === 'add') {
      axios.post(`http://192.168.1.100:8080/pensum/add/${programCode}/${codeDepartment}`, {
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
      axios.put(`http://192.168.1.100:8080/pensum/update/id/${Number(id)}/${programCode}/${codeDepartment}`, {
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

  const [files, setFiles] = useState(null)

  const uploadFiles = e => {
    setFiles(e)
  }

  const [upload, setUpload] = useState(null)
  
  const handleUploadClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setUpload(null)
  }

  const insertFiles = async () => {
    
    const f = new FormData()

    f.append('file', files[0])

    await axios.post(`http://192.168.1.100:8080/file/upload/${code}`, f, 
      { headers: {'Content-Type': 'multipart/form-data'} })
      .then(res => {
        console.log(res.data)
        setUpload(true)
      })
      .catch(error => {
        console.log(error)
        setUpload(false)
      })
  }

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

              <Grid item xs={12}>
                    <FormControl required variant='filled' fullWidth>
                      <InputLabel>Departamento asociado</InputLabel>
                      <Select
                        native
                        value={codeDepartment}
                        defaulValue={department}
                        onChange={(e) => setCodeDepartment(e.target.value)}
                        label='Departamento asociado'
                        inputProps={{
                          name: 'department',
                          id: 'department'
                        }}
                      >
                        <option aria-label="none" value="" />
                        {departments.length > 0 && departments.map((element, i) => (
                          <option key={i} value={element}>{element}</option>
                        ))}
                      </Select>
                    </FormControl>
              </Grid>
              
              <Grid item xs={9}>
                <TextField 
                  type='file'
                  name='files'  
                  fullWidth
                  onChange={(e) => uploadFiles(e.target.files)}                
                />
              </Grid>

              <Grid item xs={3}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={() => insertFiles()}
                  disabled={files === null || code === ''}
                >
                  Subir
                </Button>
              </Grid>

              {
                upload !== null ?
                <CustomizedSnackbar
                  type={upload ? 'success' : !upload ? 'error' : 'warning'}
                  message={upload ? 'El PDF se ha registrado con éxito' : !upload ? 'No se ha podido guardar el PDF.' : 'Cargando...'}
                  open={upload}
                  handleClose={handleUploadClose}
                />
                : ''
            }

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
                ((code === '' && code.length < 4) ||
                (description === ''  && description.length < 4)) || files === null
              }
            >
              {type === 'add' ? 'Registrar' : 'Guardar'}
            </Button>
            {
              response !== null ?
                <CustomizedSnackbar
                  type={response ? 'success' : !response ? 'error' : 'warning'}
                  message={response ? 'El pensum se ha guardado con éxito' : !response ? 'No se ha podido guardar el pensum.' : 'Cargando...'}
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