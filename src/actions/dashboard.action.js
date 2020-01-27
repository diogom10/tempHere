import {dataPatternMetaWeather, myLocation} from "../helpers/util";
import {getTemperature, getWoeid} from "../apis/metaWeather.api";


/*Load the woeid*/
export const fetchingWoeid = (params) => async (dispatch) => {
    try {
        const {success, payload} = await getWoeid(params);
        console.log(payload)
        if (success) {
            return {success: true, payload};
        }
        return {success: false, message: 'Ocorreu um erro interno!'};
    } catch (e) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    }
};
/*Load the woeid*/

/*Load the temperature*/
export const fetchingTemperature = (params) => async (dispatch) => {
    try {
        let {success, payload} = await getTemperature(params);
        // Standardizes data from the metaWeather API
        return {success, payload: dataPatternMetaWeather(payload)};
    } catch (e) {
        console.log(e)
        return {success: false, message: 'Ocorreu um erro interno!'};
    }
};
/*Load the temperature*/


export const getMyLocation = () => async (dispatch) => {
    const {success, lat, lng} = await myLocation();
    if (success) {
        dispatch(saveLocation({lat, lng}));
    }
};

export const saveLocation = (location) => {
    return {
        type: 'ADD_LOCATION',
        location: location,
    };
};

export const deleteLocation = () => ({
    type: 'DELETE_LOCATION',
});
