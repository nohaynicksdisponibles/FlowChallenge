import { Link } from "react-router-dom";
import logo from "../public/logo.png"

function Navbar(){
    return(
        <div className="bg-blue-300 flex">
            <Link to="/">
                <img src={logo} style={{width: "50px",margin:"5px 2px",paddingLeft:"5px"}} alt="logo"/>
            </Link>

            <span className="flex-1"></span>

            <div className="flex" >
                <Link className="py-2 px-4 hover:bg-blue-400 text-white pt-4" to="/location">Location</Link>
                <Link className="py-2 px-4 hover:bg-blue-400 text-white pt-4" to="/current">Current</Link>
                <Link className="py-2 px-4 hover:bg-blue-400 text-white pt-4" to="/forecast">Forecast</Link>
            </div>
        </div>
    );
}

export default Navbar;