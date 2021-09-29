import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import ProgramDialog from './ProgramDialog'
import CustomizedSnackbar from './Snackbar'
import AlertDialog from './Dialog'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import colors from '../static/theme/Colors'

export default function ColorCard({ rol, id, title, content, haveColor, color, handleView }) {

  const theme = createTheme({
    overrides: {
      MuiButton: {
        text: {
          fontFamily: 'Nunito',
          textTransform: 'none'
        },
      },
    },
  })

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
      fontVariant: 'Nunito',
    },
    media: {
      height: 50,
      backgroundColor: colors[color],
    }
  })

  const classes = useStyles()

  const viewCard = (value) => {
    console.log(value)
    handleView(value)
  }
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
      axios.delete(`http://192.168.1.100:8080/programa/delete/${Number(id)}`)
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
    <Card className={classes.root} elevation={5}>
      <ThemeProvider theme={theme}>
        <CardActionArea className={classes.secondRoot} component={Button} onClick={(e) => viewCard(id)}>
          {
            haveColor &&
            <CardMedia
              className={classes.media}
              component={Typography}
            />
          }
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </ThemeProvider>
      <CardActions>
        {rol === '0' ?
          <>
            <Button size='small' color='secondary' variant='filled' onClick={handleConfirm}>
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
          </>
          : ''
        }
        <Button size='small' color='primary' onClick={(e) => (viewCard(id))}>
          Ver
        </Button>
        {rol === '0' ?
          <Button size='small' color='secondary' onClick={handleOpen}>
            Editar
          </Button>
          : ''
        }
        <ProgramDialog
          title='Modificar Programa'
          type='update'
          id={id}
          handleOpen={handleOpen}
          open={open}
        />
      </CardActions>
    </Card>
  )
}