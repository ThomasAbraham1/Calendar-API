// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ChatWindow from './ChatWindow';
// import { textStreamContextFunction } from "../Contexts/textStreamContext";
// import {useContext, useState} from "react";
import axios from 'axios';

export const GeminiFunction = async (text, setTextStream) => {

    axios.post("http://localhost:3000/query", { prompt: text }).then(async (response) => {
        console.log(response.data.response);
        const answer = response.data.response;
        setTextStream(answer);
        return answer

    })


    //     const genAI = new GoogleGenerativeAI("AIzaSyCO17CaCoMT9sX9juzNVnrJQFt1h1w6AsY");
    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //     // console.log(text);
    //     const chat = model.startChat({
    //         history: [
    //             {
    //                 role: "user",
    //                 parts: [{ text: "Hello, my name is Thomas. From now your name is Zoe" }],
    //             },
    //             {
    //                 role: "model",
    //                 parts: [{ text: "Great to meet you. What would you like to know?" }],
    //             },
    //         ],
    //     });

    // const prompt = text;

    // const result = await chat.sendMessage(prompt);
    // const response = result.response.text();
    // setTextStream(response);
    // return (response)
    // const result = await model.generateContent(prompt);

    // console.log(result.response.text());
    // for await (const chunk of result.stream) {
    //     const chunkText = chunk.text();
    //     setTextStream(chunkText);
    // }
}