import { useState, useEffect } from 'react';
import BgAuth from "../assets/bg-auth.png"
import { Link } from "react-router-dom"
import Logo from "../components/Logo" 
import axios from 'axios';


export function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://deep-dream-backend.onrender.com/api/user/registration', {
        email,
        password,
        username,
      });
      console.log(response.data);
      window.location.href('/login')
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      // Handle error here
    }
  };

    return (
        <div className="flex overflow-x-hidden bg-auth bg-cover	min-h-screen flex justify-center">
            {/* <div className="fixed mt-12 right-10">
                <Link to="/login" className="mx-4 text-lg text-white px-8 py-3 bg-lavender rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Log In</Link>
            </div> */}
            <Logo />
            <div className="content w-3/12 m-36 z-50">
                <h1 className="text-4xl  leading-tight text-center text-dark-blue flex-grow my-4">Register </h1>
                <form onSubmit={handleRegistration}>
                {errorMessage && <div className="text-red-700">{errorMessage}</div>}
                    <div>
                        <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} className="bg-white/70 w-full py-4 px-8 my-2 border-2 border-white/50 rounded-full" placeholder="Email" required />
                    </div> 
                    <div>
                        <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} className="bg-white/70 w-full py-4 px-8 my-2 border-2 border-white/50 rounded-full" placeholder="Username" required />
                    </div> 
                    <div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/70 w-full py-4 px-8 my-2 border-2 border-white/50 rounded-full" placeholder="Password" required />
                    </div> 
                    <button type="submit" className="bg-lavender w-full py-4 px-8 my-4 text-xl text-white rounded-full drop-shadow-2xl">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;