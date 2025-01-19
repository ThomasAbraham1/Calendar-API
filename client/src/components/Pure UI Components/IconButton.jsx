import * as React from 'react';
import IconButton from '@mui/material/IconButton';
export default function IconButtons({ Icon, calendarEventId, setOpen }) {

  const hanldeClick = (calendarEventId) => {
    // alert(calendarEventId)
    setOpen(true);
  }
  return (
    <>
      <IconButton color="primary" aria-label="" onClick={() => hanldeClick(calendarEventId)}>
        <Icon />
      </IconButton>
    </>
  );
}