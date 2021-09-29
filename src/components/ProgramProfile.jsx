import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Tooltip,
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PensumCard from './PensumCard';
import PensumDialog from './PensumDialog';

import AddIcon from '@material-ui/icons/Add';

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
});

export default function ProgramProfile({ id }) {

  const classes = useStyles();

  const pensum = [
    {
      id: '0',
      codigo: 'PROD250921',
      name: 'Pensum Producción 2021-2',
      desc: 'Pensum del programa de Ing. Producción, Lapso 2021-2',
      date: '2021-09-25',
      cod_programa: '1',
      pdf: 'pensum'
    },
    {
      id: '1',
      codigo: 'INF250921',
      name: 'Pensum Informática 2021-2',
      desc: 'Pensum del programa de Ing. Informática, Lapso 2021-2',
      date: '2021-09-25',
      cod_programa: '0',
      pdf: 'pensum'
    },
    {
      id: '2',
      codigo: 'TEL290921',
      name: 'Pensum Telematica 2021-2',
      desc: 'Pensum del programa de Ing. Telematica, Lapso 2021-2',
      date: '2021-09-29',
      cod_programa: '2',
      pdf: 'pensum'
    },
    
  ]

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h5' component='h2' align='center' className={classes.title}>
              Programa: {id}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Typography variant='caption' component='p' align='justify' className={classes.list}>
              <li>
                <b>Nombre del Programa: </b>
              </li>
              <li>
                <b>Breve descripción del programa: </b>
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
            nameFunction='Agregar pensum'
            contentFunction='Ingrese la información del pensum a agregar. 
            El botón de Agregar no se habilitará hasta que ingrese la información requerida.'
            buttonFunctionName='Agregar'
            handleOpen={handleOpen}
            open={open}
            />
          </Grid>
          {
           pensum.length > 0 ?
              pensum.map((element) => (
                <Grid item xs={12} md={6} key={element.id}>
                  <PensumCard
                    id={element.id}
                    name={element.name}
                    code={element.code}
                    date={element.date}
                    description={element.desc}
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
  );
}
