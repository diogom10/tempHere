import { combineReducers } from 'redux';
import user from './user.reducer';
const wrapeReducer = (state, action) => rootReducer(state, action);
const rootReducer = combineReducers({
    user,
});

export default wrapeReducer;
