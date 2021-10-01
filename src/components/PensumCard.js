import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PensumDialog from './PensumDialog'
import CustomizedSnackbar from './Snackbar'
import ViewPensumDialog from './ViewPensum'
import AlertDialog from './Dialog'

export default function PensumCard({ id, code, date, description, programCode, department }) {

  const useStyles = makeStyles({
    root: {
      maxHeight: 250,
      minWidth: 250,
      width: 275,
      maxWidth: 300,
    },
    secondRoot: {
      padding: 0,
      margin: 0,
    },
  })

  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  const [deleteButton, setDeleteButton] = useState(false)

  const handleDelete = () => {
    setDeleteButton(!deleteButton)
  }

  const [response, setResponse] = useState(null)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleOpen()
  }

  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const handleConfirm = () => {
    setDeleteConfirm(true)
  }

  useEffect(() => {
    if (deleteButton) {
      axios.delete(`http://192.168.1.100:8080/pensum/delete/${Number(id)}`)
        .then(res => {
          console.log(res.data)
          handleDelete()
          setResponse(true)
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    }
  })
  
  const [openView, setOpenView] = useState(false);
  
  const handleOpenView = () => {
    setOpenView(!openView)
  }

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea className={classes.secondRoot}>
        <CardContent>
          <Typography variant='h5' color='textSecondary' component='p'>
            {code}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {date}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {department}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='secondary' onClick={handleConfirm}>
          Eliminar
        </Button>
        <AlertDialog
          title='Eliminar programa'
          content='¿Está seguro que desea eliminar este programa?'
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          handleConfirm={handleDelete}
        />
        <CustomizedSnackbar
          type={response ? 'success' : !response ? 'warning' : 'error'}
          message={response ? 'El programa se ha eliminado con éxito' : !response ? 'Cargando...' : 'No se ha podido eliminar el programa'}
          open={response}
          handleClose={handleClose}
        />
        <Button size='small' color='primary' onClick={handleOpenView}>
          Ver
        </Button>
        <ViewPensumDialog
          descFunction={description}
          fechaFunction={date}
          codigoFunction={code}
          buttonFunctionName='PDF'
          handleOpen={handleOpenView}
          open={openView}
        />
        <Button size='small' color='secondary' onClick={handleOpen}>
          Editar
        </Button>
        <PensumDialog
          id={id}
          programCode={programCode}
          type='update'
          handleOpen={handleOpen}
          open={open}
        />
      </CardActions>
    </Card>
  )
}