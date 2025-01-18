import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export default function IconButtons({ Icon, calendarEventId }) {

  const hanldeClick = (calendarEventId) =>{
    alert(calendarEventId)
  }
  return (
    <IconButton color="primary" aria-label="">
      <Icon onClick={() => hanldeClick(calendarEventId)} />
    </IconButton>
  );
}