import React, {useState, useContext} from "react";

const chatContext = React.createContext();

export const chatContextFunction = () => {
    return chatContext;
}