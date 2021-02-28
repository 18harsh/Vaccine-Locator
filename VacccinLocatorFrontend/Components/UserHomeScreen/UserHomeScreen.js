import React, { Component } from "react";
import { Text, View, Button, Alert, Image, StyleSheet, Platform } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import * as planted_colors from "../Color";
import Geolocation from "@react-native-community/geolocation";
import { request, PERMISSIONS } from "react-native-permissions";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.OFF_WHITE,
  },
};


class MyReactNativeForm extends Component {

  state = {
    latitude: 0,
    longitude: 0,
    locationStatus: false,
    errorMessage: "",
    loading: true,
  };


  async componentDidMount() {
    if (Platform.OS === "android") {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log("Android Location REUBEN", response);
      if (response === "granted") {

        Geolocation.getCurrentPosition(position => {
          console.log(JSON.stringify(position.coords.latitude));
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            locationStatus: true,
          });
        });
      }

    }

  }


  render() {
    return (
      <View style={styles.MainContainer}>
        {console.log("latitude", this.state.latitude, this.state.longitude)}
        <MapView
          provider={PROVIDER_GOOGLE}
          // remove if not using Google Maps
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={{
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
          }}
                  

           image={require("../Images/location.png")}

          >
            <Callout>
              <Text>You are Here</Text>
            </Callout>


          </Marker>
        </MapView>
        {this.state.locationStatus && (
          <Text> Your Location has been received</Text>
        )}
      </View>);
  }

}


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: planted_colors.OFF_WHITE,
  },
  input:
    {
      backgroundColor: planted_colors.LIGHT_BLUE,
      color: planted_colors.OFF_WHITE,
      width: "90%",
      height: 25,
      margin: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 18,


    },
  errorText: {
    color: planted_colors.STRONG_RED,
    fontSize: 15,
    marginLeft: 20,

  },
  map: {
    width: "100%",
    height: "80%",


  },


});

export default MyReactNativeForm;
