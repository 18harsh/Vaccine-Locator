import React, {Component} from 'react';
import Homepage from "./Components/HomePage/Homepage";
import Signup from "./Components/Authentication/Signup/Signup";
import Login from "./Components/Authentication/Login/Login";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as colors from './Components/Color'
import UserDisplayScreen from "./Components/UserPage/UserDisplayScreen";
export default class App extends Component {

    render() {
        const Stack = createStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} >
                    <Stack.Screen name="Home" component={Homepage} options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: colors.OFF_WHITE
                        },
                        headerTintColor: colors.OFF_WHITE
                    }}/>
                    <Stack.Screen name="SignUp" component={UserDisplayScreen} options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: colors.OFF_WHITE
                        },
                        headerTintColor: colors.OFF_WHITE
                    }}/>
                    <Stack.Screen name="Login" component={Login} options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: colors.OFF_WHITE
                        },
                        headerTintColor: colors.OFF_WHITE
                    }}/>
                </Stack.Navigator>

            </NavigationContainer>
        );

    };

}


