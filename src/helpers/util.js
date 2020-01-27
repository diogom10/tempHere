import Geolocation from '@react-native-community/geolocation';

/*search my coordinates based on the geolocation of the cell phone */
export const myLocation = () => new Promise((resolve) => {
    const options = {
        enableHighAccuracy: true,
        timeout: 100,
        maximumAge: 0
    };

    Geolocation.getCurrentPosition(location => {
        const {coords} = location;
        const {latitude, longitude} = coords;
        resolve({success: true, lat: latitude, lng: longitude})
    }, async (error) => {
        resolve({success: false})
    });
});
/*search my coordinates based on the geolocation of the cell phone */

/* Convert Celsius to Fahrenheit */
export const convertToFahrenheit = (data) => parseInt((data * 9 / 5) + 32);


/* Standardize data from the MetaWeather api */
export const dataPatternMetaWeather = (params) => {
    console.log(params)
    return {
        city: params.title,
        temperature: parseInt(params.consolidated_weather[0].the_temp),
        nextTemperatures: params.consolidated_weather.map((value, index) => {
            return {
                temperature: parseInt(value.the_temp),
                date: value.applicable_date,
                type: value.weather_state_abbr
            }
        }),
    };
};
/* Standardize data from the MetaWeather api */

/* Convert Date */
export const convertDate = (date) => {
    console.log(date)
    date = date.split('-')
    return `${date[1]}/${date[2]}`
};
/* Convert Date */