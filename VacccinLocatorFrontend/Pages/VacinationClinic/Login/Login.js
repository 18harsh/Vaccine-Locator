import React, { useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Image } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import { Formik } from "formik";
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


const MyReactNativeForm = props => {

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

            initialValues={{
              clinicId: "loungehospital@hospital.com",
              password: "Reuben@21",
            }}
            onSubmit={async values => {


              let action;

              action = authActions.login(
                values.clinicId,
                values.password,
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
                  onChangeText={handleChange("clinicId")}
                  onBlur={handleBlur("clinicId")}
                  value={values.clinicId}
                  placeholder={"Clinic ID"}
                />
                {(errors.clinicId && touched.clinicId) &&
                <Text style={styles.errorText}>{errors.clinicId}</Text>}

                <TextInput
                  theme={theme}
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder={"Clinic Password"}
                  secureTextEntry
                />
                {(errors.password && touched.password) &&
                <Text style={styles.errorText}>{errors.password}</Text>
                }
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
