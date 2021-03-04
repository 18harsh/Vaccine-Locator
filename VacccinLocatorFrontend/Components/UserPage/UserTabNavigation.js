import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as planted_colors from "../Color";
import { Button } from "react-native-paper";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import UserHomeScreen from "../UserHomeScreen/UserHomeScreen";
import VaccineTrack from "../VaccineTrack/UserHomeScreen";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Icon from 'react-native-vector-icons/FontAwesome5';
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
              <EvilIcons name="location" size={30} color="#900" />
            );
          } else if (route.name === "Settings") {
            return (
              <EvilIcons name="user" size={30} color="#900" />

            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: planted_colors.STRONG_RED,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Location" component={UserHomeScreen} />

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
