import { Link } from "react-router-dom"
import MiraLogo from "../assets/mira-logo.svg"


function Logo(){
    return (
        <div className="fixed mt-4 left-10">
            <Link to="/" className="text-lg leading-tight text-dark-blue">
                <img src={MiraLogo} alt="Mira-Logo" />
            </Link>
        </div>
    )
}

export default Logo