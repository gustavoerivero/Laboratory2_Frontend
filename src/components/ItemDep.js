import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Tooltip,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import AlertDialog from './Dialog'
import CustomizedSnackbar from './Snackbar'
import DepartmentDialog from './DepartmentDialog'
import ViewDepartment from './ViewDepartment'

export default function ItemDep({ key, element }) {

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const [see, setSee] = useState(false)

  const handleSee = () => {
    setSee(!see)
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
      axios.delete(`http://localhost:8080/departamentos/delete/${Number(element.id)}`)
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
        primary={element.codigo + " / " + element.nombre }
        secondary={'Descripción: ' + element.descripcion}
      />
      <ListItemSecondaryAction >           
        <Tooltip title='Ver departamento' placement='left-start'>
          <IconButton edge='start' aria-label='Edit' onClick={handleSee} >
            <FindInPageIcon />
          </IconButton>
        </Tooltip>     
        <Tooltip title='Modificar departamento' placement='left-start'>
          <IconButton edge='middle' aria-label='Edit' onClick={handleOpen} >
            <CreateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar departamento' placement='left-start'>
          <IconButton edge='end' aria-label='delete' onClick={handleConfirm}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <ViewDepartment 
          code={element.codigo}
          name={element.nombre}
          desc={element.descripcion}
          open={see}
          handleClose={handleSee}
        />
        <DepartmentDialog
          nameFunction='Editar Departamento'
          contentFunction='Ingrese la información del Departamento que desea modificar. 
            El botón de Guardar no se habilitará hasta que ingrese la información requerida.'
          buttonFunctionName='Guardar'
          dialogType='update'
          handleOpen={handleOpen}
          open={open}
          itemData={element}
          id={element.id}
          code={element.codigo}
          name={element.nombre}
          desc={element.descripcion}
        />
        <AlertDialog
          title='Eliminar departamento'
          content='¿Está seguro que desea eliminar a este departamento?'
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          handleConfirm={handleDelete}
        />
        <CustomizedSnackbar
          type={response ? 'success' : !response ? 'warning' : 'error'}
          message={response ? 'El departamento se ha eliminado con éxito' : !response ? 'Cargando...' : 'No se ha podido eliminar el departamento.'}
          open={response}
          handleClose={handleClose}
        />
      </ListItemSecondaryAction>
      <Divider />
    </ListItem>
  )
}
