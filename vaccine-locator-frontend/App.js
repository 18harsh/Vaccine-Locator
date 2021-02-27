import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import Homepage from "./Components/HomePage/Homepage";
import Authentication from './Components/Authentication/Authentication'



export default class App extends Component {
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

    }});
