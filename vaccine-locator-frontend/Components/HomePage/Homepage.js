import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Appbar} from 'react-native-paper';

import Authentication from "../Authentication/Authentication";
import {NavigationContainer} from "@react-navigation/native";
import SplashScreen from "../SplashScreen/SplashScreen";
export default class Homepage extends Component {
    state = {
        isVisible: false
    }

    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen()
        }, 5000);
    }



    render() {
        let Splash_Screen = <SplashScreen/>
        return (

                <View style={styles.MainContainer}>

                    {
                        (this.state.isVisible === true) ? Splash_Screen : <Authentication/>
                    }

                {/*<MapView*/}
                {/*    // remove if not using Google Maps*/}
                {/*    style={styles.map}*/}
                {/*    loadingEnabled={true}*/}
                {/*    region={{*/}
                {/*        latitude: 19.2029,*/}
                {/*        longitude:72.8518,*/}
                {/*        latitudeDelta: 0.1,*/}
                {/*        longitudeDelta: 0.0121,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Marker coordinate={{*/}
                {/*        latitude: 19.2029,*/}
                {/*        longitude:72.8518,*/}
                {/*    }}/>*/}
                {/*</MapView>*/}
                </View>
        );

    };

}

const styles = StyleSheet.create(
    {
        MainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },


        SplashScreen_ChildView:
            {
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1

            }
    });
