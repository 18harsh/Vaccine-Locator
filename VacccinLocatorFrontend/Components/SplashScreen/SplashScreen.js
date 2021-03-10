import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as planted_colors from "../Color";
import LottieView from "lottie-react-native";


export default class SplashScreen extends Component {


  render() {
    return (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <LottieView source={require("../../Components/Images/loading.json")} autoPlay loop />
          <Text style={{
            marginTop: 300,
            color: planted_colors.STRONG_RED,
            fontSize: 20,
          }}>The Vaccinator</Text>
        </View>
      </View>);

  };

}

const styles = StyleSheet.create(
  {
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: planted_colors.OFF_WHITE,
        flex: 1,
      },
  });
