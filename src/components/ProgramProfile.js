import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Tooltip,
  Typography,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PensumCard from './PensumCard'
import PensumDialog from './PensumDialog'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  root: {
    minHeight: '70vh',
    maxWidth: 'auto',
  },
  list: {
    margin: '1em 2em .5em 2em',
  },
  title: {
    margin: 5,
  },
  container: {
    margin: 2.5,
  },
  subContent: {
    margin: '2em',
  },
})

export default function ProgramProfile({ id }) {

  const classes = useStyles()

  const [program, setProgram] = useState({
    id: id,
    codigo: '',
    nombre: '',
    status: ''
  })

  const [pensums, setPensums] = useState([])

  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (id && response === null) {
      axios.get(`http://192.168.1.100:8080/programa/get/${Number(id)}`)
        .then(res => {
          console.log(res.data)
          setProgram(res.data)
          setResponse(true)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    } else if (response === true && pensums.length === 0) {
      axios.get(`http://192.168.1.100:8080/pensum/get/programa/${program.codigo}`)
        .then(res => {
          console.log(res.data)
          setPensums(res.data)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        })
    }
  })

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h5' component='h2' align='center' className={classes.title}>
              Programa: {program.nombre}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Typography variant='body2' component='p' align='justify' className={classes.list}>
              <li>
                <b>Código del Programa: </b>{program.codigo}
              </li>
              <li>
                <b>Cantidad de Pensums: </b>{pensums.length}
              </li>
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={10}>
            <Typography gutterBottom variant='h6' component='h2' className={classes.title}>
              Lista de Pensum
            </Typography>
          </Grid>
          <Grid item xs={2} align='right'>
            <Tooltip title='Agregar pensum' placement='right-start'>
              <Fab size='small' color='secondary' aria-label='add' component={Button} onClick={handleOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <PensumDialog       
              id={null}
              programCode={program.codigo}
              type='add'
              handleOpen={handleOpen}
              open={open}
            />
          </Grid>
          {
            pensums.length > 0 ?
              pensums.map((element) => (
                <Grid item key={element.id}>
                  <PensumCard
                    id={element.id}
                    code={element.codigo}
                    date={element.fecha}
                    description={element.descripcion}
                    department={element.departamento.nombre}
                    programCode={program.codigo}
                  />
                </Grid>
              )) :
              <Grid item xs={12}>
                <Typography variant='caption' component='p' className={classes.subContent}>
                  Este programa aún no tiene pensum cargado.
                </Typography>
              </Grid>
          }
        </Grid>
      </CardContent>
    </Card>
  )
}