import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {  TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";

import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

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
  const [getAppointment, setAppointment] = useState(true);

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

      const responseApp = await fetch("http://10.0.2.2:4000/patient/time/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "patientObjectId": userId,

          }),
        },
      );
      const appointment = await responseApp.json();
      setAppointment(appointment)


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

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  return (


      <View style={styles.MainContainer}>
        <View style={{

        }}>
          <Text style={{
              marginTop:10,
              color:planted_colors.STRONG_RED,
              fontSize:20
          }}> Bookings</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View>


        {getAppointment.map((i,j)=>{
        return  <Card style={{
          width:"90%",
          marginTop:30,
          backgroundColor:planted_colors.BLUEISH_GREEN
        }}>

          <Card.Content>
            <Title>{i.clinicName}</Title>
            <Paragraph>{i.clinicAddress}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title style={{
              color:planted_colors.STRONG_RED
            }} >Time Slot: {new Date(i.startTime).toLocaleTimeString()}</Title>
            <Title style={{
              color:planted_colors.STRONG_RED
            }} >Date: {new Date(i.eventDate).toLocaleDateString()}</Title>
          </Card.Content>

        </Card>
        })}

          </View>
        </ScrollView>
      </View>

  );
};


const styles = StyleSheet.create({
  MainContainer: {

    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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



