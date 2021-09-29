import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function DeleteDialog({ nameFunction, contentFunction, open, handleOpen, buttonFunctionName, buttonFunction }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <form autoComplete='off'>
                <Dialog
                    xs={10}
                    //fullScreen={fullScreen}
                    open={open}
                    onClose={handleOpen}
                    aria-labelledby='add-program'
                >
                    <DialogTitle id='responsive-title'>
                        {nameFunction}
                    </DialogTitle>
                    <DialogContent>

                        <Grid item xs={12}>
                            <DialogContentText>
                                {contentFunction}
                            </DialogContentText>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleOpen} variant='text' color='secondary'>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleOpen}
                            variant='contained'
                            color='primary'
                            autoFocus
                        >
                            {buttonFunctionName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}