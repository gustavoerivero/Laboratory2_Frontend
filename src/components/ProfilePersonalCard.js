import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'

import CustomizedSnackbar from './Snackbar'

const useStyles = makeStyles({
  root: {
    height: 350,
    padding: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function ProfileCard({ user }) {

  const classes = useStyles()

  const [name, setName] = useState(user.nombre)
  const [lastName, setLastName] = useState(user.apellido)

  const [update, setUpdate] = useState(false)

  const handleUpdate = () => {
    setUpdate(!update)
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleOpen()
  }

  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (update && response) {
      axios.put(`http://192.168.1.100:8080/usuario/update/${user.username}` +
        (user.rol === '0' ? '' : `/${user.programa.codigo}`), {
        username: user.username,
        password: user.password,
        nombre: name,
        apellido: lastName,
        correo: user.correo,
        rol: user.rol,
        status: 'A'
      })
        .then(res => {
          console.log(res.data)
          handleUpdate()
          setResponse(true)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    }
  })

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Información Personal
        </Typography>
        {
          user.nombre !== '' &&
          <TextField
            required
            id="name"
            label="Nombre"
            defaultValue={user.nombre}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        }
        {
          user.apellido !== '' &&
          <TextField
            required
            id="lastname"
            label="Apellido"
            defaultValue={user.apellido}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
        }
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={
            (name !== '' && name.length < 4) ||
            (lastName !== '' && lastName.length < 4)
          }
          onClick={handleOpen}
        >
          Guardar
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
      </CardActions>
    </Card>
  )
}