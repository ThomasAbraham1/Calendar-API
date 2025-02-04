import axios from 'axios';
import {useContext} from "react";


export const GeminiFunction = async (text, setTextStream, resolve, reject, chatInputType) => {

        axios.post("http://localhost:3000/query", { prompt: text }).then(async (response) => {
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
