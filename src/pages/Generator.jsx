import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from "../components/Logo" 
import LogoutBtn from "../components/LogoutBtn"
import { Microphone } from "phosphor-react";


export function Generator(){

    const [transcription, setTranscription] = useState('');
    const [serverData, setServerData] = useState('');

    const fetchServerData = async () => {
        try {
        const response = await axios.get('https://deep-dream-backend.onrender.com/api'); // Receive Data from Server
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
        sendTranscription(finalTranscription); // send transcription to server
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
        const response = await axios.post('https://deep-dream-backend.onrender.com/api', {
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
                    <div className="flex bg-white/40 w-full py-6 px-12 border-2 border-white/30 rounded-full">
                        <input className="text-3xl bg-transparent flex-grow" defaultValue={transcription } placeholder="Type your prompt, or click the mic to start speaking" required />
                        <span className="flex items-center">
                            <button onClick={startTranscription}>
                                <Microphone size={50} color="#9AA1AD" />
                            </button>
                        </span>
                    </div>
                </form>
                <div className="bg-white/40 border-2 border-white/30 h-[40rem] mt-10 rounded-[40px]">
                    {serverData}
                </div> 
            </div>
        </div>
        
            {/* <main className="h-screen m-36 absolute opening-section">
                <div>
                    {transcription}
                </div>
                <button onClick={startTranscription}>Push To Talk</button>
                <div m={20}>Output data: {serverData}</div>
            </main>  */}
        </>
        
    )
}