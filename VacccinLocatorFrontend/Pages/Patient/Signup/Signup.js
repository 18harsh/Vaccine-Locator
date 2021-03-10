import React from "react";
import { Text, View, Alert, StyleSheet, Image } from "react-native";
import { DefaultTheme, Button, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: planted_colors.BLUEISH_GREEN,
    accent: planted_colors.STRONG_BLUE,
  },
};


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  aadharCardNo: yup
    .string()
    .min(12, ({ min }) => `Aadhar Number must only ${min} numbers`)
    .required("Aadhar Number is required"),
  firstName: yup
    .string()
    .required("First Name is required"),
  lastName: yup
    .string()
    .required("Last Name is required"),
  phoneNo: yup.string().matches(phoneRegExp, "Phone number is not valid"),
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
          }}>Sign Up !!!</Text>
        </View>
        <View style={styles.MainContainer2}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              // email: "reuben21@gmail.com",
              // password: "Reuben@21",
              // aadharCardNo: "123412341234",
              // firstName: "reuben",
              // lastName: "coutinho",
              // phoneNo: "8801744253089",
              email: "",
              password: "",
              aadharCardNo: "",
              firstName: "",
              lastName: "",
              phoneNo: "",
            }}
            onSubmit={async values => {
              const jsonData = JSON.stringify(values);
              let action;

              action = authActions.signup(
                values.firstName,
                values.lastName,
                values.email,
                values.password,
                values.phoneNo,
                values.aadharCardNo,
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
                console.log("Error", err);
              }
            }}

          >
            {
              ({
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
                  <TextInput
                    theme={theme}
                    style={styles.input}
                    onChangeText={handleChange("aadharCardNo")}
                    onBlur={handleBlur("aadharCardNo")}
                    value={values.aadharCardNo}
                    placeholder={"Aadhar Card"}
                  />
                  {(errors.aadharCard && touched.aadharCard) &&
                  <Text style={styles.errorText}>{errors.aadharCard}</Text>}
                  <TextInput
                    theme={theme}
                    style={styles.input}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    placeholder={"First Name"}
                  />
                  {(errors.firstName && touched.firstName) &&
                  <Text style={styles.errorText}>{errors.firstName}</Text>}
                  <TextInput
                    theme={theme}
                    style={styles.input}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    placeholder={"Last Name"}
                  />
                  {(errors.lastName && touched.lastName) &&
                  <Text style={styles.errorText}>{errors.lastName}</Text>}
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

                  <Button mode="contained" theme={theme} colors={planted_colors.STRONG_BLUE} style={{
                    marginTop: 20,
                    color: planted_colors.OFF_WHITE,
                  }} onPress={handleSubmit}>


                    <Text>Submit</Text>
                  </Button>

                </View>
              )
            }
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
    paddingBottom: 100,
    backgroundColor: planted_colors.OFF_WHITE,
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



