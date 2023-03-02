import { Link } from "react-router-dom"

function Logo(){
    return (
        <div className="fixed mt-12 left-10">
            <Link to="/" className="text-lg leading-tight text-dark-blue">Mira</Link>
        </div>
    )
}

export default Logo