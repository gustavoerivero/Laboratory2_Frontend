import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PensumDialog from './PensumDialog';

export default function PensumCard({ id, name, code, date, description }) {

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
  });

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea className={classes.secondRoot}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {code}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {date}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Ver
        </Button>
        <Button size='small' color='secondary' onClick={handleOpen}>
          Editar
        </Button>
         <PensumDialog
            nameFunction='Modificar pensum'
            contentFunction='Ingrese la información del pensum.'
            buttonFunctionName='Guardar'
            handleOpen={handleOpen}
            open={open}
            pensumId={id}
            />
      </CardActions>
    </Card>
  );
}
