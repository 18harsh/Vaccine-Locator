import React, { Component } from "react";
import { Text, View, TextInput, Dimensions, BackHandler, Image, StyleSheet, Platform } from "react-native";
import { DefaultTheme, Button } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from "react-native-permissions";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../../store/actions/auth";
import connect from "react-redux/lib/connect/connect";
import LottieView from "lottie-react-native";


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
    latitude: 19.213567050389614,
    longitude: 72.85285072119105,
    mapDirectionLatitude: 19.213567050389614,
    mapDirectionLongitude: 72.85285072119105,
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

      // const response = await fetch("http://10.0.2.2:4000/patient/single", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       "patientId": userId,
      //
      //     }),
      //   },
      // );


      // const resData = await response.json();
      // setUserDetails(resData);
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

    if (Platform.OS === "android") {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // console.log("Android Location REUBEN", response);
      if (response === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            // console.log(position);
            this.setState({
              originLatitude: position.coords.latitude,
              originLongitude: position.coords.longitude,
              locationStatus: true,
            });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );

        // Geolocation.getCurrentPosition(position => {
        //   console.log(JSON.stringify(position));
        //   console.log(JSON.stringify(position.coords.latitude));

        // });
        const response = await fetch("http://10.0.2.2:4000/clinic/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "latitude": this.state.originLatitude,
              "longitude": this.state.originLongitude,
            }),
          },
        );


        const resData = await response.json();
        this.setState({
          clinicDetails: resData,
        });
      }

    }


  }

  onMarkerPressed = (location, index) => {

    let longitude = this.state.clinicDetails[index].location.coordinates[0];
    let latitude = this.state.clinicDetails[index].location.coordinates[1];

    this._map.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.002,
    });

    this.setState({
      mapDirectionLatitude: latitude,
      mapDirectionLongitude: longitude,
    });
    this._carousel.snapToItem(index);
  };

  onCarouselItemChange = (index) => {
    // console.log(this.state.clinicDetails[index]);
    let longitude = this.state.clinicDetails[index].location.coordinates[0];
    let latitude = this.state.clinicDetails[index].location.coordinates[1];


    // this.setState({
    //   mapDirectionLatitude: latitude,
    //   mapDirectionLongitude: longitude,
    // });

    this._map.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.002,
    });

    this.state.markers[index].showCallout();
  };

  renderCarouselItem = ({ item }) =>
    <View style={{
      backgroundColor: planted_colors.STRONG_BLUE,
      height: 200,
      width: 300,
      padding: 5,
      borderRadius: 20,
      marginBottom: 10,
      flexDirection: "column",
    }}>
      <View style={{

        width: "100%",
        padding: 5,
        flexDirection: "row",
        justifyContent: "center",

      }}>
        <Text style={{
          color: planted_colors.OFF_WHITE,
          fontSize: 20,
          alignSelf: "center",
        }
        }>{item.clinicName}</Text>
      </View>
      <View style={{
        width: "100%",
        padding: 5,
        flexDirection: "row",
      }}>
        <View style={{
          width: "60%",
          padding: 5, height: 140,
        }}>

          <ScrollView vertical>

            <Text style={{
              color: planted_colors.OFF_WHITE,
              width: "100%",
              padding: 5,
            }}>
              {item.clinicAddress}
            </Text>

          </ScrollView>

        </View>
        <View style={{
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>

          <Image style={{ width: "50%", height: 70 }} resizeMode="contain"
                 source={require("../../../Components/Images/ClinicLocation.png")} />
          <Button mode={"contained"} style={{
            color: planted_colors.STRONG_RED,
            backgroundColor: planted_colors.STRONG_RED,
          }} onPress={() => {
            this.props.navigation.navigate("Booking", {
              clinicName: item.clinicName,
              clinicId: item.clinicId,
              clinicAddress: item.clinicAddress,
              clinicObjectId: item._id,
            });
          }}> Book</Button>
          <View>

          </View>
        </View>
      </View>
    </View>;

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
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            latitudeDelta: 0.05,
            longitudeDelta: 0.005,
          }}

        >
          <Marker coordinate={{
            latitude: parseFloat(this.state.originLatitude),
            longitude: parseFloat(this.state.originLongitude),
          }}


                  image={require("../../../Components/Images/bluelocation.png")}

          >
            <Callout>
              <Text>You are Here</Text>
            </Callout>


          </Marker>


          {
            this.state.clinicDetails.map((marker, index) => {
              // console.log(marker)
              return <Marker
                key={marker._id}
                ref={ref => this.state.markers[index] = ref}
                // onPress={() => this.onMarkerPressed(marker, index)}
                image={require("../../../Components/Images/ClinicLocation.png")}
                coordinate={{
                  latitude: marker.location.coordinates[1],
                  longitude: marker.location.coordinates[0],
                }}
              >
                <Callout>
                  <Text>{marker.clinicName}</Text>
                </Callout>

              </Marker>;
            })
          }

          <MapViewDirections
            origin={{
              latitude: 19.213567050389614,
              longitude: 72.85285072119105,
            }}
            destination={{
              latitude: this.state.mapDirectionLatitude,
              longitude: this.state.mapDirectionLongitude,
            }}
            apikey={"AIzaSyD09ZcG7fHZltsAOsKjxq5Eww4xEIfXZNc"}
            strokeWidth={4}
            strokeColor={planted_colors.STRONG_RED}
          />

        </MapView>

        <GooglePlacesAutocomplete
          onPress={async (data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.setState({
              originLatitude: details.geometry.location.lat,
              originLongitude: details.geometry.location.lng,
            });
            const response = await fetch("http://10.0.2.2:4000/clinic/location", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "latitude": details.geometry.location.lat,
                  "longitude": details.geometry.location.lng,
                }),
              },
            );


            const resData = await response.json();
            this.setState({
              clinicDetails: resData,
            });
            this._map.animateToRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.002,
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
              width: "95%",
              height: 42,
              zIndex: 10,
              borderRadius: 10,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            },
            textInput: {
              backgroundColor: planted_colors.LIGHT_BLUE,
              height: 42,
              width: "100%",
              color: "black",
              fontSize: 16,
              borderRadius: 10,
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
        <View style={styles.Carousel_of_clinics}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.clinicDetails}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={300}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
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

  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    backgroundColor: planted_colors.BLUEISH_GREEN,
    height: 200,
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
