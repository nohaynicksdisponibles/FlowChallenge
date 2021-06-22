import CardWeather from "./CardWeather";

function CardsForecast(props){

    let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

    function objectToScreen(obj){
        let objetosParaForecast = []

        for (let i = 1; i < 6; i++) {
            let unix_timestamp = obj[i].dt;

            let date = new Date(unix_timestamp * 1000);
    
            let dia = date.getDate();
            let mes = date.getMonth();
    
            let fecha = dia+ " de " +meses[mes]; 

            objetosParaForecast.push(<CardWeather current={false} data={{
                icon: obj[i].weather[0].icon,
                fecha: fecha,
                description: obj[i].weather[0].description,
                temp_min: obj[i].temp.min,
                temp_max: obj[i].temp.max,
                pressure: obj[i].pressure,
                humidity: obj[i].humidity,
            }}/>)
        }

        return objetosParaForecast
    }

    return(// 
        <div className="flex flex-wrap justify-center my-4">
            {
                objectToScreen(props.data.daily)
            }
        </div>
    );
}

export default CardsForecast
