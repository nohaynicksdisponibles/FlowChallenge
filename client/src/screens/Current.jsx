import { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input"
import swal from "sweetalert";
import CardWeather from "../components/CardWeather"
import spinner from "../public/spinner.gif"
import LocationContainer from "../components/LocationContainer";

function Current(){

    const [city,setCity] = useState({});
    const [send,setSend] = useState(false);
    const [cargando,setCargando] = useState(false);

    function setValue(e){
        setSend(false);
        setCargando(true)
        bringInformation()
        setSend(true)
    }

    async function bringInformation(){
        let valorAEnviar = document.getElementById("inputAEnviar").value;

        if (valorAEnviar.trim().length === 0) {
            try{
            let current = await fetch(`${process.env.REACT_APP_API}/current`)
            let res = await current.json()
            if(res.hasOwnProperty("err")){
                swal("Error",res.err,"warning")
            }
            setCargando(false)
            setCity(res)
            return;
            }catch(err){
                swal("Error","Ciudad no encontrada","warning")
            }
            return
        }

        try{
            let current = await fetch(`${process.env.REACT_APP_API}/current?city=${valorAEnviar}`)
            let res = await current.json()
            if(res.hasOwnProperty("err")){
                swal("Error",res.err,"warning")
            }
            setCargando(false)
            setCity(res)
            
            return;
        }catch(err){
            swal("Error","Ciudad no encontrada","warning")
        }
        return
    }

    return(
        <div>
            <Navbar></Navbar>
            <Input bringInformation={setValue}/>
            {
                cargando===true?<p className="text-blue-400 text-center">Cargando...</p>:<div></div>
            }
            <div id="divCurrent" className="flex justify-center">
                {
                    send === false ? <p id="vacio" className="text-blue-400 text-3xl text-center">Ingrese una ciudad</p>:
                    (city.hasOwnProperty("location")? 
                    <div className="w-9/12 rounded-lg px-8 mt-4 mb-10 divide-y divide-gray-200" style={{border:"1px solid #9ca3af"}}>
                            <CardWeather id={`${(new Date()).getTime()}`} current={true} data={{
                            icon: city.weather.weather[0].icon,
                            description: city.weather.weather[0].description,
                            temp: city.weather.main.temp,
                            feels_like: city.weather.main.feels_like,
                            temp_min: city.weather.main.temp_min,
                            temp_max: city.weather.main.temp_max,
                            pressure: city.weather.main.pressure,
                            humidity: city.weather.main.humidity,
                            }}/>
                            <LocationContainer city={city} location={false}/>
                    </div>:<img src={spinner} alt="spinner"/>)
                }
            </div>
        </div>
    );
}

export default Current