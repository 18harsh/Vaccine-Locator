import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as planted_colors from "../../Components/Color";
import { Button } from "react-native-paper";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import ClinicDetailsScreen from "./ClinicDetails/ClinicDetails";
import ClinicHomeScreen from "./ClinicHomeScreen/ClinicHomeScreen";

import PatientsToday from "./PatientToday/PatientsToday";
import SetTimeSlots from "./SetTimeSlots/SetTimeSlots";

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
                     source={require("../../Components/Images/locationIcon.png")} />

            );
          } else if (route.name === "Details") {
            return (
              <Image style={{
                width: "80%",
                height: "100%",
              }} resizeMode="contain"
                     source={require("../../Components/Images/settingsIcon.png")} />


            );
          } else if (route.name === "Time Slots") {
            return (
              <Image style={{
                width: "80%",
                height: "100%",
              }} resizeMode="contain"
                     source={require("../../Components/Images/clock.png")} />


            );
          } else if (route.name === "Patients Today") {
            return (
              <Image style={{
                width: "80%",
                height: "100%",
              }} resizeMode="contain"
                     source={require("../../Components/Images/userIcon.png")} />


            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: planted_colors.STRONG_RED,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Location" component={ClinicHomeScreen} />

      <Tab.Screen name="Time Slots" component={SetTimeSlots} />

      <Tab.Screen name="Patients Today" component={PatientsToday} />

      <Tab.Screen name="Details" component={ClinicDetailsScreen} />
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
