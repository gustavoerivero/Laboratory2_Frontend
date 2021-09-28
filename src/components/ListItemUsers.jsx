import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    Fab,
    Grid,
    Paper,
    Tooltip,
    Typography
} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import UserDialog from '../components/UserDialog';

import { makeStyles } from '@material-ui/core/styles';

import '../assets/css/index.css';
import '@fontsource/roboto';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '.75em',
        marginTop: 75,
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
    }
}))

export default function ListItemUser({ item }) {

    const classes = useStyles();

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <Paper>
            <List dense={dense}>
                {item.map((element) => (
                    <ListItem key={element.id}>

                        {/*<IconButton edge="start" aria-label="Edit">
                            <AccountCircleIcon fontSize='small' />
                            </IconButton>*/}

                        <ListItemText
                            primary={element.name + " " + element.lastname + " (" + element.username + ")"}
                            secondary={
                                " Correo: " + element.email
                                + " | " + element.rol}
                        />
                        <ListItemSecondaryAction >
                            <IconButton edge="start" aria-label="Edit" onClick={handleOpen} >
                                <CreateIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <UserDialog
                                nameFunction='Editar Usuario'
                                contentFunction='Ingrese la información del Usuario que desea modificar. 
                      El botón de Guardar no se habilitará hasta que ingrese la información requerida.'
                                buttonFunctionName='Guardar'
                                handleOpen={handleOpen}
                                open={open}
                                itemData={element}
                                mail={element.email}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}