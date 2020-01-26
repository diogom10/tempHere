import Geolocation from '@react-native-community/geolocation';

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


export const convertToCelcius = (data) => {
    return data
};

export const convertToFahrenheit = (data) => {
    return data
};