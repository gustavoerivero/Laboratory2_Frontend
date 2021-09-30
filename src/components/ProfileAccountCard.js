import React from 'react'
import clsx from 'clsx'
import {
  Card,
  CardContent,
  Typography,
  InputAdornment,
  TextField,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const useStyles = makeStyles({
  root: {
    height: 350,
    padding: 10
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function AccountCard({ user }) {
  const classes = useStyles()

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Información de la Cuenta
        </Typography>
        <TextField
          disabled
          id="username"
          value={user.username}
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
          value={user.correo}
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
          value={user.password}
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
    </Card>
  )
}