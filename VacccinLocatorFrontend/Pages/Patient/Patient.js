import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as planted_colors from "../../Components/Color";
import { Button } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const theme = {

  roundness: 4,
  colors: {
    placeholder: "white", text: planted_colors.BLUEISH_GREEN, primary: planted_colors.BLUEISH_GREEN,
    underlineColor: "black", background: planted_colors.LIGHT_BLUE,
  },
};


const Patient = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.SplashScreen_RootView}>
      <View style={styles.SplashScreen_ChildView}>
        <Image
          source={require("../../Components/Images/vaccine.png")}
        />
        <Text style={{
          color: planted_colors.STRONG_RED,
          fontSize: 15,
        }}>Get your Vaccination</Text>
      </View>
      <View style={styles.SplashScreen_ChildView2}>
        <Button theme={theme} style={styles.Button_css} mode="contained"
                onPress={() => navigation.navigate("PatientSignUp")}>
          <Text style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 18,
            color: planted_colors.OFF_WHITE,
          }} mode="contained" onPress={() => navigation.navigate("PatientLogin")}>
            Sign Up </Text>   <FontAwesome size={18} color={planted_colors.OFF_WHITE} name="plus-square"/>
        </Button>

        <Text style={{
          marginTop: 50,
          marginBottom: 10,
          fontSize: 15,
          color: planted_colors.STRONG_RED,
        }} mode="contained" onPress={() => navigation.navigate("PatientLogin")}>
          Signed Up Already, Try Logging
          In</Text>
      </View>

    </View>

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
    fontSize:18,
    color:planted_colors.OFF_WHITE

  },
});

export default Patient;
