const fetch = require("node-fetch");
// FUNCION QUE RETORNA UN OBJETO EN EL CASO DE NO PROVEER NI CITY NI IP
function obtainObject(){
    return {
        query: "139.130.4.5",
        status: "success",
        continent: "Oceania",
        continentCode: "OC",
        country: "Australia",
        countryCode: "AU",
        region: "WA",
        regionName: "Western Australia",
        city: "Broome",
        district: "",
        zip: "6725",
        lat: -17.9668,
        lon: 122.2387,
        timezone: "Australia/Perth",
        offset: 28800,
        currency: "AUD",
        isp: "Telstra Internet",
        org: "",
        as: "AS1221 Telstra Corporation Ltd",
        asname: "ASN-TELSTRA",
        mobile: false,
        proxy: true,
        hosting: false
    }
}

function obtainOpenApi(){
  return {
    "openapi": "3.1.0",
    "info":{
        "title": "Flow Challenge",
        "description": "App de clima, Flow Challenge",
        "contact": {
            "name": "Jonathan Sosa",
            "url": "https://www.linkedin.com/in/jonathan-sosa-9711601ab/",
            "email": "jonathanezequielsosa@hotmail.com"
          },
        "version": "1.0.0",
    },
    "paths":{
        "/location": {
            "get": {
                "summary": "Obtener información acerca de la ubicación",
                "description": "Devuelve los datos de ubicación city según ip-api. En caso de utilizar una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd ",
                "responses":{
                    "200": {
                        "description": "ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "description": "Objeto enviado por ip-api con información de referencia al lugar al cual le fue asignado la ip"
                                }
                                       
                            }
            
                        }
                    }
                }
            }
        },
        "/current[city]": {
            "get": {
                "summary": "Obtener información acerca de la ciudad actual y el clima del día",
                "description": "City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual. En caso de no utilizar city y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.",
                "responses":{
                    "200": {
                        "description": "ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "description": "Objeto enviado por ip-api con información de referencia al lugar al cual le fue asignado la ip y el clima del lugar",
                                }
                                       
                            }
            
                        }
                    }
                },
                "parameters": {
                    "in": "query",
                    "schema":{
                        "type": "string",
                        "description": "nombre de la ciudad separado por coma con la provincia/estado y pais. ejemplo: san miguel, buenos aires, argentina"
                    }
                }
            }
        },
        "/forescast[city]": {
            "get": {
                "summary": "Obtener información de la ciudad actual y el clima a 5 dias posteriores",
                "description": "City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicaciónactual segúnip-api y el estado del tiempo a 5 días. En caso de no utilizar una ciudad y tener una ip de rango no pública se mandará información con la ubicación de Telstra Corporation Ltd.",
                "responses":{
                    "200": {
                        "description": "ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "description": "Objeto enviado por ip-api con información de referencia al lugar al cual le fue asignado la ip",
                                }
                                       
                            }
            
                        }
                    }
                },
                "parameters": {
                    "in": "query",
                    "schema":{
                        "type": "string",
                        "description": "nombre de la ciudad separado por coma con la provincia/estado y pais. ejemplo: san miguel, buenos aires, argentina"
                    }
                }
            }
        }
        
      }
  }
}
// FUNCION QUE BRINDARA INFORMACIÓN ACERCA DE LA APP
const v1 = (req, res) => {
    return res.json(obtainOpenApi());
}

const location = (req, res) => {
    fetch(`http://ip-api.com/json/${req.ip}`)
      .then(response=>response.json())
      .then(location=>{
        if(location.status=="fail"){// ns1.telstra.net
          return res.json({
            location: obtainObject(),
          })
        }
  
        res.json({
          location
        });
      }).catch(err=>{
         return res.json({
           err: "occurio un error inesperado"
         })
      });
}
// FUNCION QUE RETORNARA INFORMACION DE CITY Y CLIMA, SI NO SE PROVEE CITY ENTONCES
// RETORNARA INFORMACIÓN Y CLIMA DEL ISP TELSTRA
const current = (req, res) => {
    if( req.query.city ){
  
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.API_WEATHER_TOKEN}&lang=sp&units=metric`)
          .then(data=>data.json())
          .then(weather=>{
  
              res.json({
                location: {
                  lat: weather.coord.lat,
                  lon: weather.coord.lon,
                  countryCode: weather.sys.country,
                  city: weather.name,
                },
                weather
              });
        
          }).catch(err=>{
            res.status(400).json({
              err: "Ups, ocurrió un error inesperado"
          })
        });
  
    }else{
  
      fetch(`http://ip-api.com/json/139.130.4.5`)
          .then(response=>response.json())
          .then(location=>{
  
              fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.hasOwnProperty("lat") ? location.lat: -34.603684}&lon=${location.hasOwnProperty("lon") ? location.lon: -58.381559}&exclude=hourly,minutely,alerts&appid=${process.env.API_WEATHER_TOKEN}&lang=sp&units=metric`)
                .then(data=>data.json())
                .then(weather=>{
  
                  res.json({
                    location,
                    weather: {
                      coord: {
                        lat: weather.lat,
                        lon: weather.lon,
                      },
                      weather: weather.daily[0].weather,
                      main: {
                        temp: weather.current.temp,
                        feels_like: weather.current.feels_like,
                        temp_min: weather.daily[0].temp.min,
                        temp_max: weather.daily[0].temp.max,
                        pressure: weather.current.pressure,
                        humidity: weather.current.humidity,
                        visibility: weather.current.visibility,
                        wind: {
                          speed: weather.current.wind_speed,
                          deg: weather.current.wind_deg
                        },
                        clouds: weather.current.clouds,
                        dt: weather.current.dt,
                        sys: {
                          sunrise: weather.current.sunrise,
                          sunset: weather.current.sunset,
                        },
                        timezone: weather.timezone_offset,
                        },
                    },
                  })
  
                }).catch(err=>{
                  res.status(400).json({
                    location,
                    err
                  })
                })
  
          }).catch(err=>{
            res.status(400).json({
              err: "Ups, ocurrió un error inesperado"
            })
          });
  
    }
    
}
// FUNCION QUE DEVUELVE EL TIEMPO SEMANAL PARA LUEGO FILTRAR 5 DIAS POSTERIORES EN EL FRONT
const forecast = (req, res) => {

    if( req.query.city ){
      // BUSCA POR NOMBRE CIUDAD PARA OBTENER LAS COORDENADAS DE LA MISMA
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.API_WEATHER_TOKEN}&lang=sp&units=metric`)
          .then(data=>data.json())
          .then(ubicacionCiudad=>{
              // CON LAS COORDENADAS ENCUENTRO EL CLIMA SEMANAL
              fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${ubicacionCiudad.coord.lat}&lon=${ubicacionCiudad.coord.lon}&exclude=hourly,minutely,alerts&appid=${process.env.API_WEATHER_TOKEN}&lang=sp&units=metric`)
                  .then(data=>data.json())
                  .then(forecast=>{
  
                      res.json({
                        location: {
                          lat: ubicacionCiudad.coord.lat,
                          lon: ubicacionCiudad.coord.lon,
                          countryCode: ubicacionCiudad.sys.country,
                          city: ubicacionCiudad.name,
                        },
                        forecast
                      })
  
                  }).catch(err=>{
                    return res.json({err})
                  })
        
          }).catch(err=>{
            res.status(400).json({
              err: "Ups, ocurrió un error inesperado"
          })
        });
  
    }else{
      // SI SE PROVEE IP SE MANDA LA INFORMACION DEL LUGAR
      fetch(`http://ip-api.com/json/${req.ip}`)
          .then(response=>response.json())
          .then(location=>{
              // SE SUMA EL CLIMA A LA INFORMACION DEL LUGAR
              fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.hasOwnProperty("lat") ? location.lat: -17.9668}&lon=${location.hasOwnProperty("lon") ? location.lon: 122.2387}&exclude=hourly,minutely,alerts&appid=${process.env.API_WEATHER_TOKEN}&lang=sp&units=metric`)
                .then(data=>data.json())
                .then(forecast=>{
  
                  if(location.status=="fail"){
                      res.json({
                        location: obtainObject(),
                        forecast
                      })
                  }else{
                      res.json({
                        location,
                        forecast
                      })
                  }
  
                }).catch(err=>{
                  res.status(400).json({
                    location,
                    err
                  })
                })
  
          }).catch(err=>{
            res.status(400).json({
              err: "Ups, ocurrió un error inesperado"
            })
          });
  
    }
}

module.exports = {
    forecast,
    current,
    location,
    v1,
    obtainOpenApi
}