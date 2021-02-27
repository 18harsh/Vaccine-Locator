import React from "react";
import {Text, View, Button, Alert, StyleSheet} from "react-native";
import {DefaultTheme, TextInput} from 'react-native-paper'
import * as colors from "../../../Color";
import {Formik} from 'formik';
import * as yup from 'yup';

const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.BLUEISH_GREEN,
        accent: colors.OFF_WHITE,
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
    <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: '', aadharCardNo: '', firstName: '', lastName: ''}}
        onSubmit={values => {
            console.log(values)
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
);


const styles = StyleSheet.create({
    input:
        {
            backgroundColor: colors.LIGHT_BLUE,
            color: colors.OFF_WHITE,
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
        color: colors.STRONG_RED,
        fontSize: 15,
        marginLeft: 20

    }


});

export default MyReactNativeForm;
