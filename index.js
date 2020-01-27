import React, {Component} from 'react';
import Dashboard from "./src/container/dashboard.container";
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    AppRegistry,
    SafeAreaView,
    ActivityIndicator,
    View,
    StatusBar,
} from 'react-native';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './src/reducers/index.reducer';
import {Provider} from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {name as appName} from './app.json';
import Colors from "./src/constants/colors.constant";
import Config from "./src/constants/config.constant";
import {getMyLocation, saveLocation} from "./src/actions/dashboard.action";


/** Cria a configuração do persist-store */
const persistConfig = {
    key: 'dashboard',
    keyPrefix: '',
    storage: AsyncStorage,
    whitelist: ['dashboard'],
    timeout: null,
};
// eslint-disable-next-line
const pReducer = persistReducer(persistConfig, rootReducer);
// eslint-disable-next-line
const composeEnhancer = compose;
const store = createStore(pReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);

MapboxGL.setAccessToken(Config.MAPBOX_KEY);

class Root extends Component {

    initLocation = async () => {
        await store.dispatch(getMyLocation());
    };

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    onBeforeLift={this.initLocation}
                >
                    <SafeAreaView style={styles.pageSafeAreaView}>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor={Colors.BLACK}
                            translucent
                        />
                        <Dashboard/>
                    </SafeAreaView>
                </PersistGate>
            </Provider>
        );
    }
}

// "react-native-fbsdk": "^0.8.0",
const LoadingAppContent = () => (
    <View style={styles.loadingAppContent}>
        <ActivityIndicator size="large" color={Colors.WHITE}/>
    </View>
);

const styles = StyleSheet.create({
    pageSafeAreaView: {
        flex: 1, marginTop: 23,
    },
    loadingAppContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


AppRegistry.registerComponent(appName, () => Root);
