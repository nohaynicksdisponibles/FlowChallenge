import { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import swal from "sweetalert";
import spinner from "../public/spinner.gif"
import CardsForecast from "../components/CardsForecast";
import LocationContainer from "../components/LocationContainer";

function Forecast(){

    const [city,setCity] = useState({});
    const [send,setSend] = useState(false);
    const [cargando,setCargando] = useState(false);

    function setValue(e){
        setSend(false);
        setCargando(true)
        bringInformation(e)
        setSend(true)
    }

    async function bringInformation(valor){
        let valorAEnviar;
        if (valor===undefined || valor===null || valor==="") {
           valorAEnviar = document.getElementById("inputAEnviar").value;
        }else{
            valorAEnviar= valor;
        }

        if (valorAEnviar.trim().length === 0) {
            try{
            let current = await fetch(`${process.env.REACT_APP_API}/forecast`)
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
            let current = await fetch(`${process.env.REACT_APP_API}/forecast?city=${valorAEnviar}`)
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

    function toggle() {
        document.getElementById("myDropdown").classList.toggle("show");
      }

    return(
        <div>
            <Navbar></Navbar>
            <Input bringInformation={()=>{setValue("")}}/>
            <div className="flex">
                <div className="flex-1"></div>
                <div class="dropdown mr-4 bg-blue-400 rounded-lg">
                    <button onClick={toggle} class="dropbtn">Escoger ciudad</button>
                    <div id="myDropdown" class="dropdown-content">
                        <p className="text-center hover:bg-gray-300 cursor-pointer" onClick={()=>{setValue("san miguel, buenos aires, argentina")}}>San Miguel</p>
                        <p className="text-center hover:bg-gray-300 cursor-pointer" onClick={()=>{setValue("caballito")}}>Caballito</p>
                        <p className="text-center hover:bg-gray-300 cursor-pointer" onClick={()=>{setValue("campo de mayo")}}>Campo de Mayo</p>
                        <p className="text-center hover:bg-gray-300 cursor-pointer" onClick={()=>{setValue("viedma")}}>Viedma</p>
                        <p className="text-center hover:bg-gray-300 cursor-pointer" onClick={()=>{setValue("rosario")}}>Rosario</p>
                    </div>
                </div>
            </div>
            {
                cargando===true?<p className="text-blue-400 text-center">Cargando...</p>:<div></div>
            }
            <div id="divCurrent" className="flex justify-center">
                {
                    send === false ? <p id="vacio" className="text-blue-400 text-3xl text-center">Ingrese una ciudad</p>:
                    (city.hasOwnProperty("location")? 
                    <div className="w-9/12 rounded-lg px-8 mt-4 mb-10 divide-y divide-gray-200" style={{border:"1px solid #9ca3af"}}>
                            <CardsForecast data={city.forecast}/>
                            <LocationContainer city={city} location={false}/>
                    </div>:<img src={spinner} alt="spinner"/>)
                }
            </div>
        </div>
    );
}

export default Forecast