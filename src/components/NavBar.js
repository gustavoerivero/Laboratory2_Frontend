import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  MenuItem,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'

import '../assets/css/index.css'
import '../assets/css/navbar.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingLeft: '2em',
    flexGrow: 1,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  appTitle: {
    colorText: 'rgba(255, 255, 255, .75)',
  },
}))

export default function NavBar({ auth, admin }) {

  const classes = useStyles()

  const { username, rol } = useParams()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h5' className={classes.title} component={Link} to={`/Home/${username}/${rol}`}>
            UCL<span className={classes.AppTitle}>App</span>
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to={`/Profile/${username}/${rol}`} onClick={handleClose}>Perfil</MenuItem>
                {admin && <MenuItem component={Link} to={`/Users/${username}/${rol}`} onClick={handleClose}>Usuarios</MenuItem>}
                {admin && <MenuItem component={Link} to={`/Report/${username}/${rol}`} onClick={handleClose}>Reporte</MenuItem>}
                {admin && <MenuItem component={Link} to={`/Dep/${username}/${rol}`} onClick={handleClose}>Departamentos</MenuItem>}
                <MenuItem component={Link} to='/' onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}