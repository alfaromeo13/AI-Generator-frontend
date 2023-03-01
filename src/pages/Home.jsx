import GradientBg from "../assets/gradient-bg.mp4"
import { Link } from "react-router-dom"

export function Home(){
    return (
        <div className="flex overflow-x-hidden">
            <video src={GradientBg} autoPlay loop muted className="absolute" style={{minHeight: "100vh", position: "absolute", objectFit: "cover", zIndex: "-1"}}/>
            <div className="fixed mt-12 right-10">
                <Link to="/login" className="mx-4 text-lg text-white px-8 py-3 bg-lavender rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Log In</Link>
            </div>
            <div className="fixed w-[64rem] h-[56rem] right-36 bottom-[6rem] bg-white/30 backdrop-blur-2xl z-0"></div>
            <div className="fixed w-[20rem] h-[28rem] right-[41rem] bottom-[16rem] bg-white/50 backdrop-blur-2xl z-0 rounded-3xl"></div>
            <div className="fixed w-[24rem] h-[16rem] right-[14rem] top-[26rem] bg-white/50 backdrop-blur-2xl z-0 rounded-3xl"></div>
            <div className="fixed w-[32rem] h-[20rem] right-[6rem] top-[45rem] bg-white/50 backdrop-blur-2xl z-0 rounded-3xl"></div>
            <div className="content w-full m-36 grid grid-cols-3 z-50">
                <div className="col-span-2">
                    <h1 className="text-[140px] leading-tight text-dark-blue">Unleash Your Creativity at EasyAds</h1>
                    <div className="grid grid-cols-4 my-14 mx-4">
                        <p className="text-xl col-span-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <Link to="/generator" className="mx-4 text-2xl text-white px-10 py-6 bg-coral-red rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Get Started</Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}