import React from "react";
import {Text, View, Button, Alert, StyleSheet} from "react-native";
import {DefaultTheme, TextInput} from 'react-native-paper'
import * as planted_colors from "../../../Components/Color";
import {Formik} from 'formik';
import * as yup from 'yup';

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
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({min}) => `Password must be at least ${min} characters`)
        .required('Password is required'),

})

const MyReactNativeForm = props => (
    <View style={styles.MainContainer}>

        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: '', aadharCardNo: '', firstName: '', lastName: ''}}
            onSubmit={values => {
                console.log(JSON.stringify({
                    "Fname": values.firstName,
                    "Lname": values.lastName,
                    "Email": values.email,
                    "Password": values.password,
                    "Phoneno": values.phoneNo,
                    "AadharNo": values.aadharCardNo

                }))

                fetch('http://10.0.2.2:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Email": values.email,
                        "Password": values.password

                    })
                }).then(res => res.json()).then(data => {
                    console.log("DATA RECEIVED IS", data)
                }).catch(err=>console.log(err))
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
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{

                        color: colors.STRONG_YELLOW,
                    }}>Fill The Form Up </Text>
                    <TextInput
                        theme={theme}
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
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
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder={"Password"}
                        secureTextEntry
                    />
                    {(errors.password && touched.password) &&
                    <Text style={styles.errorText}>{errors.password}</Text>
                    }

                    <Button theme={theme} style={{
                        marginTop: 20
                    }} onPress={handleSubmit} title="Submit"/>
                </View>
            )}
        </Formik>
    </View>
);


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
