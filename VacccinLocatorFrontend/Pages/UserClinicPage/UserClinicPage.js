import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as planted_colors from "../../Components/Color";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../store/actions/auth";

const UserClinicPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log("User Data AsyncStorage",userData);
      if (!userData) {
        navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("UserClinicPage");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate("UserTabbedNavigation");
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (

    <View style={styles.MainContainer}>
      <TouchableOpacity style={styles.SplashScreen_ChildView} onPress={() => {
        navigation.navigate("VaccinationClinic");
      }}>
        <View style={styles.view_box}>
          <Image source={require("../../Components/Images/clinic.png")} style={{
            width: 200,
            height: 200,
          }} />

          <Text style={styles.text_css}>Vaccination Clinic</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.SplashScreen_ChildView} onPress={() => {
        navigation.navigate("PatientAuthentication");
      }}
      >
        <View style={styles.view_box}>
          <Image source={require("../../Components/Images/user.png")} style={{
            width: 200,
            height: 200,
          }} />
          <Text style={styles.text_css}>Patient</Text>
        </View>
      </TouchableOpacity>

    </View>
  );


};

const styles = StyleSheet.create(
  {
    MainContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",

    },
    view_box: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: planted_colors.OFF_WHITE,
      marginBottom: 25,
      borderRadius: 10,
      width: "90%",
      height: 300,
      borderBottomWidth: 1,
      borderBottomColor: planted_colors.STRONG_BLUE,

      borderTopWidth: 1,
      borderTopColor: planted_colors.STRONG_BLUE,

      borderLeftWidth: 1,
      borderLeftColor: planted_colors.STRONG_BLUE,

      borderRightWidth: 1,
      borderRightColor: planted_colors.STRONG_BLUE,
    },
    text_css: {
      color: planted_colors.BLUEISH_GREEN,
      fontSize: 20,
    },


    SplashScreen_ChildView:
      {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },

  });

export default UserClinicPage;
