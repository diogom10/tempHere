import {myLocation} from "../helpers/util";

export const getMyLocation = () => async (dispatch) => {
    const{success,lat,lng} = await myLocation();
    if(success){
        dispatch(saveLocation({lat,lng}));
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
