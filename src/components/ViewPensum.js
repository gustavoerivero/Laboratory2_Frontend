import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'

export default function ViewPensumDialog({  descFunction, fechaFunction, codigoFunction, programaFunction, open, handleOpen, buttonFunctionName }) {

  return (
    <div>
      <form autoComplete='off'>
        <Dialog
          xs={10}
          open={open}
          onClose={handleOpen}
          aria-labelledby='add-program'
        >
          <DialogTitle id='responsive-title'>
            'Visualización de pensum'
          </DialogTitle>
          <DialogContent>

            <Grid item xs={12}>
              <DialogContentText>
                <Grid item xs={12}>
                  {descFunction}
                </Grid>
                <Grid item xs={12}>
                  {fechaFunction}
                </Grid>
                <Grid item xs={12}>
                  {codigoFunction}
                </Grid>
                <Grid item xs={12}>
                  {programaFunction}
                </Grid>
              </DialogContentText>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button size="small" color="primary" variant="contained" startIcon={<DescriptionIcon />}>
              {buttonFunctionName}
            </Button>
            <Button autoFocus onClick={handleOpen} variant='text' color='secondary'>
              Cerrar
            </Button>
          </DialogActions>

        </Dialog>
      </form>
    </div>
  )
}