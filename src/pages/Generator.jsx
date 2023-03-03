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
        const response = await axios.get('https://openai-flask.mohamedbasueny.repl.co'); // Receive Data from Server
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

    const sendTranscription = async (endpoint) => {
        try {
            const response = await axios.post(`https://openai-flask.mohamedbasueny.repl.co/${endpoint}`, {
                prompt: transcription
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            setServerData(response.data);
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
                <div className="flex justify-between mt-10">
                     {/*  <button onClick={() => sendTranscription('generate_image')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Generate Image</button>
                          <button onClick={() => sendTranscription('generate_ad_text')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Generate Ad Text</button>
                         <button onClick={() => sendTranscription('generate_website')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Generate Website</button> */}
                 </div>
            </div>
         </div>
        </>
);
}

export default Generator;