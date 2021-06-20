import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import swal from 'sweetalert';

function Location_(){

    const [city,setCity] = useState({});
    
    function bringLocation(){
        fetch(`${process.env.REACT_APP_LOCATION}/location`)
            .then(res=>res.json())
            .then(city=>{
                if (city.hasOwnProperty("err")) {
                    return swal("Error",city.err,"warning");
                }
                setCity(city)
            })
            .catch(err=>{
                swal("Error",err,"warning")
            })
    }

    useEffect(()=>{
        bringLocation()
    },[])

    return(
        <div>
            <Navbar></Navbar>
            <div className="flex flex-column justify-center items-center content-center">
                {
                    city.hasOwnProperty("location")?
                    <div className="w-9/12 rounded-lg px-8 mt-4" style={{border:"1px solid #9ca3af"}}>
                        <p>{city.location.city}</p>
                    </div>:<div></div>
                }
                <div>

                </div>
            </div>
        </div>
    );
}

export default Location_