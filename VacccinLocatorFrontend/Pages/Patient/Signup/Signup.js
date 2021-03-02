import React from "react";
import { Text, View, Button, Alert, StyleSheet } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
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
    <View style={styles.MainContainer}>


      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "", aadharCardNo: "", firstName: "", lastName: "", phoneNo: "" }}
        onSubmit={async values => {
          const jsonData = JSON.stringify(values);

          // let action;
          //
          // action = authActions.signup(
          //   values.firstName,
          //   values.lastName,
          //   values.email,
          //   values.password,
          //   values.phoneNo,
          //   values.aadharCardNo,
          // );
          //
          // try {
          //   await dispatch(action);
            navigation.navigate("UserTabbedNavigation");
          // } catch (err) {
          //   console.log(err)
          // }
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
              <Text style={{

                color: planted_colors.STRONG_YELLOW,
              }}>Fill The Form Up </Text>
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
                value={values.aadharCard}
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
              <Button theme={theme} style={{
                marginTop: 20,

              }} onPress={handleSubmit} title="Submit" />
            </View>
          )
        }
      </Formik>
    </View>);
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


});

export default MyReactNativeForm;



