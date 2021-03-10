import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";

import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';

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

      const response = await fetch("http://10.0.2.2:4000/clinic/single", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "clinicObjectId": userId,

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
        <LottieView source={require('../../../Components/Images/loading.json')} autoPlay loop />
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
                 source={require("../../../Components/Images/clinic.png")}
          />
          <Text style={{
            color: planted_colors.STRONG_RED,
            fontSize: 18,
          }}>Center Details </Text>
        </View>
        <View style={styles.MainContainer2}>


            <TextInput
              underlineColorAndroid={"rgba(0,0,0,0)"}
              color={planted_colors.STRONG_RED}
              mode={"outlined"}
              style={styles.input}
              label={"Center Name"}
              theme={theme}
              value={userDetails.clinicName}
              disabled={true}
            />

          <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            color={planted_colors.STRONG_RED}
            mode={"outlined"}
            style={styles.input}
            label={"Center ID"}
            theme={theme}
            value={userDetails.clinicId}
            disabled={true}
          />

          <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            color={planted_colors.STRONG_RED}
            mode={"outlined"}
            style={{
              backgroundColor: planted_colors.OFF_WHITE,
              color: planted_colors.OFF_WHITE,
              width: "90%",

              margin: 10,
              fontSize: 16,
            }}
            multiline={true}
            numberOfLines={5}
            label={"Center Address"}
            theme={theme}
            value={userDetails.clinicAddress}
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
      backgroundColor: planted_colors.OFF_WHITE,
      color: planted_colors.OFF_WHITE,
      width: "90%",
      height: 45,
      margin: 10,


      fontSize: 18,


    },
  input2:
    {
      backgroundColor: planted_colors.OFF_WHITE,
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



