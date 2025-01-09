import React, {useState, useContext } from 'react' 
import { textStreamContextFunction } from './textStreamContext';

const textStreamContext = textStreamContextFunction();



export default function Context({children}) {
    const [textStream, setTextStream] = useState(1);

    return (
        <textStreamContext.Provider value={{ textStream, setTextStream }}>
            {children}
        </textStreamContext.Provider>

    )
}