import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  ListItem,
  ListItemText,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    margin: '0 25 0 25'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ViewDepartment({ code, name, desc, handleClose, open }) {

  const classes = useStyles()

  const [pensum, setPensum] = useState([])

  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (response === null) {
      axios.get(`http://192.168.1.100:8080/pensum/get/departamento/${code}`)
        .then(res => {
          console.log(res.data)
          setPensum(res.data)
          setResponse(true)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    }
  })

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {name}
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Typography variant='h6' component='h4' align='center'>
            Datos del departamento
          </Typography>
          <Divider />
          <div className={classes.container}>
            <ListItem>
              <ListItemText primary='Código' secondary={code} />
              <ListItemText primary='Nombre' secondary={name} />
              <ListItemText primary='Descripción' secondary={desc} />
            </ListItem>
          </div>
          <Divider />
          <Typography variant='h6' component='h4' align='center'>
            Pensum asociados al departamento
          </Typography>
          <Divider />
          {
            pensum.length > 0 &&
            pensum.map((element, i) => (
              <>
                <ListItem button key={i}>
                  <ListItemText primary='Código' secondary={element.codigo} />
                  <ListItemText primary='Descripción' secondary={element.descripcion} />
                  <ListItemText primary='Fecha' secondary={element.fecha} />
                  <ListItemText primary='Programa' secondary={element.programa.nombre} />
                  <ListItemText primary='Departamento' secondary={element.departamento.nombre} />
                </ListItem>
                <Divider />
              </>
            ))
          }
        </List>
      </Dialog>
    </div>
  )
}
