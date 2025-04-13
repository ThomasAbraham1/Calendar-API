const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg'); // Switch to fluent-ffmpeg for progress
const WebSocket = require('ws');
const path = require('path');
const { createClient } = require("@deepgram/sdk");
const deepgram = createClient("8d74b3b36f78cda91248d4b8ed39627abf42c610");
const fs = require('fs')

const app = express();
const upload = multer({ dest: 'uploads/' });

// WebSocket setup
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

async function meetingTranscribeController(req, res, next) {
    console.log(req.file); // Log uploaded file info
    const filePath = req.file.path; // Use the uploaded file path
    const audioOutput = 'your_audio_file.mp3';

    try {
        // Step 1: Convert video to audio with progress
        ffmpeg(filePath)
            .audioCodec('libmp3lame') // MP3 encoder
            .audioBitrate('16k')      // 16kbps for ~7-8MB/hour
            .audioFrequency(16000)    // 16kHz sample rate
            .audioChannels(1)         // Mono
            .output(audioOutput)
            .on('progress', (progress) => {
                const percent = Math.min(100, Math.round(progress.percent));
                broadcastProgress('conversion', percent); // Send progress to frontend
            })
            .on('end', async () => {
                console.log('Audio file: ' + audioOutput);
                broadcastProgress('conversion', 100); // Signal completion
                // res.send('Yes!'); // Respond to client
                const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
                    fs.readFileSync(audioOutput),
                    {
                        model: "nova-3",
                    }
                );
                if (error) {
                    res.send(error)
                } else {
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error("Failed to delete file:", err);
                            // Handle the error (perhaps log it and send a response)
                        }
                        else {
                            console.log('Temporary file deleted successfully');
                        }
                    });
                    res.send({data: result.results.channels[0].alternatives[0].transcript});
                    broadcastProgress('Transcribing', 100);
                }
            })
            .on('error', (err) => {
                console.log('Error: ' + err);
                res.status(500).send('Conversion failed');
            })
            .run();
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
        res.status(500).send('Error in conversion process');
    }
}

// Broadcast progress to WebSocket clients
function broadcastProgress(stage, percent) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ stage, percent }));
        }
    });
}

// }

module.exports = { meetingTranscribeController }; 