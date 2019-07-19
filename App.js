import React from 'react';
import {Asset, Font, registerRootComponent} from 'expo';
import {StyleSheet, Text, View} from 'react-native';
import AppContainer from './navigation/AppNavigation';
import {Provider} from 'react-redux';
import {createStore} from "redux";
import allReducers from './reducers';

let store = createStore(allReducers);


class App extends React.Component {


    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        );
    }

}

export default App



