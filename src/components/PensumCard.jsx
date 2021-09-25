import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function PensumCard({ id, title, content }) {

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

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea className={classes.secondRoot}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Ver
        </Button>
        <Button size='small' color='secondary'>
          Editar
        </Button>
      </CardActions>
    </Card>
  );
}
