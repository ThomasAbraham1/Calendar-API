import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios"
import { toasterContextFunction } from '../../Contexts/toasterContext';


const API_URL = import.meta.env.VITE_URL;

export default function OneTimeWelcomeForm({isOpen}) {

  const { Toaster, toast } = React.useContext(toasterContextFunction());
  const userName = localStorage.getItem('userName');
  const [name, setName] = React.useState(userName)
  const userId = localStorage.getItem('userId');
  // console.log(userId + "ALLAHUKABAR")
  // console.log(isOpen) 
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    const doesUserExist = async () => {
      toast.promise(axios.post(`${API_URL}/doesUserExist`, {
        userName: name,
        userId: userId
      }), {
        loading: "Checking if user exists...",
        success: (data) => {
          // setOpen(false);
          if (data.status == 200) setOpen(false)
          console.log(data)
          return `Welcome back, ${data.data.userName}`
        },
        error: (data) => {
          console.log(data)
          if (data.status == 404) setOpen(true)
          return "Choose your email signature"
        }
      })
    }
    doesUserExist();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndContinue = async () => {
    toast.dismiss();
    toast.promise(axios.post(`${API_URL}/userRegistration`, {
      userName: name,
      userId: userId
    }), {
      loading: "Personalizing your emails..",
      success: (data) => {
        console.log(data)
        if (data.status == 200) {
          localStorage.setItem("userName", data.data.data.userName)
          console.log(localStorage.getItem("userName"))
          setOpen(false)
          return data.data.message
        }

      },
      error: (data) => "Errorr"
    })
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Welcome to Calendar API</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter preferred name for email signature
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Signature Name"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogContentText style={{ marginTop: "1rem", color: "grey" }}>
            *If you want to keep the same name, click on continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSaveAndContinue}>Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}