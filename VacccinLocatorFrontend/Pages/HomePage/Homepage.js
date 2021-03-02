import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../../Components/SplashScreen/SplashScreen";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import UserClinicPage from "../UserClinicPage/UserClinicPage";

export default class Homepage extends Component {
  state = {
    isVisible: false,
  };

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 5000);
  }


  render() {
    let Splash_Screen = <SplashScreen />;
    return (

      <View style={styles.MainContainer}>

        {
          (this.state.isVisible === true) ? Splash_Screen : <UserClinicPage/>
        }


      </View>
    );

  };

}

const styles = StyleSheet.create(
  {
    MainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

    },


    SplashScreen_ChildView:
      {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,

      },

  });
