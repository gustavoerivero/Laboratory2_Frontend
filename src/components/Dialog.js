import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

export default function AlertDialog({ title, content, handleConfirm, open, setOpen }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' variant='outlined' autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" variant='contained'>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}