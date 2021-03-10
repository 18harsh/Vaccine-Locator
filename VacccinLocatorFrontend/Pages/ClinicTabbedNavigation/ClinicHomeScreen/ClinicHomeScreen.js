import React, { Component } from "react";
import { Text, View, TextInput, Dimensions, BackHandler, Image, StyleSheet, Platform } from "react-native";
import { DefaultTheme, Button } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from "react-native-permissions";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../../store/actions/clinicAuth";
import connect from "react-redux/lib/connect/connect";
import LottieView from "lottie-react-native";
import Carousel from "react-native-snap-carousel";


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
    originLatitude: 19.213567050389614,
    originLongitude: 72.85285072119105,
    userDetails: {},
    locationStatus: false,
    errorMessage: "",
    loading: true,
    markers: [],
    clinicDetails: [],
    coordinates: [
      //19.213567050389614, 72.85285072119105
      {
        name: "Burger",
        latitude: 19.211685468602834,
        longitude: 72.85160524930659,
        image: require("../../../Components/Images/ClinicLocation.png"),
      },
      {
        name: "Pizza",
        latitude: 19.214930631199564,
        longitude: 72.85156032230833,
        image: require("../../../Components/Images/ClinicLocation.png"),
      },
      {
        name: "Soup",
        latitude: 19.216324378861028,
        longitude: 72.85081164359455,
        image: require("../../../Components/Images/ClinicLocation.png"),
      },
      {
        name: "Sushi",
        latitude: 19.217712327312675,
        longitude: 72.85007135395325,
        image: require("../../../Components/Images/ClinicLocation.png"),
      },
      {
        name: "Curry",
        latitude: 19.21590339811463,
        longitude: 72.85285597399229,
        image: require("../../../Components/Images/ClinicLocation.png"),
      },
    ],
  };


  async componentDidMount() {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log("User Data AsyncStorage", userData);
      if (!userData) {
        this.props.navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate, userType } = transformedData;
      const expirationDate = new Date(expiryDate);

      const response = await fetch("http://10.0.2.2:4000/clinic/single", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "clinicObjectId": userId,

          }),
        },
      );


      const resData = await response.json();
      this.setState({
        userDetails: resData,
      });

      console.log("This is Printing", this.state.userDetails);

      if (expirationDate <= new Date() || !token || !userId) {
        this.props.navigation.navigate("UserClinicPage");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      this.props.dispatchingSession(userId, token, expirationTime, userType);


      this.setState({
        loading: false,
      });
      // setLoading(false);
    };

    tryLogin();


  }


  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <LottieView source={require("../../../Components/Images/loading.json")} autoPlay loop />
        </View>
      );
    }
    return (
      <View style={styles.container}>


        <MapView
          provider={PROVIDER_GOOGLE}
          // remove if not using Google Maps
          ref={map => this._map = map}
          // onPress={() => this.onMarkerPressed(marker, index)}
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: parseFloat(this.state.userDetails.location.coordinates[1]),
            longitude: parseFloat(this.state.userDetails.location.coordinates[0]),
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}

        >
          <Marker coordinate={{
            latitude: parseFloat(this.state.userDetails.location.coordinates[1]),
            longitude: parseFloat(this.state.userDetails.location.coordinates[0]),
          }}


                  image={require("../../../Components/Images/ClinicLocation.png")}

          >
            <Callout>
              <Text>You are Here</Text>
            </Callout>


          </Marker>


        </MapView>
        <View style={{
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          alignSelf: "center",
        }}>
          <View style={{
            backgroundColor: planted_colors.STRONG_YELLOW,
            height: 50,
            width: 300,
            padding: 5,
            borderRadius: 20,
            marginBottom: 10,
            flexDirection:"row",
            alignItems:"center"
          }}>
            <Image source={require("../../../Components/Images/ClinicLocation.png")}
                   resizeMode={'contain'} style={{
                     width:"20%",
              height:"80%"
            }}/>
            <Text style={{
              alignItems:"center"
            }}>
               Marker Indicates your Location
            </Text>
          </View>

        </View>

      </View>


    );
  }

}


const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,
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

    position: "absolute",
    top: 0,
    right: 0,
    elevation: 10,

  },
  Carousel_of_clinics: {
    position: "absolute",
    bottom: 0,
    marginLeft: 50,

  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    backgroundColor: planted_colors.BLUEISH_GREEN,
    height: 100,
    width: 300,
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,

  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: "absolute",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
  },

  ImageStyle: {


    height: 25,
    width: 25,
    resizeMode: "contain",

  },


});

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    dispatchingSession: (userId, token, expirationTime, userType) => dispatch(authActions.authenticate(userId, token, expirationTime, userType)),
  };
};

export default connect(null, mapDispatchToProps)(MyReactNativeForm);
