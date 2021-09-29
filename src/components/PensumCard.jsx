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
import DeleteDialog from '../components/DeleteDialog'
import ViewPensumDialog from '../components/ViewPensum'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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

  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => {
    setOpenDel(!openDel);
}

const [openView, setOpenView] = useState(false);
const handleOpenView = () => {
  setOpenView(!openView);
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
        <Button size='small' color='primary' onClick={handleOpenView}>
          Ver
        </Button>
        <Button size='small' color='secondary' onClick={handleOpen}>
          Editar
        </Button>
        <IconButton edge="end" aria-label="delete" onClick={handleOpenDel}>
          <DeleteIcon />
        </IconButton>
        <ViewPensumDialog
        nameFunction={name}
        descFunction={description}
        fechaFunction={date}
        codigoFunction={code}
        buttonFunctionName='PDF'
        handleOpen={handleOpenView}
        open={openView}
        />
         <PensumDialog
            nameFunction='Modificar pensum'
            contentFunction='Ingrese la información del pensum.'
            buttonFunctionName='Guardar'
            handleOpen={handleOpen}
            open={open}
            pensumId={id}
            />
            <DeleteDialog
          nameFunction='Eliminar Pensum'
          contentFunction='¿Esta seguro que desea eliminar el pensum seleccionado?'
          buttonFunctionName='Eliminar'
          handleOpen={handleOpenDel}
          open={openDel}
        />
      </CardActions>
    </Card>
  );
}
