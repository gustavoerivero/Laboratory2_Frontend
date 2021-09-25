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

import RegExp from '../static/RegExp';

export default function ProgramDialog({ nameFunction, contentFunction, open, handleOpen, buttonFunctionName, buttonFunction }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  return (
    <div>
      <form autoComplete='off'>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleOpen}
          aria-labelledby='add-program'
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
                  id='program-code'
                  variant='filled'
                  label='Código del programa'
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
                  id='program-name'
                  variant='filled'
                  label='Nombre del programa'
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={
                    !RegExp.regLetters.test(name) &&
                      (name.length !== 0 && name.length < 4) ? true : false
                  }
                  helperText={
                    !RegExp.regLetters.test(name) &&
                      (name.length !== 0 && name.length < 4) ? 'Debe ingresar un nombre válido' : ''
                  }
                />
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