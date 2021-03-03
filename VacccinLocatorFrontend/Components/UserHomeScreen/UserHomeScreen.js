import React, { Component } from "react";
import { Text, View, TextInput, Button, Dimensions, Image, StyleSheet, Platform } from "react-native";
import { DefaultTheme } from "react-native-paper";
import * as planted_colors from "../Color";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from "react-native-permissions";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
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
    latitude: 19.213567050389614,
    longitude: 72.85285072119105,
    mapDirectionLatitude: 19.213567050389614,
    mapDirectionLongitude: 72.85285072119105,
    locationStatus: false,
    errorMessage: "",
    loading: true,
    markers: [],
    coordinates: [
      //19.213567050389614, 72.85285072119105
      {
        name: "Burger",
        latitude: 19.211685468602834,
        longitude: 72.85160524930659,
        image: require("../Images/ClinicLocation.png"),
      },
      {
        name: "Pizza",
        latitude: 19.214930631199564,
        longitude: 72.85156032230833,
        image: require("../Images/ClinicLocation.png"),
      },
      {
        name: "Soup",
        latitude: 19.216324378861028,
        longitude: 72.85081164359455,
        image: require("../Images/ClinicLocation.png"),
      },
      {
        name: "Sushi",
        latitude: 19.217712327312675,
        longitude: 72.85007135395325,
        image: require("../Images/ClinicLocation.png"),
      },
      {
        name: "Curry",
        latitude: 19.21590339811463,
        longitude: 72.85285597399229,
        image: require("../Images/ClinicLocation.png"),
      },
    ],
  };


  async componentDidMount() {
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
      }

    }

  }

  onMarkerPressed = (location, index) => {
    console.log(location);
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.002,
    });



    this.setState({
      mapDirectionLatitude:location.latitude,
      mapDirectionLongitude:location.longitude,
    })
    this._carousel.snapToItem(index);
  };

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.002,
    });

    this.setState({
      mapDirectionLatitude:location.latitude,
      mapDirectionLongitude:location.longitude,
    })
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
        }>Clinic Title</Text>
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
              Mayfair Greens, Ali Ibrahim Chawl, Fateh Baug, Mayfair Greens, Ali Ibrahim Chawl, Fateh Baug, Mayfair
              Greens, Ali Ibrahim Chawl, Fateh Baug, Kandivali West, Mumbai, Maharashtra, India
            </Text>

          </ScrollView>

        </View>
        <View style={{
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
        }}>

          <Image style={{}} resizeMode="contain" source={item.image} />

          <View>

          </View>
        </View>
      </View>
    </View>;

  render() {
    return (
      <View style={styles.container}>

        <MapView
          provider={PROVIDER_GOOGLE}
          // remove if not using Google Maps
          ref={map => this._map = map}
          onPress={() => this.onMarkerPressed(marker, index)}
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.002,
          }}

        >
          <Marker coordinate={{
            latitude: parseFloat(this.state.originLatitude),
            longitude: parseFloat(this.state.originLongitude),
          }}


                  image={require("../Images/bluelocation.png")}

          >
            <Callout>
              <Text>You are Here</Text>
            </Callout>


          </Marker>

          {
            this.state.coordinates.map((marker, index) => (
              <Marker
                key={marker.name}
                ref={ref => this.state.markers[index] = ref}
                onPress={() => this.onMarkerPressed(marker, index)}
                image={require("../Images/ClinicLocation.png")}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >
                <Callout>
                  <Text>{marker.name}</Text>
                </Callout>

              </Marker>
            ))
          }

          <MapViewDirections
            origin={{
              latitude: 19.213567050389614,
              longitude: 72.85285072119105,
            }}
            destination={{ latitude: this.state.mapDirectionLatitude, longitude: this.state.mapDirectionLongitude }}
            apikey={"AIzaSyD09ZcG7fHZltsAOsKjxq5Eww4xEIfXZNc"}
            strokeWidth={4}
            strokeColor={planted_colors.STRONG_RED}
          />

        </MapView>

        <GooglePlacesAutocomplete
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.setState({
              originLatitude: details.geometry.location.lat,
              originLongitude: details.geometry.location.lng,
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
            data={this.state.coordinates}
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

export default MyReactNativeForm;