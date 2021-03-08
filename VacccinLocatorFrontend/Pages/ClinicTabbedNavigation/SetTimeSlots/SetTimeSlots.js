import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";

import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const theme = {

  roundness: 4,
  colors: {
    placeholder: "white", text: "red", primary: "red",
    underlineColor: "black", background: planted_colors.LIGHT_BLUE,
  },
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const MyReactNativeForm = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("clinicData");
      console.log("User Data AsyncStorage", userData);
      if (!userData) {
        navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      // const response = await fetch("http://10.0.2.2:4000/patient/single", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       "patientId": userId,
      //
      //     }),
      //   },
      // );


      // const resData = await response.json();
      // setUserDetails(resData);
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


  const [mode, setMode] = useState("time");
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState();

  const [showStartTimeText, setShowStartTimeText] = useState("");
  const [showEndTimeText, setShowEndTimeText] = useState("");
  const [showDateText, setShowDateText] = useState("");
  const [count, setCount] = useState("");

  const [countRepeat, setCountRepeat] = useState(0);

  const showModeStartTime = (currentMode) => {
    setShowStartTime(true);

  };

  const showTimepickerStartTime = () => {
    showModeStartTime("time");
  };


  const showModeEndTime = (currentMode) => {
    setShowEndTime(true);

  };

  const showTimepickerEndTime = () => {
    showModeEndTime("time");
  };


  // const showDate = (currentMode) => {
  //   setShowEndTime(true);
  //
  // };

  const showDatePicker = () => {
    setShowDate(true);
  };

  const addSlot = async () => {
    var timeSlots = {};
    var nestedTimeSlot = {};

    nestedTimeSlot[showStartTimeText.toString()] = count.toString();
    let i=0;
    while (i < countRepeat) {
      var date= new Date(showDateText)
      timeSlots[date.addDays(i).toLocaleDateString()] = nestedTimeSlot;
      i++
    }


    var timeSlotData = JSON.stringify({
      "clinicObjectId": "6044df4fb8b7d14f20a42b3a",
      "timeSlots": timeSlots,

    });

    console.log(timeSlotData);
    const response = await fetch("http://10.0.2.2:4000/clinic/addtime", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          "clinicObjectId": "6044df4fb8b7d14f20a42b3a",
          "timeSlots": {
            "date": {
              "date": showDateText.toString(),
              "time_slots":timeSlots


            }
          },

        }),
      },
    );


    const resData = await response.json();
    console.log(resData)
  };

  console.log(userDetails);
  if (loading) {
    return (
      <View style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image style={{
          width: "50%",
          resizeMode: "contain",
        }}
               source={require("../../../Components/Images/user.png")}
        />
      </View>
    );
  }
  return (

    <View style={styles.MainContainer}>
      <View style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",

        marginTop: 10,
      }}>

        <View style={{
          width: "30%",
          alignItems: "center",
        }}>
          <Text style={{
            color: planted_colors.STRONG_RED,


          }}>{showStartTimeText}</Text>
        </View>

        <View style={{
          width: "30%",
          alignItems: "center",

        }}>
          <Text style={{
            color: planted_colors.STRONG_RED,

          }}>{showEndTimeText}</Text>
        </View>
        <View style={{
          width: "30%",
          alignItems: "center",

        }}>
          <Text style={{
            color: planted_colors.STRONG_RED,

          }}>{showDateText}</Text>
        </View>
      </View>
      <View style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        marginTop: 10,
      }}>

        <View style={{
          width: "30%",
        }}>
          <Button onPress={showTimepickerStartTime} title="Start Time" />
        </View>

        <View style={{
          width: "30%",
          justifyContent: "center",
        }}>
          <Button onPress={showTimepickerEndTime} title="End Time" />
        </View>
        <View style={{
          width: "30%",
          justifyContent: "center",
        }}>
          <Button onPress={showDatePicker} title="Date" />
        </View>
      </View>

      <View style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        marginTop: 10,
      }}>

        <View style={{
          width: "40%",
        }}>
          <TextInput theme={theme}
                     label={"Count"}
                     onChangeText={value => {
                       setCount(value);
                     }}
                     mode={"outlined"}
                     placeholder={"Count"} />
          <TextInput theme={theme}
                     label={"Count"}
                     onChangeText={value => {
                       setCountRepeat(value);
                     }}
                     mode={"outlined"}
                     placeholder={"Repeat For Days"} />
        </View>

        <View style={{
          width: "40%",
          justifyContent: "center",
        }}>
          <Button
            onPress={addSlot}
            title="Add Slot" />
        </View>
      </View>
      <View style={{
        marginTop: 20,
        backgroundColor: planted_colors.LIGHT_BLUE,
        height: "100%",
      }}>

      </View>


      {showStartTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={false}
          display="clock"
          onChange={(event, date) => {
            setShowStartTimeText(date.toLocaleTimeString(undefined, { timeZone: "Asia/Kolkata" }));
            setShowStartTime(false);
          }}
        />
      )}

      {showEndTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          style={{ backgroundColor: planted_colors.BLUEISH_GREEN }}
          mode={mode}
          is24Hour={false}
          display="clock"
          onChange={(event, date) => {
            setShowEndTimeText(date.toLocaleTimeString(undefined, { timeZone: "Asia/Kolkata" }));
            setShowEndTime(false);
          }}
        />
      )}

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          style={{ backgroundColor: planted_colors.BLUEISH_GREEN }}
          mode={"date"}
          is24Hour={false}
          display="default"
          onChange={(event, date) => {
            setShowDateText(date.toLocaleDateString(undefined, { timeZone: "Asia/Kolkata" }));
            setShowDate(false);
          }}
        />
      )}

    </View>

  );
};


const styles = StyleSheet.create({
  MainContainer: {
    width: "100%", height: "100%",

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



