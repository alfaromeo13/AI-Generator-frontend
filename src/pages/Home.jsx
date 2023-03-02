import GradientBg from "../assets/gradient-bg.mp4"
import { Link } from "react-router-dom"
import Logo from "../components/Logo" 
import LoginBtn from "../components/LoginBtn"

export function Home(){
    return (
        <div className="flex overflow-x-hidden">
            <video src={GradientBg} autoPlay loop muted className="absolute" style={{minHeight: "100vh", width: "100vw", position: "absolute", objectFit: "cover", zIndex: "-1"}}/>
            <Logo/>
            <LoginBtn/>
            <div className="fixed w-[60rem] h-[42rem] right-28 bottom-[4rem] bg-white/30 backdrop-blur-2xl z-0"></div>
            <div className="fixed w-[18rem] h-[24rem] right-[41rem] bottom-[10rem] bg-white/40 backdrop-blur-2xl z-0 rounded-[3rem]"></div>
            <div className="fixed w-[24rem] h-[16rem] right-[14rem] top-[14rem] bg-white/40 backdrop-blur-2xl z-0 rounded-[3rem]"></div>
            <div className="fixed w-[32rem] h-[20rem] right-[6rem] top-[33rem] bg-white/40 backdrop-blur-2xl z-0 rounded-[3rem]"></div>
            <div className="content w-full m-36 grid grid-cols-3 z-50">
                <div className="col-span-2">
                    <h1 className="text-[100px] leading-tight text-dark-blue">Unleash Your Creativity at Mira</h1>
                    <div className="grid grid-cols-4 mb-20 mt-10 mx-4">
                        <p className="text-xl col-span-2">
                            💡 From logos, taglines and images to ad concepts, websites and marketing videos, revolutionize your marketing game with the magic of GenerativeAI-powered creativity 👾 
                        </p>
                    </div>
                    <div className="my-14 mx-4">
                        <Link to="/generator" className="text-2xl text-white px-10 py-6 bg-coral-red rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Get Started</Link>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}