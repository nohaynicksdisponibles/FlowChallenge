function Input(props){
    return(
        <div className="flex flex-wrap justify-center my-8">
            <input type="text" placeholder="  ciudad, estado, pais" className="mx-2 border-2 border rounded-lg" id="inputAEnviar"></input>
            <button className="mx-2 bg-blue-400 text-white px-4 rounded-lg" onClick={props.bringInformation}>Enviar</button>
        </div>
    );
}

export default Input