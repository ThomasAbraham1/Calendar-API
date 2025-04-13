
// export default App
import React, { useState, useContext } from 'react';


import { PageLayout } from './Components/API Components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
import CalendarData from './components/CalendarData';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import ChatWindow from './components/Chat Components/ChatWindow';
import TinyEditor from "./components/TinyEditor";
import { calendarContextFunction } from "./Contexts/calendarContext";
import { toasterContextFunction } from './Contexts/toasterContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import {MsalAccessTokenContextFunction} from "./Contexts/MsalAccessTokenContext";

import Button from 'react-bootstrap/Button';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
    const {accessToken, setAccessToken} = React.useContext(MsalAccessTokenContextFunction());
    const { instance, accounts } = useMsal();
    const { graphData, setGraphData } = useContext(calendarContextFunction());

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                setAccessToken(response.accessToken);
                callMsGraph(response.accessToken).then((response) => {
                    setGraphData(response);
                    // console.log(accessToken)
                }
                );
            });
    }

    return (
        <>
            <h5 className="card-title">{accounts[0].name}'s Calendar</h5>
            <br />
            {graphData ? (
                <>
                    <ProfileData graphData={graphData} />
                    <CalendarData rows={graphData.value} />
                </>
            ) : (
                // <Button variant="secondary" onClick={RequestProfileData}>
                //     Request Profile Information
                // </Button>
                <RequestProfileData></RequestProfileData>
            )}
        </>
    );
};

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        
        <div className="App">
            {console.log(import.meta.env.VITE_URL)}
            <AuthenticatedTemplate>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Grid item xs={6} md={8}>
                            <ProfileContent />
                        </Grid>
                        <Grid className="editorSpace" item xs={6} md={4} sx={{ textAlign: 'left' }} >
                            <TinyEditor />
                        </Grid>
                    </Grid>
                    <ChatWindow />
                </Box>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Please sign-in to see your profile information.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    const { Toaster, toast } = useContext(toasterContextFunction());
    return (
        <>
            <PageLayout className="mainScreen">
                <Toaster position="top-center" />
                <center>
                    <MainContent />
                </center>
            </PageLayout>
        </>
    );
}
