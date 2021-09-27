import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core';
import UserDialog from '../components/UserDialog';

const roles = [
  {rol:'ADMIN'},
  {rol:'INFOR-USER'},
  {rol:'PRODU-USER'},
  {rol:'TELEM-USER'},
  {rol:'FISIC-USER'},
  {rol:'MATEM-USER'}];

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170, align: 'left'},
    {id: 'lastname', label: 'Apellido', minWidth: 170, align: 'left'},
    { id: 'username', label: 'Usuario', minWidth: 100, align: 'center' },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center'
    },
    {
      id: 'rol',
      label: 'Rol',
      minWidth: 170,
      align: 'center'
    },
  ];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Tabla({rows}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })} 
                    <Button size='small' color='primary' variant="contained" onClick={handleOpen}>
                        Editar
                    </Button>
                    <UserDialog
                      nameFunction='Editar Usuario'
                      contentFunction='Ingrese la información del Usuario que desea modificar. 
                      El botón de Guardar no se habilitará hasta que ingrese la información requerida.'
                      buttonFunctionName='Guardar'
                      handleOpen={handleOpen}
                      open={open}
                      cbdata={roles}
                    />

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
