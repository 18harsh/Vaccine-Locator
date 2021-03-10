import React, { useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Image } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import { Formik } from "formik";
import * as yup from "yup";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../../../store/actions/clinicAuth";


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

const MyReactNativeForm = props => {
  const [addressData, setAddressData] = useState({});
  const [addressDetails, setAddressDetails] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();


  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <View style={styles.MainContainer}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require("../../../Components/Images/clinic.png")}
          />
          <Text style={{
            color: planted_colors.STRONG_RED,
            fontSize: 15,
          }}>Add your Clinic</Text>
        </View>
        <View style={styles.MainContainer2}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              clinicName: "Lounge Hospital",
              clinicId: "loungehospital@hospital.com",
              phoneNo: "7894561230",
              password: "Reuben@21",

            }}
            onSubmit={async values => {
              const address_string = addressData.description;
              const clinic_coordinates = [
                addressDetails.geometry.location.lng,
                addressDetails.geometry.location.lat,
              ];



              let action;

              action = authActions.signup(
                values.clinicName,
                values.clinicId,
                values.password,
                String(address_string),
                clinic_coordinates,
              );


              const message = await dispatch(action);
              var new_message = JSON.stringify(message);
              console.log("error clinic" + new_message);
              if (new_message.errorMessage) {
                console.log("Entered");
                Alert.alert(message);
                return;
              }
              navigation.navigate("ClinicTabbedNavigation");
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
                  onChangeText={handleChange("clinicId")}
                  onBlur={handleBlur("clinicId")}
                  value={values.clinicId}
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
                <TextInput
                  theme={theme}
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder={"Password"}
                  secureTextEntry
                />
                {(errors.password && touched.password) &&
                <Text style={styles.errorText}>{errors.password}</Text>
                }
                <GooglePlacesAutocomplete
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setAddressData(data);
                    setAddressDetails(details);

                  }}
                  placeholder="Enter Location"
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
                    predefinedPlacesDescription: {
                      color: planted_colors.STRONG_BLUE,
                    },
                  }}
                  query={{
                    key: "AIzaSyD09ZcG7fHZltsAOsKjxq5Eww4xEIfXZNc",
                    language: "en",
                  }}

                />
                <Button theme={theme} style={{
                  marginTop: 20,
                  width: 200,
                  backgroundColor: planted_colors.BLUEISH_GREEN,
                }} colors={planted_colors.BLUEISH_GREEN} onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </View>

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: planted_colors.OFF_WHITE,
    paddingBottom: 100,
  },
  MainContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },


});

export default MyReactNativeForm;
