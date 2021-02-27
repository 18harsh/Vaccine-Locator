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
        primary: colors.STRONG_BLUE,
        accent: colors.BLUEISH_GREEN,
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
                        color:colors.BLUEISH_GREEN
                    }}>Get you Vaccine</Text>
                </View>
                <View style={styles.SplashScreen_ChildView2}>
                    <Button theme={theme} mode="outlined" onPress={()=>{
                        console.log("Hello World 123")
                    }}> Sign Up</Button>
                    <Text  style={{


                    }} >or</Text>
                    <Button theme={theme}  mode="outlined" onPress={()=>{
                    console.log("Hello World 123")
                }}> Log In</Button>
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
        backgroundColor: colors.STRONG_BLUE,
        color:'white',
        width:100,
        height:50,
        borderColor: colors.BLUEISH_GREEN,
        borderStyle: 'solid',
        paddingTop: 5,

    }
});
