import React from 'react'
import {
  Paper,
  List,
} from '@material-ui/core'

import ItemDep from './ItemDep'

import { makeStyles } from '@material-ui/core/styles'

import '../assets/css/index.css'
import '@fontsource/roboto'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '45vh',
  },
}))

export default function ListItemDeps({ item }) {

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <List dense={false}>
        {item.map((element, i) => (
          <ItemDep id={i} element={element} />
        ))}
      </List>
    </Paper>
  )
}