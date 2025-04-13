import axios from 'axios';
import {useContext} from "react";
const API_URL = import.meta.env.VITE_URL;


export const GeminiFunction = async (text, setTextStream, resolve, reject, chatInputType) => {

        axios.post(`${API_URL}/query`, { prompt: text }).then(async (response) => {
            console.log(response.data.response);
            const answer = response.data.response;
            setTextStream(answer);
            if(chatInputType == 'emailFromcalendar') resolve({name: "Email has been generated!"})
            else if(chatInputType == 'directMethod') resolve({name: "Response received!"})
        }).catch((e)=>{
            console.log(e)

            reject(e)
        })
} 
