import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as planted_colors from '../Color'
export default class SplashScreen extends Component {


    render() {
        return (
            <View style={styles.SplashScreen_RootView}>
                <View style={styles.SplashScreen_ChildView}>
                    <Image
                        source={require('../Images/vaccine.png')}
                    />
                    <Text style={{
                        color:planted_colors.BLUEISH_GREEN
                    }}>Get you Vaccine</Text>
                </View>
            </View>)

    };

}

const styles = StyleSheet.create(
    {
        SplashScreen_RootView:
            {
                justifyContent: 'center',
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
            },

        SplashScreen_ChildView:
            {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: planted_colors.OFF_WHITE,
                flex: 1,
            },
    });
