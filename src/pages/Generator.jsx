import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from "../components/Logo" 
import LogoutBtn from "../components/LogoutBtn"
import { Microphone, DownloadSimple } from "phosphor-react";
import { Link } from "react-router-dom";

import logo1 from "../assets/generated/image0.jpg";
import logo2 from "../assets/generated/photo_2023-03-04_04-13-54.jpg";

import image2 from "../assets/generated/image2.jpg";
import image3 from "../assets/generated/image3.jpg";
import image4 from "../assets/generated/image4.jpg";
import image5 from "../assets/generated/image5.jpg";
import image6 from "../assets/generated/image6.jpg";
import image7 from "../assets/generated/image7.jpg";
import image8 from "../assets/generated/image8.jpg";
import image9 from "../assets/generated/image9.jpg";

import video from "../assets/generated/8752e3ba-4892-4b07-9a05-4da8219514f2-vid.mp4";
import website from "../assets/generated/webpage.png";


export function Generator(){

    const [transcription, setTranscription] = useState('');
    const [websiteData, setWebsiteData] = useState(null);
    const [logoData, setLogoData] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [adTextData, setAdTextData] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [transcriptionSent, setTranscriptionSent] = useState(false);
    const [fetchSuccess, setFetchSuccess] = useState(false);

    const [category, setCategory] = useState("Logo");

    useEffect(() => {
        const fetchServerData = async () => {
          try {
            const endpoint1 = 'https://openai-flask.mohamedbasueny.repl.co/generate_website';
            const endpoint2 = 'https://openai-flask.mohamedbasueny.repl.co/generate_logo';
            const endpoint3 = 'https://openai-flask.mohamedbasueny.repl.co/generate_image';
            const endpoint4 = 'https://openai-flask.mohamedbasueny.repl.co/generate_ad_text';
            const endpoint5 = 'https://openai-flask.mohamedbasueny.repl.co/generate_video';
    
            // Make API calls to all endpoints using Axios
            const [response1, response2, response3, response4, response5] = await Promise.all([
              axios.post(endpoint1, { prompt: transcription, type: 'text' }),
              axios.post(endpoint2, { prompt: transcription, type: 'text' }),
              axios.post(endpoint3, { prompt: transcription, type: 'text' }),
              axios.post(endpoint4, { prompt: transcription, type: 'text' }),
              axios.post(endpoint5, { prompt: transcription, type: 'text' })
            ]);

            console.log('Endpoint 1 response:', response1.data);
            console.log('Endpoint 2 response:', response2.data);
            console.log('Endpoint 3 response:', response3.data);
            console.log('Endpoint 4 response:', response4.data);
            console.log('Endpoint 5 response:', response5.data);
            
            setWebsiteData({
              type: 'website',
              generated_HTML_and_CSS_URL: response1.data.generated_HTML_and_CSS_URL
            });
    
            setLogoData({
              type: 'image',
              image_url: response2.data.image_url
            });
    
            setImageData({
              type: 'image',
              image_url: response3.data.image_url
            });
    
            setAdTextData({
              type: 'text',
              generated_text: response4.data.generated_text
            });
    
            setVideoData({
              type: 'video',
              video_url: response5.data.video_url
            });
            setFetchSuccess(true);
            console.log(fetchServerData);
            console.log('Data fetched successfully from all endpoints.');
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        if (transcription) {
          fetchServerData();
        }
      }, [transcription]);
    
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
              const endpoint1 = 'https://openai-flask.mohamedbasueny.repl.co/generate_website';
              const endpoint2 = 'https://openai-flask.mohamedbasueny.repl.co/generate_logo';
              const endpoint3 = 'https://openai-flask.mohamedbasueny.repl.co/generate_image';
              const endpoint4 = 'https://openai-flask.mohamedbasueny.repl.co/generate_ad_text';
              const endpoint5 = 'https://openai-flask.mohamedbasueny.repl.co/generate_video';
          
              // Make API calls to all endpoints using Axios
              await Promise.all([
                axios.post(endpoint1, { prompt: transcription, type: 'text' }),
                axios.post(endpoint2, { prompt: transcription, type: 'text' }),
                axios.post(endpoint3, { prompt: transcription, type: 'text' }),
                axios.post(endpoint4, { prompt: transcription, type: 'text' }),
                axios.post(endpoint5, { prompt: transcription, type: 'text' })
            ]);
            setTranscriptionSent(true); // Set transcriptionSent to true on success
              console.log('Transcription sent successfully to all endpoints.');
            } catch (error) {
              console.error('Error sending transcription:', error);
            }
          };
    
    const showLogo = () => {
        setCategory("Logo");
    }
    const showText = () => {
        setCategory("Text");
    }
    const showImage = () => {
        setCategory("Image");
    }
    const showVideo = () => {
        setCategory("Video");
    }
    const showWebsite = () => {
        setCategory("Website");
    }

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
                    {transcriptionSent && <p className=" mt-4 ml-16 text-dark-blue">Your prompt has been sent successfully! Please be patient, system is generating your digital content! </p>}
                    {fetchSuccess && ( <p className=" mt-2 ml-16 text-dark-blue">Your Digital Contents for {transcription} has been successfully generated!</p>
                      )}
                </form>
                
                <div className="bg-lavender/10 border-2 text-blue-600 text-xl border-white/70 h-[5rem] text-center mt-10 rounded-tl-[40px] rounded-tr-[40px]">
                    <div className="pt-6 flex justify-center">
                        <div className="mx-2"><DownloadSimple size={32} /></div>
                        Download all
                    </div>
                </div>

                <div className="bg-white/40 border-2 text-blue-600 text-xl border-white/30 minHeight-[40rem] rounded-bl-[40px] rounded-br-[40px]">
                    <div className="pt-6 flex justify-center">
                        <div className="mx-3 px-6 py-2 border-2 border-lavender rounded-full hover:cursor" style={{color: category === "Logo"? "white" : "#6B7AFF", background: category === "Logo"? "#6B7AFF" : "white"}} onClick={showLogo}>Logo</div>
                        <div className="mx-3 px-6 py-2 border-2 border-lavender rounded-full hover:cursor" style={{color: category === "Text"? "white" : "#6B7AFF", background: category === "Text"? "#6B7AFF" : "white"}} onClick={showText}>Text</div>
                        <div className="mx-3 px-6 py-2 border-2 border-lavender rounded-full hover:cursor" style={{color: category === "Image"? "white" : "#6B7AFF", background: category === "Image"? "#6B7AFF" : "white"}} onClick={showImage}>Images</div>
                        <div className="mx-3 px-6 py-2 border-2 border-lavender rounded-full hover:cursor" style={{color: category === "Video"? "white" : "#6B7AFF", background: category === "Video"? "#6B7AFF" : "white"}} onClick={showVideo}>Video</div>
                        <div className="mx-3 px-6 py-2 border-2 border-lavender rounded-full hover:cursor" style={{color: category === "Website"? "white" : "#6B7AFF", background: category === "Website"? "#6B7AFF" : "white"}} onClick={showWebsite}>Website</div>
                    </div>
                    {category === "Logo" &&
                        <div className="m-16 grid grid-cols-3 gap-4">
                            {logoData && (
                           <img src={logoData.image_url} />
    
                             )}
                        </div>
                       }
                    {category === "Text" &&
                        <div className="m-16 text-dark-blue">
                         {adTextData && (
                          <p>{adTextData.generated_text}</p>
                           )}
                        </div>
                    }
                    {category === "Image" &&
                        <div className="m-16 grid grid-cols-3 gap-4">
                            {imageData && (
                         <img src={imageData.image_url} alt="Generated Image" className="w-96 h-96" />
                         )}
                        </div>
                    }
                    {category === "Video" &&
                        <div className="m-16 grid grid-cols-1 gap-4">     
                            {videoData && (
                          <video src={videoData.video_url} controls className="w-96 h-96"></video>
                         )}
                        </div>
                    }
                    {category === "Website" &&
                        <div className="m-16 grid grid-cols-1 gap-4">
                            {websiteData && (
                        <a href={websiteData.generated_HTML_and_CSS_URL} target="_blank" rel="noreferrer">
                                Click here to download your generated website content
                            </a>
                    )}
                        </div>
                    }
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

    export default Generator;