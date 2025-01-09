import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import ContextProvider from './Contexts/Context';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import {useState, useContext } from 'react'


// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
root.render(
    //   <React.StrictMode>
    <ContextProvider>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </ContextProvider>
    //   </React.StrictMode>
);