import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import colors from '../static/theme/Colors';

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
        <Button size='small' color='primary' onClick={(e) => (viewCard(id))}>
          Ver
        </Button>
        <Button size='small' color='secondary'>
          Editar
        </Button>
      </CardActions>
    </Card>
  );
}
