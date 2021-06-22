function CardWeather(props){

    function objectToScreen(obj){
        let properties = [];
        let values = [];
        for (let i in obj) {
            properties.push(i);
            values.push(obj[i])
        }

        let lines = properties.map((prop,index)=>{
            return(
                <div className="flex my-2 flex-wrap">
                    <span id={`${(new Date()).getTime()}`}>{prop}</span>
                    <span id={`${(new Date()).getTime()}`} className="flex-1" style={{flexGrow:"1"}}></span>
                    <span id={`${(new Date()).getTime()}`}>{values[index]}</span>
                </div>
            );
        })

        lines[0] = (
            <div className="flex my-2 justify-center">
                <img src={"http://openweathermap.org/img/wn/"+props.data.icon+"@2x.png"} alt="weather icon" style={{width:"100px"}}/>
            </div>
        )

        return lines
    }

    return(// 
        <div className="flex justify-center my-4">
            <div className="md:w-1/2 rounded-lg shadow-xl" style={{padding:"5px 10px"}}>
            {
                objectToScreen(props.data)
            }
            </div>
        </div>
    );
}

export default CardWeather