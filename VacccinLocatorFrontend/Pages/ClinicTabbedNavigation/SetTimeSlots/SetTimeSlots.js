import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";

import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import LottieView from "lottie-react-native";

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
      const userData = await AsyncStorage.getItem("userData");
      console.log("User Data AsyncStorage", userData);
      if (!userData) {
        navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate,userType } = transformedData;
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

      dispatch(authActions.authenticate(userId, token, expirationTime,userType));
      setLoading(false);
    };

    tryLogin();
    getSlots();

  }, [dispatch]);


  // const [mode, setMode] = useState("time");
  // const [showStartTime, setShowStartTime] = useState(false);
  // const [showEndTime, setShowEndTime] = useState(false);
  // const [showDate, setShowDate] = useState(false);
  // const [time, setTime] = useState();

  const [date, setDate] = React.useState(new Date);
  const [open, setOpen] = React.useState(false);

  const [visibleTime, setVisibleTime] = React.useState(false)

  const [showStartTimeText, setShowStartTimeText] = useState("");
  const [showDateText, setShowDateText] = useState("");
  const [count, setCount] = useState(0);

  const [slotDetails, setSlotDetails] = useState([]);

  const [countRepeat, setCountRepeat] = useState(0);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const onDismissTime = React.useCallback(() => {
    setVisibleTime(false)
  }, [setVisibleTime])


  const onConfirmTime = React.useCallback(
    ({ hours, minutes }) => {
      setVisibleTime(false);
      var d = new Date();
      d.setHours(hours);
      d.setMinutes(minutes);
      setShowStartTimeText(d.toLocaleTimeString())

      console.log({ hours, minutes });
    },
    [setVisibleTime]
  );

  const getSlots = async () => {



    const response = await fetch("http://10.0.2.2:4000/get/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "clinicObjectId": "6044df4fb8b7d14f20a42b3a",

        }),
      },
    );


    const resData = await response.json();
    setSlotDetails(resData)
    console.log(resData)
  };

  const addSlot = async () => {
    var timeSlots = {};
    var nestedTimeSlot = {};
    console.log(count)

    const response = await fetch("http://10.0.2.2:4000/clinic/addtime", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          "clinicObjectId": "6044df4fb8b7d14f20a42b3a",
          "eventDate":showDateText,
          "start_time":showStartTimeText,
          "count":count
        }),
      },
    );


    const resData = await response.json();
    setShowStartTimeText("")
    setShowDateText("")
    setCount("")
    getSlots()
    console.log(resData)
  };

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

    <View style={styles.MainContainer}>
      <View style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",

        marginTop: 10,
      }}>

        <View style={{
          width: "40%",
          alignItems: "center",
        }}>
          <Text style={{
            color: planted_colors.STRONG_RED,


          }}>{showStartTimeText}</Text>
        </View>

        <View style={{
          width: "40%",
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
          width: "40%",
        }}>
          <Button onPress={()=> setVisibleTime(true)} uppercase={false}
                  mode="outlined">
           Start Time
          </Button>
        </View>

        <View style={{
          width: "40%",
          justifyContent: "center",
        }}>
          <Button onPress={() => setOpen(true)} uppercase={false}
                  mode="outlined">
            Date
          </Button>
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
                       console.log(value)
                       setCount(value);
                     }}
                     mode={"outlined"}
                     placeholder={"Count"} />

        </View>

        <View style={{
          width: "40%",
          justifyContent: "center",
        }}>
          <Button
            onPress={addSlot}
          >Add Slot</Button>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
      <View style={{
        marginTop: 20,
        backgroundColor: planted_colors.LIGHT_BLUE,
        height: "100%",
        alignItems:"center"
      }}>
        {slotDetails.map((i,j)=>{
          return <Card style={{
            width:"90%",
            marginTop:10,
            backgroundColor:planted_colors.BLUEISH_GREEN
          }}>

            <Card.Content>
              <Title>Date: {i.eventDate}</Title>
              {i.eventTiming.map((i,j)=> {
                return <Paragraph> Start Time : {i.startTime}, Count: {i.allotmentLimit}</Paragraph>
              }) }

            </Card.Content>


          </Card>
        })

        }


      </View>
      </ScrollView>

      <DatePickerModal
        // locale={'en'} optional, default: automatic
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={new Date()}
        onConfirm={onConfirmSingle}
        onChange={(date)=>{
          setShowDateText(date.date.toLocaleString())
        }} // same props as onConfirm but triggered without confirmed by user
        saveLabel="Save" // optional
        label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />

      <TimePickerModal
        visible={visibleTime}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}

        hours={12} // default: current hours
        minutes={14} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        // animationType="fade" // optional, default is 'none'
        locale={'en'} // optional, default is automically detected by your system
      />

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



