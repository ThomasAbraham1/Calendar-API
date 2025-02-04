const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const timeConvertor = require('./timeConvertor');


// Create an Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
}));
// File path to store chat history
// const historyFilePath = path.join(__dirname, "chatHistory.json");
const historyFilePath = path.join(__dirname, "../chatHistory.json");



// Function to read history from the file  
const loadChatHistory = () => {
    try {
        if (!fs.existsSync(historyFilePath)) {
            // Create the file if it doesn't exist
            fs.writeFileSync(historyFilePath, JSON.stringify([]));
        }

        const historyContent = fs.readFileSync(historyFilePath, "utf-8");

        // Handle empty files gracefully
        if (!historyContent.trim()) {
            return [];
        }

        return JSON.parse(historyContent);
    } catch (error) {
        console.error("Error reading chat history:", error);
        return [];
    }
};

// Function to write history to the file   
const saveChatHistory = (history) => {
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};

// Endpoint to send a query to the Gemini API
app.post("/query", async (req, res) => {

    // Ensure the history file exists 
    if (!fs.existsSync(historyFilePath)) {
        fs.writeFileSync(historyFilePath, JSON.stringify([]));
    }
    console.log(historyFilePath);
    const { prompt } = req.body;
    // console.log(prompt)

    if (!prompt) {
        return res.status(400).send({ error: "Prompt is required" });
    }

    // Load chat history
    const history = loadChatHistory();

    // Append the new user message to the history
    history.push({ role: "user", parts: [{ text: prompt }] });

    try {
        // Call the Gemini API
        const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
        const genAI = new GoogleGenerativeAI("AIzaSyCO17CaCoMT9sX9juzNVnrJQFt1h1w6AsY");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({ history });

        // Get the AI's response
        // throw {status: 400}
        const result = await chat.sendMessage(prompt);
        const responseText = result.response.text();

        // Append the AI's response to the history
        // history.push({ role: "model", parts: [{ text: responseText }] });

        // Save the updated history to the file
        // saveChatHistory(history);

        // Send the response back to the client
        res.send({ response: responseText });
    } catch (error) {
        console.error("Error querying Gemini API:", error.status);
        if (error.status == '503') res.status(503).send({ error: "Server busy, try again!" });
        else if (error.status = '400') res.status(400).send({ error: "Chat history exceeded limit" });
    }
});

app.post("/timeConvertor", function (req, res) {
    var { originalStartTimeZone, eventDate } = req.body;
    var { date, time } = timeConvertor(originalStartTimeZone, eventDate);
    res.send({ date, time });
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
