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
    const [serverData, setServerData] = useState({ type: 'text' });

    const [category, setCategory] = useState("Logo");

    const fetchServerData = async () => {
        try {
          const response = await axios.get('https://openai-flask.mohamedbasueny.repl.co/');
          const responseData = response.data;
          let generatedData = null;
      
          if (responseData.type === 'text') {
            generatedData = responseData.generated_text;
          } else if (responseData.type === 'image') {
            generatedData = <img src={responseData.image_url} alt="Generated Image" />;
          } else if (responseData.type === 'website') {
            generatedData = (
              <div>
                <a href={responseData.generated_HTML_and_CSS_URL} target="_blank" rel="noreferrer">
                  Click here to view generated website
                </a>
              </div>
            );
          }
      
          setServerData(generatedData);
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
            let type = '';
    
            if (serverData && serverData.type === 'text') {
                type = 'text';
            } else if (serverData && serverData.type === 'image') {
                type = 'image';
            } else if (serverData && serverData.type === 'logo') {
                type = 'logo';
            } else if (serverData && serverData.type === 'website') {
                type = 'website';
            }
            
            const response = await axios.post(`https://openai-flask.mohamedbasueny.repl.co/generate_website`, {
                prompt: transcription,
                type: 'text',
            });
            
            console.log(response);
        } catch (error) {
            console.error(error);
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
                            <img src={logo1} />
                            <img src={logo2} />
                        </div>
                    }
                    {category === "Text" &&
                        <div className="m-16 text-dark-blue">
                            Are you in the market for a new home or looking to sell your current property? Look no further than our property sales business! We specialize in connecting buyers with their dream homes and helping sellers get top dollar for their properties. 
                            Our team of experienced real estate agents are experts in the local market and will guide you through the entire process from start to finish. Whether you're a first-time home buyer or a seasoned real estate investor, we have the expertise and resources to help you achieve your goals. 
                        </div>
                    }
                    {category === "Image" &&
                        <div className="m-16 grid grid-cols-3 gap-4">
                            <img src={image2} /><img src={image3} /><img src={image4} /><img src={image5} />
                            <img src={image6} /><img src={image7} /><img src={image8} /><img src={image9} />
                        </div>
                    }
                    {category === "Video" &&
                        <div className="m-16 grid grid-cols-1 gap-4">
                            <video src={video} autoPlay loop />
                        </div>
                    }
                    {category === "Website" &&
                        <div className="m-16 grid grid-cols-1 gap-4">
                            <img src={website} />
                        </div>
                    }
                    

                    {serverData && (
                        <>
                        {serverData.type === 'text' && <p>{serverData.generated_text}</p>}
                        {serverData.type === 'image' && (
                            <img src={serverData.image_url} alt="Generated Image" />
                        )}
                        {serverData.type === 'website' && (
                            <div>
                                
                            <a href={serverData.generated_HTML_and_CSS_URL} target="_blank" rel="noreferrer">
                                Click here to view generated website
                            </a>
                            </div>
                        )}
                        </>
                    )}
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