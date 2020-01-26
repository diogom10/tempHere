import { combineReducers } from 'redux';
import dashboard from './dashboard.reducer';
const wrapeReducer = (state, action) => rootReducer(state, action);
const rootReducer = combineReducers({
    dashboard,
});

export default wrapeReducer;
