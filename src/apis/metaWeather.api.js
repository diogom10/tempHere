import Config from "../constants/config.constant";

/*Collect the woeid to get the correct city temperature*/
export const getWoeid = async (params) => {
    try {
        const {lat, lng} = params
        const response = await fetch(`${Config.META_WEATHER_API}/search/?lattlong=${lat},${lng}`, {
            method: 'GET',
        });
        if (response.status === 200) {
            return {success: true, payload: await response.json()};
        }
        return {success: false, message: 'Ocorreu um erro interno!'};
    } catch (error) {
        console.log(error)
        return {success: false, message: 'Ocorreu um erro interno!'};
    }
};
/*Collect the woeid to get the correct city temperature*/


/*City temperature based on woeid*/
export const getTemperature = async (params) => {
    console.log(params)
    try {
        const response = await fetch(`${Config.META_WEATHER_API}/${params}`, {
            method: 'GET',
        });
        console.log(response)
        if (response.status === 200) {
            return {success: true, payload: await response.json()};
        }
        return {success: false, message: 'Ocorreu um erro interno!'};
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    }
};
/*City temperature based on woeid*/

