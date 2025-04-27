import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { toasterContextFunction } from '../../Contexts/toasterContext';
import { userProfileContextFunction } from '../../Contexts/userProfileContext';

const API_URL = import.meta.env.VITE_URL;

export default function OneTimeWelcomeForm({ isOpen }) {
  const { userName, setUserName } = React.useContext(userProfileContextFunction());
  const [newName, setName] = React.useState('')
  const { userId, setUserId } = React.useContext(userProfileContextFunction());
  const { Toaster, toast } = React.useContext(toasterContextFunction());
  const [open, setOpen] = React.useState(isOpen);
  const isFirstRender = React.useRef(true);

  // Handle side effects after userName updates
  React.useEffect(() => {
    if (userName) {
      setOpen(false); // Close dialog when userName is updated
    }
  }, [userName]);

  // Check if user exists on mount or when userId changes
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const doesUserExist = async () => {
      setName(userName);
      toast.promise(
        axios.post(`${API_URL}/doesUserExist`, {
          userName: userName,
          userId: userId,
        }),
        {
          loading: 'Checking if user exists...',
          success: (response) => {
            if (response.status === 200) {
              const newUserName = response.data.userName;
              console.log("Bhaiya")
              setUserName(newUserName); // Update state
              return `Welcome back, ${newUserName}`; // Return message
            }
            throw new Error('Unexpected response');
          },
          error: (error) => {
            if (error.response?.status === 404) {
              setOpen(true); // Open dialog if user doesn't exist
              return 'Choose your email signature';
            }
            return 'An error occurred';
          },
        }
      );
    };

    doesUserExist();
  }, [userId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndContinue = async () => {
    toast.dismiss();
    toast.promise(
      axios.post(`${API_URL}/userRegistration`, {
        userName: newName,
        userId: userId,
      }),
      {
        loading: 'Personalizing your emails...',
        success: (response) => {
          if (response.status === 200) {
            const newUserName = response.data.data.userName;
            setUserName(newName); // Update state
            return response.data.message; // Return message
          }
          throw new Error('Unexpected response');
        },
        error: () => 'Error registering user',
      }
    );
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              handleSaveAndContinue(); // Call save and continue on form submit
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
            type="text"
            fullWidth
            variant="standard"
            defaultValue={newName}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogContentText style={{ marginTop: '1rem', color: 'grey' }}>
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