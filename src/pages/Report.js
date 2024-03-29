import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  CssBaseline,
  Grid,
  Button,
  Divider,
  Typography,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PensumCard from '../components/PensumCard'

import girl_laptop from '../assets/img/girl_laptop.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '70vh',
    margin: 70,
    padding: 25
  },
  img: {
    [theme.breakpoints.up('sm')]: {
      width: '20%',
    },
    [theme.breakpoints.down('md')]: {
      width: '30%',
    },
  },
}))

export default function Report() {

  const classes = useStyles()

  const { username, rol } = useParams()

  const [pensums, setPensums] = useState([])

  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (response === null) {
      axios.get(`http://localhost:8080/pensum/get`)
        .then(res => {
          console.log(res.data)
          setPensums(res.data)
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
      <CssBaseline />
      <NavBar auth={true} admin={rol === '0' ? true : false} />
      <Paper elevation={3} className={classes.root} >
        <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h3' component='h2' align='center'>
              Reporte
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={6} align='center' justifyContent='center'>
            <img src={girl_laptop} alt='' className={classes.img} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant='h6' component='p'>
              <b>Cantidad de pensums registrados:</b> {pensums.length}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
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
                    programCode={element.programa.codigo}
                  />
                </Grid>
              )) :
              <Grid item xs={12}>
                <Typography variant='caption' component='p' className={classes.subContent}>
                  No hay pensums registrados en el sistema.
                </Typography>
              </Grid>
          }
        </Grid>
      </Paper>
      <Footer />
    </div>
  )
}
