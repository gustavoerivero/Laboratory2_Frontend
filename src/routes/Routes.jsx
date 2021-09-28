import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import CustomSwitch from './CustomSwitch';
import LoginPage from '../pages/LoginPage';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Users from '../pages/Users'
import Profile from '../pages/Profile'
import Testing from '../pages/Testing'
import Theme from '../static/theme/Theme';
import { ThemeProvider } from '@material-ui/core';

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <CustomSwitch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/Home' component={Home} />
          <Route exact path='/error-404' component={NotFound} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/profile' component={Profile} />

          <Route exact path='/test' component={Testing} />

          <Redirect from='*' to='/error-404' />
        </CustomSwitch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
