import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import MapView,{Marker} from "react-native-maps";
export default class Homepage extends Component {
    state = {
        isVisible: true
    }


    render() {

        return (
            <View style={styles.container}>
                {/*<MapView*/}
                {/*    // remove if not using Google Maps*/}
                {/*    style={styles.map}*/}
                {/*    loadingEnabled={true}*/}
                {/*    region={{*/}
                {/*        latitude: 19.2029,*/}
                {/*        longitude:72.8518,*/}
                {/*        latitudeDelta: 0.1,*/}
                {/*        longitudeDelta: 0.0121,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Marker coordinate={{*/}
                {/*        latitude: 19.2029,*/}
                {/*        longitude:72.8518,*/}
                {/*    }}/>*/}
                {/*</MapView>*/}
            </View>
        );

    };

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
