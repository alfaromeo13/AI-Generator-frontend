import { Link } from "react-router-dom"

function LoginBtn(){
    return (
        <div className="fixed mt-12 right-10">
            <Link to="/signin" className="mx-4 text-lg text-white px-8 py-3 bg-lavender rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Sign In</Link>
        </div>
    )
}

export default LoginBtn
