import React, { useState } from 'react'
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core'
import CustomizedSnackbar from './Snackbar'
import DescriptionIcon from '@material-ui/icons/Description'

export default function ViewPensumDialog({  descFunction, fechaFunction, codigoFunction, programaFunction, departmentFunction, open, handleOpen, buttonFunctionName }) {
  
  const [response, setResponse] = useState(null)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleOpen()
  }

  const downloadFile = () => {
    axios({
      url: `http://localhost:8080/file/load/${codigoFunction}.pdf`,
      method: 'GET',
      responseType: 'blob',
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${codigoFunction}.pdf`)
        document.body.appendChild(link)
        link.click()
        console.log(res)
        setResponse(true)
      })
      .catch(error => {
        console.log(error)
        setResponse(false)
      })
  }

  return (
    <div>
      <form autoComplete='off'>
        <Dialog
          xs={10}
          open={open}
          onClose={handleOpen}
          aria-labelledby='add-program'
        >
          <DialogTitle id='responsive-title'>
            Visualización de pensum
          </DialogTitle>
          <DialogContent>

            <Grid item xs={12}>
              <DialogContentText>
                <Grid item xs={12}>
                  {descFunction}
                </Grid>
                <Grid item xs={12}>
                  {fechaFunction}
                </Grid>
                <Grid item xs={12}>
                  {codigoFunction}
                </Grid>
                <Grid item xs={12}>
                  {departmentFunction}
                </Grid>
                <Grid item xs={12}>
                  {programaFunction}
                </Grid>
              </DialogContentText>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button 
              size="small" 
              color="primary" 
              variant="contained" 
              startIcon={<DescriptionIcon />}
              onClick={downloadFile}
            >
              {buttonFunctionName}
            </Button>
            <Button autoFocus onClick={handleOpen} variant='text' color='secondary'>
              Cerrar
            </Button>
          </DialogActions>          
          {
              response !== null ?
                <CustomizedSnackbar
                  type={response ? 'success' : !response ? 'error' : 'warning'}
                  message={response ? 'El pensum se mostrará en unos momentos' : !response ? 'No se ha podido acceder el pensum.' : 'Cargando...'}
                  open={response}
                  handleClose={handleClose}
                />
                : ''
            }

        </Dialog>
      </form>
    </div>
  )
}