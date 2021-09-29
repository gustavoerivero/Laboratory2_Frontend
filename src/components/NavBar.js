import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  MenuItem,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import '../assets/css/index.css'

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
}));

export default function NavBar({ auth, setAuth, admin }) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
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
                <MenuItem component={Link} to='' onClick={handleClose}>Perfil</MenuItem>
                {admin && <MenuItem component={Link} to='/users' onClick={handleClose}>Usuarios</MenuItem>}
                <MenuItem component={Link} to='/' onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}