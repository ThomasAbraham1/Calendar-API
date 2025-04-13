import React from 'react';


const accessTokenContext = React.createContext();

export function MsalAccessTokenContextFunction(){
    return accessTokenContext
}