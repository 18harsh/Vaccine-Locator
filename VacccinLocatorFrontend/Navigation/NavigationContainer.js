import React, { Component } from "react";
import Homepage from "../Pages/HomePage/Homepage";
import PatientSignup from "../Pages/Patient/Signup/Signup";
import PatientLogin from "../Pages/Patient/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PatientAuthentication from "../Pages/Patient/Patient";
import * as colors from "../Components/Color";
import VaccinationClinic from "../Pages/VacinationClinic/VaccinationClinic";
import VaccinationClinicSignUp from "../Pages/VacinationClinic/Signup/Signup";
import VaccinationClinicLogin from "../Pages/VacinationClinic/Login/Login";
import UserTabbedNavigation from "../Components/UserPage/UserTabNavigation";


export default class App extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Home" component={Homepage} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="PatientAuthentication" component={PatientAuthentication} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="PatientSignUp" component={PatientSignup} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="PatientLogin" component={PatientLogin} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="VaccinationClinic" component={VaccinationClinic} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="VaccinationClinicSignUp" component={VaccinationClinicSignUp} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="VaccinationClinicLogin" component={VaccinationClinicLogin} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
          <Stack.Screen name="UserTabbedNavigation" component={UserTabbedNavigation} options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.OFF_WHITE,
            },
            headerTintColor: colors.OFF_WHITE,
          }} />
        </Stack.Navigator>

      </NavigationContainer>

    );

  };

}


