import React, {Component} from "react";
import {Text, View, Button, Alert, StyleSheet} from "react-native";
import {DefaultTheme, TextInput} from 'react-native-paper'
import * as planted_colors from "../Color";
import * as Location from 'expo-location';
import MapView, {Marker} from "react-native-maps";

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
        errorMessage: "",
        loading: true
    }
    // const [getlocation, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    async componentDidMount() {
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }


        let reclocation = await Location.getCurrentPositionAsync({enableHighAccuracy: false});

        this.setState({
            latitude: reclocation.coords.latitude,
            longitude:reclocation.coords.longitude
        })
        // setLocation(JSON.stringify(location));
        console.log("This Printed", this.latitude)

        this.setState({
            loading: false
        })

    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <MapView
                    // remove if not using Google Maps
                    style={{
                        width: 400,
                        height: 500
                    }}
                    loadingEnabled={true}
                    region={{
                        latitude: 22.3,
                        longitude: 22.4,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {/*<Marker coordinate={{*/}
                    {/*    latitude: this.location.latitude,*/}
                    {/*    longitude: this.location.longitude,*/}
                    {/*}}/>*/}
                </MapView>
            </View>);
    }

}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
            fontSize: 18


        },
    errorText: {
        color: planted_colors.STRONG_RED,
        fontSize: 15,
        marginLeft: 20

    }


});

export default MyReactNativeForm;
