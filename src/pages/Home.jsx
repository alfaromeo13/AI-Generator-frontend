import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Text, Box, Input, IconButton, Button } from '@chakra-ui/react'
 
export function Home(){

    const boxStyles = {
        p: "10px",
        bg: "#f0f1f2",
        m: "10px",
        color: "black",
        textAlign: "center",
        filter: 'blur(2px)',
        ':hover': {
            color: "white",
            bg: "purple.400"
        }
    }

    const [transcription, setTranscription] = useState('');
    const [serverData, setServerData] = useState('');

    const fetchServerData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/data');
        setServerData(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchServerData();
    }, []);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let interimTranscription = '';
        let finalTranscription = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscription += transcript;
        } else {
            interimTranscription += transcript;
        }
        }

        setTranscription(finalTranscription);
        sendTranscription(finalTranscription); // send transcription to Flask server
    };

    recognition.onerror = (event) => {
        console.error(event);
    };

    const startTranscription = () => {
        recognition.start();
    };

    const stopTranscription = () => {
        recognition.stop();
    };

    const sendTranscription = async (transcription) => {
        try {
        const response = await axios.post('http://localhost:5000/transcription', {
            transcription: transcription
        });
        console.log(response);
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div>
            <Heading> AI Generator </Heading>
            <Text m={20}> Lorem ipsum</Text>
            <Box sx={boxStyles}>
                {transcription}
            </Box>
            <Button onClick={startTranscription}>Push To Talk</Button>
            <Text m={20}>Output data: {serverData}</Text>
        </div>
    )
}