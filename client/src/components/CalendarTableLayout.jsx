// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from "./IconButton"







// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const paginationModel = { page: 0, pageSize: 5 };

// export default function CalendarTableLayout(props) {
//   const columns = [
//     { field: 'date', headerName: 'Date', width: 150 },
//     { field: 'day', headerName: 'Day', width: 150 },
//     { field: 'subject', headerName: 'Subject', width: 200 },
//     { field: 'time', headerName: 'Time', width: 150 },
//     { field: 'getEmail', headerName: "Get Email", width: 80, renderCell: () => <IconButton IconButton={OpenInNewIcon} /> }
//   ];
//   const rows = props.rows;
//   console.log(props.rows + "hello");
//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// }


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function CalendarTableLayout(props) {
  const rows = props.rows;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Get Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.day}</TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right"><IconButton IconButton={OpenInNewIcon} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}