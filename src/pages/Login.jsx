import { useState, useEffect } from 'react';
import BgAuth from "../assets/bg-auth.png"
import { Link } from "react-router-dom"
import Logo from "../components/Logo" 

export function Login(){

    return (
        <div className="flex overflow-x-hidden bg-auth bg-cover	min-h-screen flex justify-center">
            {/* <div className="fixed mt-12 right-10">
                <Link to="/login" className="mx-4 text-lg text-white px-8 py-3 bg-lavender rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Log In</Link>
            </div> */}
            <Logo />
            <div className="content w-3/12 m-36 z-50">
                <h1 className="text-4xl text-left leading-tight text-dark-blue flex-grow my-4">Welcome back!</h1>
                <form>
                    <div>
                        <input type="email" id="email" className="bg-white/70 w-full py-4 px-8 my-2 border-2 border-white/50 rounded-full" placeholder="Email" required />
                    </div> 
                    <div>
                        <input type="password" className="bg-white/70 w-full py-4 px-8 my-2 border-2 border-white/50 rounded-full" placeholder="Password" required />
                    </div> 
                    <button type="submit" className="bg-lavender w-full py-4 px-8 my-4 text-xl text-white rounded-full drop-shadow-2xl">Sign In</button>
                </form>
            </div>
        </div>
    )
}