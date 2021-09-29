/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({cbdata}) {
  return (
    <Autocomplete
      id="combo-box"
      options={cbdata}
      getOptionLabel={(option) => option.rol}
      fullWidth={true}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}