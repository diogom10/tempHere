import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardScreen from '../screens/dashboard/dashboard.screen';

const mapStateToProps = state => ({
    location: state.user.location
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(null, null)(DashboardScreen);

