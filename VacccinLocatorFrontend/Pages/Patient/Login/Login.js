import React from "react";
import { Text, View, Alert, StyleSheet, Image } from "react-native";
import { DefaultTheme, Button, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import { Formik } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import * as authActions from "../../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.OFF_WHITE,
  },
};


const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),

});

const MyReactNativeForm = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <View style={styles.MainContainer}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require("../../../Components/Images/user.png")}
          />
          <Text style={{
            color: planted_colors.STRONG_RED,
            fontSize: 15,
            width: "80%",

          }}>Login In and Find Your Nearest Vaccination Center !!!</Text>

        </View>
        <View style={styles.MainContainer2}>

          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "reuben21@gmail.com", password: "Reuben@21" }}
            onSubmit={async values => {
              console.log(JSON.stringify({

                "email": values.email,
                "password": values.password,


              }));
              let action;

              action = authActions.login(
                values.email,
                values.password,
              );

              try {
                const message = await dispatch(action);
                console.log(message);
                if (message) {
                  Alert.alert(message);
                  return;
                }
                navigation.navigate("UserTabbedNavigation");
              } catch (err) {
                console.log(err);
              }
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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder={"Email ID"}
                  keyboardType="email-address"
                />
                {(errors.email && touched.email) &&
                <Text style={styles.errorText}>{errors.email}</Text>
                }
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

                <Button mode="contained" theme={theme} colors={planted_colors.STRONG_BLUE} style={{
                  marginTop: 20,
                  color: planted_colors.OFF_WHITE,
                }} onPress={handleSubmit}>


                  <Text>Log In</Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>);
};


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

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
  MainContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: planted_colors.OFF_WHITE,
    marginTop: 65,

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
