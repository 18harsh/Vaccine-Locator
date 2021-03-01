import React, { Component } from "react";
import { Text, View, TextInput, Button, Alert, Image, StyleSheet, Platform } from "react-native";
import { DefaultTheme } from "react-native-paper";
import * as planted_colors from "../Color";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from "react-native-permissions";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.OFF_WHITE,
  },
};

navigator.geolocation = require("@react-native-community/geolocation");
navigator.geolocation = require("react-native-geolocation-service");

class MyReactNativeForm extends Component {

  state = {
    latitude: 19.076090,
    longitude: 72.877426,
    locationStatus: false,
    errorMessage: "",
    loading: true,
  };


  async componentDidMount() {
    if (Platform.OS === "android") {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // console.log("Android Location REUBEN", response);
      if (response === "granted") {
        // Geolocation.getCurrentPosition(
        //   (position) => {
        //     // console.log(position);
        //     this.setState({
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude,
        //       locationStatus: true,
        //     });
        //   },
        //   (error) => {
        //     // See error code charts below.
        //     console.log(error.code, error.message);
        //   },
        //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        // );

        // Geolocation.getCurrentPosition(position => {
        //   console.log(JSON.stringify(position));
        //   console.log(JSON.stringify(position.coords.latitude));

        // });
      }

    }

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
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
        </View>
        <View style={styles.text_bar}>
          <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              this.setState({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });


            }}
            placeholder="Enter your Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            renderDescription={row => row.description}
            listViewDisplayed="auto" onNotFound={(err) => {
            console.log("NOT_FOUND Google PLace", err);
          }}
            onTimeout={() => {
              console.log("Time OUT Google PLace");
            }}
            timeout={5000}
            styles={{
              textInputContainer: {
                backgroundColor: planted_colors.LIGHT_BLUE,
                width: "100%",
                height: 42,
                zIndex: 10,
                borderRadius:10
              },
              textInput: {
                backgroundColor: planted_colors.LIGHT_BLUE,
                height: 42,
                width: "100%",
                color: "black",
                fontSize: 16,
                borderRadius:10
              },
              predefinedPlacesDescription: {
                color: planted_colors.STRONG_BLUE,
              },
            }}
            query={{
              key: "AIzaSyD09ZcG7fHZltsAOsKjxq5Eww4xEIfXZNc",
              language: "en",
            }}

          />
        </View>
      </View>


    );
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: "100%",
    position: "relative",
    top: 0,
    left: 0,

  },
  text_bar: {
    height: "100%",
    width: "95%",
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    position: "absolute",
    top: 0,
    right: 0,
    elevation: 10,

  },

  map: {
    width: "100%",
    height: "100%",


  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },


});

export default MyReactNativeForm;
