
const initialState = {
    location: null,
};

export default function product(state = initialState, action) {
    switch (action.type) {
        case 'ADD_LOCATION':
            return Object.assign({}, state, {
                location: action.location,
            });
        case 'DELETE_LOCATION':
            return Object.assign({}, state, {
                location: null,
            });
        default:
            return state;

    }
}
