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
    maxHeight: 270,
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

export default function AccountCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Información de la Cuenta
        </Typography>
        <TextField
          disabled
          id="username"
          value={"gustriver"}
          fullWidth
          margin="normal"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Usuario: </InputAdornment>,
          }}
        />
        <TextField
          disabled
          id="email"
          value={"rgustavo@gmail.com"}
          fullWidth
          margin="normal"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Correo: </InputAdornment>,
          }}
        />
        <TextField
          disabled
          id="password"
          defaultValue="123456"
          fullWidth
          margin="normal"
          type="password"
          type={values.showPassword ? 'text' : 'password'}
          value={12345}
          onChange={handleChange('password')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                Contraseña:
              </InputAdornment>,
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />
      </CardContent>
      <CardActions>
        {/*<Button size="small" color="primary" variant="contained" startIcon={<SaveIcon />}>Guardar</Button>*/}
      </CardActions>
    </Card>
  );
}