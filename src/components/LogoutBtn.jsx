import { Link } from "react-router-dom"

function LogoutBtn(){
    return (
        <div className="fixed mt-10 right-10">
            <Link to="/" className="mx-4 text-lg text-white px-8 py-3 bg-lavender rounded-full drop-shadow-2xl hover:bg-dark-blue duration-300">Log Out</Link>
        </div>
    )
}

export default LogoutBtn
