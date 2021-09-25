import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import UCLA from '../assets/img/UCLA.png';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    height: '60vh',
    width: '80%', 
    margin: '0 auto',
  },  
  button: {
    marginTop: '.5em',
  },
  title: {
    fontFamily: 'Nunito'
  },
  img: {
    width: '20%',
  },
}));

const Login = () => {

  const classes = useStyles();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <form autoComplete='off'>
      <Paper variant='outlined' className={classes.root} elevation={5}>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item align='center'>
            <img src={UCLA} alt='' className={classes.img} />
          </Grid>
          <Grid item align='center'>
            <Typography component='h2' variant='h4' className={classes.title}>
              ¡Bienvenido!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Usuario'
              fullWidth
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={showPassword ? "text" : "password"}
              variant='outlined'
              label='Contraseña'
              fullWidth
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              error={
                pass.length !== 0 && pass.length < 8 ? true : false
              }
              helperText={
                pass.length !== 0 && pass.length < 8 ? 'Debe ingresar una contraseña válida' : ''
              }
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              disabled={user.length > 0 && pass.length >= 8 ? false : true}
              component={Link}
              href='/'
              to={{
                pathname: '/Home',
              }}
              color='primary'
              className={classes.button}
            >
              Iniciar sesión
            </Button>
          </Grid>
        </Grid>
        
      </Paper>
    </form>
  );
}

export default Login;