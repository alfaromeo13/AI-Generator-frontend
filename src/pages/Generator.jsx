import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from "../components/Logo" 
import LogoutBtn from "../components/LogoutBtn"

export function Generator(){

    const boxStyles = {
        padding: "10px",
        backgrond: "#f0f1f2",
        margin: "10px",
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
        <>
        <div className="flex overflow-x-hidden bg-generator bg-cover min-h-screen flex justify-center">
            <Logo/>
            <LogoutBtn/>
            <div className="content w-8/12 m-52 z-50">
                <form>
                    <div>
                        <input className="text-3xl bg-white/40 w-full py-6 px-12 my-2 border-2 border-white/30 rounded-full" placeholder="Type your prompt, or click the mic to start speaking" required />
                    </div>
                    <div className="bg-white/40 border-2 border-white/30 h-[40rem] mt-10 rounded-[40px]">
                        {serverData}
                    </div> 
                </form>
            </div>
        </div>
            <main className="h-screen m-36 absolute opening-section">
                <div style={boxStyles}>
                    {transcription}
                </div>
                <button onClick={startTranscription}>Push To Talk</button>
                {/* <div m={20}>Output data: {serverData}</div> */}
            </main> 
        </>
        
    )
}