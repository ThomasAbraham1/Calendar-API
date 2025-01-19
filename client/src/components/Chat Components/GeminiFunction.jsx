import axios from 'axios';

export const GeminiFunction = async (text, setTextStream) => {

    axios.post("http://localhost:3000/query", { prompt: text }).then(async (response) => {
        console.log(response.data.response);
        const answer = response.data.response;
        setTextStream(answer);
        return answer

    })
}