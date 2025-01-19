import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField({label}) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField fullWidth id="standard-basic" label={label} variant="standard" />
    </Box>
  );
}