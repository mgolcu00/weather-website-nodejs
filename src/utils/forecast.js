const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b0838bfa73c85616d4e4b6359c89ac12&query=' + latitude + ',' + longitude;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unabel Connect To Weather Services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {

            const currentDegree = response.body.current.temperature;
            const feelsDegree = response.body.current.feelslike;
            const weather_descriptions = response.body.current.weather_descriptions;
            callback(undefined, weather_descriptions+` . It is currently ${currentDegree} degrees out.    It feels like  ${feelsDegree} degrees out.`)
        }
    })


}

module.exports = forecast;