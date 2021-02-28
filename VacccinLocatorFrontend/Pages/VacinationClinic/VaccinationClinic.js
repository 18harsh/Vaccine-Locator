import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as planted_colors from "../../Components/Color";
import { Button, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import { useNavigation } from '@react-navigation/native';
const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.OFF_WHITE,
  },
};


const Authentication = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.SplashScreen_RootView}>
      <View style={styles.SplashScreen_ChildView}>
        <Image
          source={require('../../Components/Images/clinic.png')}
        />
        <Text style={{
          color: planted_colors.STRONG_RED,
          fontSize: 15
        }}>Get your Vaccine</Text>
      </View>
      <View style={styles.SplashScreen_ChildView2}>
        <Button theme={theme} style={styles.Button_css} mode="contained"
                onPress={() => navigation.navigate('VaccinationClinicSignUp')}> Add Your Clinic</Button>

        <Text style={{
          marginTop: 10,
          marginBottom: 10,
          fontSize: 15,
          color: planted_colors.STRONG_RED
        }} mode="contained" onPress={() => navigation.navigate('VaccinationClinicLogin')}>
          Added Clinic, Login with Clinic ID</Text>
      </View>

    </View>

  );


}

const styles = StyleSheet.create({
  SplashScreen_RootView:
    {

      justifyContent: 'center',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

  SplashScreen_ChildView:
    {
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: planted_colors.OFF_WHITE,
      flex: 1,
    },
  SplashScreen_ChildView2:
    {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: planted_colors.OFF_WHITE,
      flex: 1,
    },
  Button_css: {

    width: "80%",
    height: 50,
    paddingTop: 6,

  }
});

export default Authentication;
