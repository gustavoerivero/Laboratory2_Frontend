import React from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import CustomSwitch from './CustomSwitch'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import Theme from '../static/theme/Theme'
import { ThemeProvider } from '@material-ui/core'

export default function Routes() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <CustomSwitch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/Home/:username/:rol' component={Home} />
          <Route exact path='/Profile/:username/:rol' component={Profile} />
          <Route exact path='/error-404' component={NotFound} />
          <Redirect from='*' to='/error-404' />
        </CustomSwitch>
      </BrowserRouter>
    </ThemeProvider>
  )
}