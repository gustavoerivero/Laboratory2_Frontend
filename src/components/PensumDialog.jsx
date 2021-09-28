import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  useMediaQuery,
  TextField,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import RegExp from '../static/RegExp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function PensumDialog({ nameFunction, contentFunction, open, handleOpen, buttonFunctionName, pensumId }) {

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState('');
  const [codProgram, setCodProgram] = useState('');

  return (
    <div>
      <form autoComplete='off'>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleOpen}
          aria-labelledby='pensum-dialog'
        >
          <DialogTitle id='responsive-title'>
            {nameFunction}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <DialogContentText>
                  {contentFunction}
                </DialogContentText>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='pensum-code'
                  variant='filled'
                  label='Código del pensum'
                  required
                  fullWidth
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  error={
                    code.length !== 0 && code.length < 4 ? true : false
                  }
                  helperText={
                    code.length !== 0 && code.length < 4 ? 'Debe ingresar un código válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='pensum-description'
                  variant='filled'
                  label='Descripción del pensum'
                  required
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={
                    !RegExp.regLetters.test(description) &&
                      (name.length !== 0 && name.length < 4) ? true : false
                  }
                  helperText={
                    !RegExp.regLetters.test(description) &&
                      (name.length !== 0 && name.length < 4) ? 'Debe ingresar una descripción válida' : ''
                  }
                />
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id='pensum-filename'
                  variant='outlined'
                  disabled
                  fullWidth
                  value={pdf}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" size="large">
                    Upload
                  </Button>
                </label>
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleOpen} variant='text' color='secondary'>
              Cancelar
            </Button>
            <Button
              onClick={handleOpen}
              variant='contained'
              color='primary'
              autoFocus
              disabled={
                (code !== '' || code.length < 4) &&
                !RegExp.regLetters.test(name) &&
                (name !== '' || name.length < 4)
              }
            >
              {buttonFunctionName}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}