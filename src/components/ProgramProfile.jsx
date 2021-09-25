import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PensumCard from './PensumCard';

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
      name: 'Cálculo I',
      desc: 'Materia filtro',
      pdf: 'pensum'
    },
    {
      id: '1',
      name: 'Cálculo II',
      desc: 'Materia filtro',
      pdf: 'pensum'
    },
    {
      id: '2',
      name: 'Cálculo III',
      desc: 'Materia filtro',
      pdf: 'pensum'
    },
    {
      id: '3',
      name: 'Cálculo IV',
      desc: 'Materia filtro',
      pdf: 'pensum'
    }
  ]

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
                <b>Breve descripción del programa: </b>
              </li>
              <li>
                <b>Cantidad de pensum: </b>
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
              <Fab size='small' color='secondary' aria-label='add'>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
          {
            pensum.length > 0 ?
              pensum.map((element) => (
                <Grid item key={element.id}>
                  <PensumCard
                    id={element.id}
                    title={element.name}
                    content={element.desc}
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
