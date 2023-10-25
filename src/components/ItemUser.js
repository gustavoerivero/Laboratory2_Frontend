import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Tooltip,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import AlertDialog from './Dialog'
import CustomizedSnackbar from './Snackbar'
import UserDialog from './UserDialog'

export default function ItemUser({ key, element }) {

  const [open, setOpen] = useState(false)

  const { username, rol } = useParams()

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
      axios.delete(`http://localhost:8080/usuario/delete/${Number(element.id)}`)
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

  return (
    <ListItem id={key}>
      <ListItemText
        primary={element.nombre + " " + element.apellido + " (" + element.username + ")"}
        secondary={
          " Correo: " + element.correo
          + " | " + (element.rol === '0' ? 'Administrador' : 'Usuario')}
      />
      <ListItemSecondaryAction >
        <Tooltip title='Ver usuario' placement='left-start'>
          <IconButton edge='start' aria-label='See' component={Button} href={`/User/${element.username}/${username}/${rol}`}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Modificar usuario' placement='left-start'>
          <IconButton edge='middle' aria-label='Edit' onClick={handleOpen} >
            <CreateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar usuario' placement='left-start'>
          <IconButton edge='end' aria-label='delete' onClick={handleConfirm}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <UserDialog
          nameFunction='Editar Usuario'
          contentFunction='Ingrese la información del Usuario que desea modificar. 
            El botón de Guardar no se habilitará hasta que ingrese la información requerida.'
          buttonFunctionName='Guardar'
          dialogType='update'
          handleOpen={handleOpen}
          open={open}
          itemData={element}
          user={element.username}
          mail={element.correo}
          pass={element.password}
          names={element.nombre}
          lastnames={element.apellido}
          rol={element.rol}
          programa={element.rol === '0' ? null : element.programa.codigo}
        />
        <AlertDialog
          title='Eliminar usuario'
          content='¿Está seguro que desea eliminar a este usuario?'
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          handleConfirm={handleDelete}
        />
        <CustomizedSnackbar
          type={response ? 'success' : !response ? 'warning' : 'error'}
          message={response ? 'El usuario se ha eliminado con éxito' : !response ? 'Cargando...' : 'No se ha podido eliminar el usuario.'}
          open={response}
          handleClose={handleClose}
        />
      </ListItemSecondaryAction>
      <Divider />
    </ListItem>
  )
}
