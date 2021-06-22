import Navbar from '../components/Navbar';

function Home(){
    return(
        <>
            <Navbar/>
            <div className="flex justify-center">
        
                <div className="w-9/12 rounded-lg px-8 my-8" style={{border:"1px solid #9ca3af"}}>
                    <p className="text-center text-3xl text-blue-400 my-8">Como usar WeatherFlow?</p>
                    <p className="text-blue-400 my-5">Location: Devuelve los datos de ubicación según ip-api. En caso de utilizar un rango de ip no pública se mandará información con la ubicación de Telstra Corporation Ltd.</p>
                    <p className="text-blue-400 my-5">Current: Devuelve los datos de la ciudad escogida o la ubicación actual según ip-api y el estado del tiempo actual. En caso de no utilizar city y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.</p>
                    <p className="text-blue-400 my-5">Forescast: Devuelve los datos de la ciudad escogida o la ubicación actual según ip-api y el estado del tiempo a 5 días. En caso de no utilizar una ciudad y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.</p>
                </div>
            
            </div>
        </>
    );
}

export default Home;
