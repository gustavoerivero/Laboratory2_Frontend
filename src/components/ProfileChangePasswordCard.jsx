import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles({
  root: {
    maxHeight: 340,
    padding: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ChangePasswordCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [values1, setValues1] = React.useState({
    showPassword: false,
  });
  const [values2, setValues2] = React.useState({
    showPassword: false,
  });
  const [values3, setValues3] = React.useState({
    showPassword: false,
  });

  const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
  };
  const handleChange2 = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
  };
  const handleChange3 = (prop) => (event) => {
    setValues3({ ...values3, [prop]: event.target.value });
  };

  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showPassword: !values1.showPassword });
  };
  const handleClickShowPassword2 = () => {
    setValues2({ ...values2, showPassword: !values2.showPassword });
  };
  const handleClickShowPassword3 = () => {
    setValues3({ ...values3, showPassword: !values3.showPassword });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword3 = (event) => {
    event.preventDefault();
  };

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Cambio de contraseña
        </Typography>

        <TextField
          required
          id="password"
          label="Contraseña anterior"
          fullWidth
          margin="normal"
          type="password"
          type={values1.showPassword ? 'text' : 'password'}
          value={values1.password}
          onChange={handleChange1('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                >
                  {values1.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />

        <TextField
          required
          id="password"
          label="Nueva Contraseña"
          fullWidth
          margin="normal"
          type="password"
          type={values2.showPassword ? 'text' : 'password'}
          value={values2.password}
          onChange={handleChange2('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                >
                  {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />

        <TextField
          required
          id="password"
          label="Repetir Nueva Contraseña"
          fullWidth
          margin="normal"
          type="password"
          type={values3.showPassword ? 'text' : 'password'}
          value={values3.password}
          onChange={handleChange3('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword3}
                  onMouseDown={handleMouseDownPassword3}
                >
                  {values3.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />

      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained" startIcon={<SaveIcon />}>Cambiar</Button>
      </CardActions>
    </Card>
  );
}