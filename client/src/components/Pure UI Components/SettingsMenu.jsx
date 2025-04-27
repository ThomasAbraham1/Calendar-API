import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import OneTimeWelcomeForm from "./OneTimeWelcomeForm"
// import {WelcomeFormContextFunction} from "../../Contexts/userProfileContext"


export default function SettingsMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const { openDialog: open, setDialog: setOpen } = React.useContext(WelcomeFormContextFunction());



    const thisOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeEmailSignature = async () => {
        setOpen(true)
    }

    return (
        <div style={{ marginRight: "1rem" }}>
            <IconButton
                onClick={handleClick}
            >
                <SettingsIcon
                    style={{}}
                    id="basic-button"
                    aria-controls={thisOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={thisOpen ? 'true' : undefined}
                >
                </SettingsIcon>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={thisOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={changeEmailSignature}>Change Email Signature</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
          
                {/* <OneTimeWelcomeForm mode={{ updateMode: true }} /> */}
        </div>
    );
}
