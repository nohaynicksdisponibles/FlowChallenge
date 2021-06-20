import Navbar from '../components/Navbar';

function Error(){
    return(
        <div className="flex flex-col">
            <Navbar/>
            <p className="text-center text-3xl text-blue-400">Error! página no encontrada</p>
        </div>
    );
}

export default Error;