import React, {Component} from 'react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './src/reducers/index.reducer';
import Dashboard from "./src/container/dashboard.container";
import {Provider, connect} from 'react-redux';
import {
    StyleSheet,
    AppRegistry,
    SafeAreaView,
    ActivityIndicator,
    View,
    StatusBar,
} from 'react-native';

import {name as appName} from './app.json';
import Colors from "./src/constants/colors.constant";

/** Cria a configuração do persist-store */
const persistConfig = {
    key: 'root',
    keyPrefix: '',
    storage:AsyncStorage,
    whitelist: ['user'],
    autoMergeLevel2,
    timeout: null,
};
// eslint-disable-next-line
const pReducer = persistReducer(persistConfig, rootReducer);
// eslint-disable-next-line
const composeEnhancer = compose;
const store = createStore(pReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);


class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={<LoadingAppContent/>}
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
