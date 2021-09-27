import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ComboBox from '../components/ComboBox';

import RegExp from '../static/RegExp';

export default function UserDialog({ nameFunction, contentFunction, open, handleOpen, buttonFunctionName, buttonFunction, cbdata }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  //const [rol, setRol] = useState('');

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


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
                  id='user-username'
                  variant='filled'
                  label='Username'
                  defaultValue={''}
                  required
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={
                    username.length !== 0 && username.length < 4 ? true : false
                  }
                  helperText={
                    username.length !== 0 && username.length < 4 ? 'Debe ingresar un Nombre de Usuario válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-email'
                  variant='filled'
                  label='Correo'
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={
                    !RegExp.regLetters.test(email) &&
                      (email.length !== 0 && email.length < 4) ? true : false
                  }
                  helperText={
                    !RegExp.regLetters.test(email) &&
                      (email.length !== 0 && email.length < 4) ? 'Debe ingresar un Correo válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id='user-password'
                  variant='filled'
                  label='Password'
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={
                    !RegExp.regLetters.test(password) &&
                      (password.length !== 0 && password.length < 4) ? true : false
                  }
                  helperText={
                    !RegExp.regLetters.test(password) &&
                      (password.length !== 0 && password.length < 4) ? 'Debe ingresar una Contraseña válida' : ''
                  }
                />
              </Grid>

              
              <Grid item xs={12}>
                <TextField
                  id='user-name'
                  variant='filled'
                  label='Nombre'
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={
                    name.length !== 0 && name.length < 4 ? true : false
                  }
                  helperText={
                    name.length !== 0 && name.length < 4 ? 'Debe ingresar un Nombre válido' : ''
                  }
                />
              </Grid>

              
              <Grid item xs={12}>
                <TextField
                  id='user-lastname'
                  variant='filled'
                  label='Apellido'
                  required
                  fullWidth
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  error={
                    lastname.length !== 0 && lastname.length < 4 ? true : false
                  }
                  helperText={
                    lastname.length !== 0 && lastname.length < 4 ? 'Debe ingresar un Apellido válido' : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <ComboBox
                cbdata={cbdata} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                 control={<GreenCheckbox checked={state.statusCheck} onChange={handleChange} name="statusCheck" />}
                  label="Estatus"
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
                (username !== '' || username.length < 4) &&
                (email !== '' || email.length < 4) &&
                (password !== '' || password.length < 4) &&
                (name !== '' || name.length < 4) &&
                !RegExp.regLetters.test(lastname) &&
                (lastname !== '' || lastname.length < 4)
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