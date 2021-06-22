# FlowChallenge

Las estructuras de carpetas correspondientes fueron creadas con el comando express para el back, y create-react-app para el front, creando y eliminando las carpetas necesarias.
Se debe realizar npm i en ambas carpetas para instalar las librerias correspondientes, a pesar de que en frontend se utiliza TailwindCSS no lo verás instalado porque está como CDN dentro del index.html.
Para correr localmente se debe crear un archivo .env en la carpeta api con la variable de entorno API_WEATHER_TOKEN. En la misma debe ir tu API Key de Open Weather. En la carpeta Client debes crear un archivo .env que contenga la variable de entorno CREATE_REACT_APP y la direccion de host + puerto donde corre el servidor, ejemplo: http//localhost:3001.

En el backend se pueden correr los test correspondientes con el comando npm run test. No hay tests para el frontend.
El backend fue deployado en heroku: https://flowchallenge.herokuapp.com 
y el front en Vercel: https://flow-challenge.vercel.app/

Todas las rutas devuelven un objeto JSON con la información correspondiente

/v1: Devuelve información del backend según OpenAPI

/location: Devuelve los datos de ubicación según ip-api. En caso de utilizar un rango de ip no pública se mandará información con la ubicación de Telstra Corporation Ltd.

/current[city]: El parametro city es opcional. Devuelve los datos de la ciudad escogida o la ubicación actual según ip-api y el estado del tiempo actual. En caso de no utilizar city y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.

/forescast[city]: El parametro city es opcional. Devuelve los datos de la ciudad escogida o la ubicación actual según ip-api y el estado del tiempo a 5 días. En caso de no utilizar una ciudad y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.
