import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as planted_colors from "../Color";
import {Button} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import UserHomeScreen from "../UserHomeScreen/UserHomeScreen";
import VaccineTrack from "../VaccineTrack/UserHomeScreen";

const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: planted_colors.BLUEISH_GREEN,
        accent: planted_colors.OFF_WHITE,
    },
};


const Authentication = () => {
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();
    return (

            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === 'Home') {
                            return (
                                <Ionicons
                                    name={
                                        focused
                                            ? 'ios-information-circle'
                                            : 'ios-information-circle-outline'
                                    }
                                    size={size}
                                    color={color}
                                />
                            );
                        } else if (route.name === 'Settings') {
                            return (
                                <Ionicons
                                    name={focused ? 'ios-list-box' : 'ios-list'}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={UserHomeScreen} options={{tabBarBadge: 3}}/>
                <Tab.Screen name="Settings" component={VaccineTrack}/>
            </Tab.Navigator>


    );


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
            backgroundColor: planted_colors.OFF_WHITE,
            flex: 1,
        },
    SplashScreen_ChildView2:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: planted_colors.OFF_WHITE,
            flex: 1,
        },
    Button_css: {

        width: "80%",
        height: 50,
        paddingTop: 6,

    }
});

export default Authentication;
