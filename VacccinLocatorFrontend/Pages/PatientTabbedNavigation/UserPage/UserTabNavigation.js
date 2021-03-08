import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, BackHandler } from "react-native";
import * as planted_colors from "../../../Components/Color";
import { Button } from "react-native-paper";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LocationTab from "../LocationTab/LocationTab";
import VaccineTrack from "../VaccineTrack/UserHomeScreen";
import AppointmentsTab from "../AppointmentsTab/AppointmentsTab";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.OFF_WHITE,
  },
};


const UserTabbedNavigation = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  useEffect(() => {

    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);

  }, []);
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Location") {
            return (

              <Image style={{
                width: "80%",
                height: "100%",
              }} resizeMode="contain"
                     source={require("../../../Components/Images/locationIcon.png")} />


            );
          } else if (route.name === "Settings") {
            return (
              <Image style={{
                width: "80%",
                height: "100%",
              }} resizeMode="contain"
                     source={require("../../../Components/Images/settingsIcon.png")} />


            );
          } else if (route.name === "Appointment") {
            return (
              <Image style={{
                width: "80%",
                height: "100%",
              }} resizeMode="contain"
                     source={require("../../../Components/Images/bellIcon.png")} />


            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: planted_colors.STRONG_RED,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Location" component={LocationTab} />
      <Tab.Screen name="Appointment" component={AppointmentsTab} />
      <Tab.Screen name="Settings" component={VaccineTrack} />

    </Tab.Navigator>


  );


};

const styles = StyleSheet.create({
  SplashScreen_RootView:
    {

      justifyContent: "center",
      flex: 1,
      position: "absolute",
      width: "100%",
      height: "100%",
    },

  SplashScreen_ChildView:
    {
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: planted_colors.OFF_WHITE,
      flex: 1,
    },
  SplashScreen_ChildView2:
    {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: planted_colors.OFF_WHITE,
      flex: 1,
    },
  Button_css: {

    width: "80%",
    height: 50,
    paddingTop: 6,

  },
});

export default UserTabbedNavigation;
