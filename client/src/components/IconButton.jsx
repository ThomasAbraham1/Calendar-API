import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export default function IconButtons({ IconButton }) {
  return (
    <IconButton color="primary" aria-label="">
      <IconButton onClick={() => {
        alert('clicked');
      }} />
    </IconButton>
  );
}