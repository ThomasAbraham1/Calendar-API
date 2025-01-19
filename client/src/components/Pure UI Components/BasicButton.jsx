import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButton({onClickFn}) {
  return (
      <Button onClick={onClickFn} variant="text" size="large">Send Email</Button>
  );
}