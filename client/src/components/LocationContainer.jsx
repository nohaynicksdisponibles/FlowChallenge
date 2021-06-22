function LocationContainer(props){

    function objectToScreen(obj){
        let properties = [];
        let values = [];
        for (let i in obj) {
            properties.push(i);
            values.push(obj[i])
        }

        let lines = properties.map((prop,index)=>{
            return(
                <div id={`${(new Date()).getTime()}`} className="flex my-2">
                    <span id={`${(new Date()).getTime()}`}>{prop}</span>
                    <span id={`${(new Date()).getTime()}`} className="flex-1"></span>
                    <span id={`${(new Date()).getTime()}`}>{values[index]}</span>
                </div>
            );
        })

        return lines
    }

    return(
        <div className="flex flex-column justify-center items-center content-center">
                {
                    props.city.hasOwnProperty("location")?
                    (props.location===true?
                    <div className="w-9/12 rounded-lg px-8 mt-4 divide-y divide-gray-200" style={{border:"1px solid #9ca3af"}}>
                        {objectToScreen(props.city.location)}
                    </div>:
                    <div className="w-full px-8 mt-4 divide-y divide-gray-200 my-8">
                        {objectToScreen(props.city.location)}
                    </div>
                    
                    ):<div></div>
                }
        </div>
    )
}

export default LocationContainer