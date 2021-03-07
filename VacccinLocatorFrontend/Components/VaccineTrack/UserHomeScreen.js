import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as planted_colors from "../../Components/Color";

import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";


import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = {

  roundness: 4,
  colors: {
    placeholder: "white", text: "red", primary: "red",
    underlineColor: "black", background: "#003489",
  },
};


const MyReactNativeForm = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log("User Data AsyncStorage", userData);
      if (!userData) {
        navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      const response = await fetch("http://10.0.2.2:4000/patient/single", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "patientId": userId,

          }),
        },
      );


      const resData = await response.json();
      setUserDetails(resData);
      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("UserClinicPage");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
      setLoading(false);
    };

    tryLogin();


  }, [dispatch]);


  console.log(userDetails);
  if (loading) {
    return (
      <View style={{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Image style={{
          width: "50%",
          resizeMode: "contain",
        }}
               source={require("../Images/user.png")}
        />
      </View>
    );
  }
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <View style={styles.MainContainer}>
        <View style={styles.SplashScreen_ChildView}>
          <Image style={{
            width: "50%",
            resizeMode: "contain",
          }}
                 source={require("../Images/user.png")}
          />
          <Text style={{
            color: planted_colors.STRONG_RED,
            fontSize: 15,
          }}>Patient Details !!!</Text>
        </View>
        <View style={styles.MainContainer2}>

          <View style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}>
            <TextInput
              underlineColorAndroid={"rgba(0,0,0,0)"}
              color={planted_colors.STRONG_RED}
              mode={"outlined"}
              style={styles.input2}
              label={"First Name"}
              theme={theme}
              value={userDetails.firstName}
              disabled={true}
            />
            <TextInput
              underlineColorAndroid={"rgba(0,0,0,0)"}
              color={planted_colors.STRONG_RED}
              mode={"outlined"}
              style={styles.input2}
              label={"Last Name"}
              theme={theme}
              value={userDetails.lastName}
              disabled={true}
            />
          </View>
          <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            color={planted_colors.STRONG_RED}
            mode={"outlined"}
            style={styles.input}
            label={"Email ID"}
            theme={theme}
            value={userDetails.email}
            disabled={true}
          />
          <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            color={planted_colors.STRONG_RED}
            mode={"outlined"}
            style={styles.input}
            label={"Aadhar No"}
            theme={theme}
            value={userDetails.aadharNo}
            disabled={true}
          />
          <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            color={planted_colors.STRONG_RED}
            mode={"outlined"}
            style={styles.input}
            label={"Phone No"}
            theme={theme}
            value={userDetails.phoneNo.toString()}
            disabled={true}
          />
          <Button style={{
            backgroundColor:planted_colors.STRONG_BLUE,
            marginTop:40
          }} mode={"contained"} onPress={()=>{
            dispatch(authActions.logout());
            navigation.navigate("UserClinicPage");
          }}>
            Log Out
          </Button>


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
    backgroundColor: planted_colors.LIGHT_BLUE,
  },
  MainContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: planted_colors.LIGHT_BLUE,

  },
  input:
    {
      backgroundColor: planted_colors.LIGHT_BLUE,
      color: planted_colors.OFF_WHITE,
      width: "90%",
      height: 45,
      margin: 10,


      fontSize: 18,


    },
  input2:
    {
      backgroundColor: planted_colors.LIGHT_BLUE,
      color: planted_colors.OFF_WHITE,
      width: "42%",
      height: 45,
      margin: 10,

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



