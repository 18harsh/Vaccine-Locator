import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Card, Paragraph, TextInput, Title, TouchableRipple } from "react-native-paper";
import * as planted_colors from "../../Components/Color";

import { useDispatch } from "react-redux";

import LottieView from "lottie-react-native";

import { TabView, SceneMap } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../store/actions/auth";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";


const theme = {

  roundness: 4,
  colors: {
    placeholder: "white", text: planted_colors.STRONG_RED, primary: planted_colors.STRONG_RED,
    underlineColor: "black", background: planted_colors.STRONG_RED,
  },
};

const theme2 = {

  roundness: 4,
  colors: {
    placeholder: "white", text: planted_colors.STRONG_RED, primary: planted_colors.STRONG_RED,
    underlineColor: "black", background: planted_colors.LIGHT_BLUE,
  },
};


const Booking = ({ route, navigation }) => {
  const { clinicName, clinicId, clinicAddress, clinicObjectId } = route.params;

  console.log("THIS itemId otherParam", clinicName, clinicId, clinicAddress, clinicObjectId);

  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [slotDetails, setSlotDetails] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      // console.log("User Data AsyncStorage", userData);
      if (!userData) {
        navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate, userType } = transformedData;
      const expirationDate = new Date(expiryDate);

      const response1 = await fetch("http://10.0.2.2:4000/patient/single", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "patientId": userId,

          }),
        },
      );

      const response2 = await fetch("http://10.0.2.2:4000/get/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "clinicObjectId": clinicObjectId,

          }),
        },
      );


      const resData1 = await response2.json();
      setSlotDetails(resData1);

      const resData2 = await response1.json();
      setUserDetails(resData2);
      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("UserClinicPage");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime, userType));
      setLoading(false);
    };

    tryLogin();


  }, [dispatch]);

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <LottieView source={require("../../Components/Images/loading.json")} autoPlay loop />
      </View>
    );
  }
  return (

    <View style={styles.MainContainer}>
      <View style={{
        width: "90%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}>
        <Text style={{
          fontSize: 18,
          color: planted_colors.STRONG_RED,
          marginTop: 10,
          marginBottom: 10,
        }}>{clinicName}</Text>
        <Text style={{
          fontSize: 15,
          color: planted_colors.STRONG_RED,

        }}>{clinicAddress}</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps={"handled"} style={{
        width:"100%"
      }}>
      <List.Section color={planted_colors.STRONG_RED} title="Booking Slots" style={{
        width: "100%",
      }}>
        {slotDetails.map((i, j) => {
          return <List.Accordion theme={theme}
                                 title={new Date(i.eventDate).toLocaleDateString()}

          >
            {i.eventTiming.map((k, j) => {
              return <View style={{
                flexDirection: "row",
                marginTop: 20,
              }
              }>
                <TouchableRipple style={{
                backgroundColor:planted_colors.STRONG_YELLOW,
                  borderRadius:10,
                  marginLeft: 30
                }} onPress={async () => {
                  console.log(k._id, j);
                  const response2 = await fetch("http://10.0.2.2:4000/booking/time/slots", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        "clinicObjectId": clinicObjectId,
                        "patientObjectId": userDetails._id,
                        "date": i.eventDate,
                        "timeSlotId": k._id,
                        "start_time": k.startTime,
                        "end_time": k.endTime,
                      }),
                    },
                  );


                  const resData = await response2.json();
                  console.log(resData);
                  if (resData.message === "time slots already created") {
                    Alert.alert("Slot Booked Successfully");
                    navigation.navigate("UserTabbedNavigation");
                  } else if (resData.message === "Bookings are Full") {
                    Alert.alert("Bookings are Full, Try another Slot Timing");

                  }

                }}>
                  <View style={{
                    flexDirection: "row",
                    margin: 10,
                    width: "100%",
                    height: 25,


                  }}>
                    <View>

                      <Text theme={theme2} style={{
                        color: planted_colors.STRONG_RED,
                        fontSize:18,
                        marginLeft:5

                      }}>
                        {new Date(k.startTime).toLocaleTimeString()} - {new Date(k.endTime).toLocaleTimeString()}
                      </Text>

                    </View>
                    <View >
                      <Text theme={theme2} style={{
                        color: planted_colors.STRONG_RED,
                        backgroundColor: planted_colors.STRONG_YELLOW,
                        marginLeft: 20,
                        fontSize:15
                      }} >
                        BOOK SLOT
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>

              </View>;


            })}

          </List.Accordion>;
        })
        }

      </List.Section>
      </ScrollView>
    </View>

  );
};


const styles = StyleSheet.create({
  MainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",

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

export default Booking;



