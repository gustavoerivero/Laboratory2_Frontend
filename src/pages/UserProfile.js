import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  CssBaseline,
  Grid,
  Paper
} from '@material-ui/core'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ProfileCard from '../components/ProfilePersonalCard'
import ProfileTop from '../components/ProfileTop'
import AccountCard from '../components/ProfileAccountCard'
import ChangePasswordCard from '../components/ProfileChangePasswordCard'

import { makeStyles } from '@material-ui/core/styles'

import '../assets/css/index.css'
import '@fontsource/roboto'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '.75em',
    marginTop: 75,
  },
  paper1: {
    margin: 10,
    padding: 15,
  },
  paper: {
    margin: 10,
    padding: 15,
    minHeight: '80vh',
  },
  title: {
    margin: 5,
  },
  aggMessage: {
    margin: 25,
  },
  img: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
}))

export default function UserProfile() {

  const classes = useStyles()

  const { profile, username, rol } = useParams() 

  const [response, setResponse] = useState(null)

  const [user, setUser] = useState({
    id: '',
    programa: null,
    username: username,
    password: '',
    nombre: '',
    apellido: '',
    rol: rol,
    status: 'A'
  })

  useEffect(() => {
    if (response === null) {
      axios.get(`http://192.168.1.100:8080/usuario/get/username/${profile}`)
        .then(res => {
          console.log(res.data)
          setUser(res.data)
          setResponse(true)
        })
        .catch(error => {
          console.log(error)
          setResponse(false)
        }) 
    }
  })
  
  return (
    <div>
      <CssBaseline />
      <NavBar auth={true} admin={rol === '0' ? true : false} />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={classes.paper} elevation={1}>
            <ProfileTop 
              username={user.username}
              rol={user.rol}
              type='watch'
            />
            <Grid container spacing={1} justifyContent='center'>
              <Grid item xs={12} md={4}>
                <ProfileCard user={user} />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountCard user={user} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ChangePasswordCard user={user} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}
