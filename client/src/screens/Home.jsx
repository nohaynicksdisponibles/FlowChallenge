import Navbar from '../components/Navbar';

function Home(){
    return(
        <div className="flex flex-col">
            <Navbar/>
            <div className="h-32 sm:h-6 md:h-0"></div>
            <div className="" style={{display: "flex", width: "100vw", height: "88vh", justifyContent: "center", alignItems: "center"}}>
                <div className="w-9/12 rounded-lg px-8" style={{border:"1px solid #9ca3af"}}>
                    <p className="text-center text-3xl text-blue-400 my-4">Como usar WeatherFlow?</p>
                    <p className="text-blue-400 my-4">Location: Devuelve los datos de ubicación según ip-api. En caso de utilizar un rango de ip no pública se mandará información con la ubicación de Telstra Corporation Ltd.</p>
                    <p className="text-blue-400 my-4">Current: Devuelve los datos de la ciudad escogida o la ubicación actual según ip-api y el estado del tiempo actual. En caso de no utilizar city y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.</p>
                    <p className="text-blue-400 my-4">Forescast: Devuelve los datos de la ciudad escogida o la ubicación actual según ip-api y el estado del tiempo a 5 días. En caso de no utilizar una ciudad y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;