import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as colors from "../../Color";
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.BLUEISH_GREEN,
        accent: colors.OFF_WHITE,
    },
};


export default class Authentication extends Component {
    state = {
        isVisible: true
    }


    render() {

        return (
            <View style={styles.SplashScreen_RootView}>
                <View style={styles.SplashScreen_ChildView}>
                    <Image
                        source={require('../Images/vaccine.png')}
                    />
                    <Text style={{
                        color:colors.STRONG_RED,
                        fontSize:15
                    }}>Get your Vaccination</Text>
                </View>
                <View style={styles.SplashScreen_ChildView2}>
                    <Button theme={theme} style={styles.Button_css} mode="contained" onPress={()=>{
                        console.log("Hello World 123")
                    }}> Sign Up</Button>

                    <Text style={{
                        marginTop:10,
                        marginBottom:10,
                        fontSize:15,
                        color:colors.STRONG_RED
                    }} mode="contained" onPress={()=>{
                    console.log("Hello World 123")
                }}>Signed Up Already, Try Logging In</Text>
                </View>

            </View>

        );

    };

}

const styles = StyleSheet.create({
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
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: colors.OFF_WHITE,
            flex: 1,
        },
    SplashScreen_ChildView2:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.OFF_WHITE,
            flex: 1,
        },
    Button_css: {

        width:"80%",
        height:50,
        paddingTop:6,

    }
});
