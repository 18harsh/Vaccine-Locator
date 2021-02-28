import React from "react";
import { Text, View, Button, Alert, StyleSheet, Image } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import { Formik } from "formik";
import * as yup from "yup";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";

navigator.geolocation = require("@react-native-community/geolocation");
navigator.geolocation = require("react-native-geolocation-service");
const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.OFF_WHITE,
  },
};

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginValidationSchema = yup.object().shape({
  clinicName: yup
    .string()
    .required("clinic Name is required"),
  phoneNo: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const MyReactNativeForm = props => (
  <ScrollView>
    <View style={styles.MainContainer}>
      <View style={styles.SplashScreen_ChildView}>
        <Image
          source={require('../../../Components/Images/clinic.png')}
        />
        <Text style={{
          color: planted_colors.STRONG_RED,
          fontSize: 15
        }}>Add your Clinic</Text>
      </View>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          clinicName: "",
          AddressOfClinic: "",
          ClinicCoordinates: "",
          phoneNo: "",
          vaccineCount: "",
        }}
        onSubmit={values => {
          console.log(values);
          const jsonData = JSON.stringify(values);

        }}

      >
        {({
            handleChange, handleBlur, handleSubmit, values, errors,
            touched,
            isValid,
          }) => (
          <View style={{
            height: "100%",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}>

            <TextInput
              theme={theme}
              style={styles.input}
              onChangeText={handleChange("clinicName")}
              onBlur={handleBlur("clinicName")}
              value={values.clinicName}
              placeholder={"Clinic Name"}
            />
            {(errors.clinicName && touched.clinicName) &&
            <Text style={styles.errorText}>{errors.clinicName}</Text>
            }
            <TextInput
              theme={theme}
              style={styles.input}
              onChangeText={handleChange("ClinicCoordinates")}
              onBlur={handleBlur("ClinicCoordinates")}
              value={values.ClinicCoordinates}
              placeholder={"Clinic ID"}
            />
            {(errors.ClinicCoordinates && touched.ClinicCoordinates) &&
            <Text style={styles.errorText}>{errors.ClinicCoordinates}</Text>}


            <TextInput
              theme={theme}
              style={styles.input}
              onChangeText={handleChange("phoneNo")}
              onBlur={handleBlur("phoneNo")}
              value={values.phoneNo}
              placeholder={"Phone No."}
            />
            {(errors.phoneNo && touched.phoneNo) &&

            <Text style={styles.errorText}>{errors.phoneNo}</Text>}
            <GooglePlacesAutocomplete
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              placeholder="Enter Location"
              minLength={2}
              autoFocus={false}
              returnKeyType={"default"}
              fetchDetails={true}
              renderDescription={row => row.description}
              listViewDisplayed='auto'
             onNotFound={(err) => {
                console.log("NOT_FOUND Google PLace", err);
              }}
              onTimeout={() => {
                console.log("Time OUT Google PLace");
              }}
              timeout={5000}
              styles={{
                textInputContainer: {
                  backgroundColor: planted_colors.OFF_WHITE,
                  width: "90%",
                  marginTop: 10,

                },
                textInput: {
                  backgroundColor: planted_colors.LIGHT_BLUE,
                  height: 42,
                  width: "100%",
                  color: "black",

                  fontSize: 16,
                },

              }}
              query={{
                key: "AIzaSyD09ZcG7fHZltsAOsKjxq5Eww4xEIfXZNc",
                language: "en",
              }}

            />
            <Button theme={theme} style={{
              marginTop: 20,

            }} onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>

    </View>
  </ScrollView>
);


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
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
  SplashScreen_ChildView:
    {
      width:"100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },


});

export default MyReactNativeForm;
