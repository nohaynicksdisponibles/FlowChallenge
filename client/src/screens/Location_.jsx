import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import swal from 'sweetalert';
import LocationContainer from "../components/LocationContainer";
import spinner from "../public/spinner.gif"

function Location_(){

    const [city,setCity] = useState({});

    useEffect(()=>{
        bringLocation()
    },[])

    function bringLocation(){
        fetch(`${process.env.REACT_APP_API}/location`)
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

    return(
        <div>
            <Navbar></Navbar>
            {
                city.hasOwnProperty("location")?
                <LocationContainer city={city} location={true}/>:
                <div className="flex justify-center">
                     <img src={spinner} alt="spinner"/>
                </div>
               
            }
            
            <div className="h-5"></div>
        </div>
    );
}

export default Location_
