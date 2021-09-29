import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,

} from '@material-ui/core';
import ProgramDialog from './ProgramDialog';
import DeleteDialog from '../components/DeleteDialog'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import colors from '../static/theme/Colors';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export default function ColorCard({ id, title, content, haveColor, color, handleView }) {

  const theme = createTheme({
    overrides: {
      MuiButton: {
        text: {
          fontFamily: 'Nunito',
          textTransform: 'none'
        },
      },
    },
  });

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
  });

  const classes = useStyles();

  const viewCard = (value) => {
    console.log(value);
    handleView(value);
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => {
    setOpenDel(!openDel);
}

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
        <Button edge="start" size='small' color='primary' onClick={(e) => (viewCard(id))}>
          Ver
        </Button>
        <Button edge="start" size='small' color='secondary' onClick={handleOpen}>
          Editar
        </Button>
        <IconButton edge="end" aria-label="delete" onClick={handleOpenDel}>
          <DeleteIcon />
        </IconButton>
        <ProgramDialog
          nameFunction='Modificar programa'
          contentFunction='Ingrese la información del programa.'
          buttonFunctionName='Guardar'
          handleOpen={handleOpen}
          open={open}
        />
        <DeleteDialog
          nameFunction='Eliminar Programa'
          contentFunction='¿Esta seguro que desea eliminar este Programa?'
          buttonFunctionName='Eliminar'
          handleOpen={handleOpenDel}
          open={openDel}
        />
      </CardActions>
    </Card>
  );
}
