import React, {useState, useContext } from 'react' 



const textStreamContext = React.createContext();

export function textStreamContextFunction (){
    return textStreamContext
}