// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import "./app.css";

// function App() {

//   return (
//     <>
//     <Stack spacing={2} direction="row">
//       <Button variant="contained">Sign In</Button>
//     </Stack>
//     </>
//   )
// }

// export default App
import React, { useState } from 'react';

import { PageLayout } from './Components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
import CalendarData from './components/CalendarData';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import ChatWindow from './components/ChatWindow';

// import './App.css';

import Button from 'react-bootstrap/Button';

/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
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
            <AuthenticatedTemplate>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                    <ProfileContent />
                        </Grid>
                        <Grid className="chatbotSpace" item xs={6} md={4}>
                        <ChatWindow />
                        </Grid>
                    </Grid>
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
    return (
        <PageLayout>
            <center>
                <MainContent />
            </center>
        </PageLayout>
    );
}
