import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardScreen from '../screens/dashboard/dashboard.screen';
import {fetchingTemperature, fetchingWoeid, getMyLocation} from "../actions/dashboard.action";

const mapStateToProps = state => ({
    location: state.dashboard.location
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchingWoeid,fetchingTemperature,getMyLocation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

